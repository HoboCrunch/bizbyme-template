import { NextRequest, NextResponse } from 'next/server';

interface Event {
  title: string;
  date: string;
  time?: string;
  location?: string;
  distance?: string;
  description: string;
  relevance_score?: string;
  registration_url?: string;
  organizer?: string;
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { zipCode, afterDate } = await request.json();

    if (!zipCode) {
      return NextResponse.json(
        { error: 'Zip code is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error('PERPLEXITY_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // System prompt for naloxone finder
    const systemPrompt = `In ZIP ${zipCode} and nearby areas, list confirmed providers and resources offering free or low-cost naloxone access.

CRITICAL REQUIREMENTS:
- Include the provider name, description, locations (address, hours), contact/website as available
- Specifically list individual pharmacies (chain + independent) in ${zipCode} and surrounding area that stock naloxone over-the-counter (without prescription) and note the pharmacy name and address
- Include other distribution channels such as county dispenser boxes, mail-order programs, community organisations
- Do NOT just say "Pharmacies" generically; list each specific pharmacy individually
- Ensure data reflects local availability around ${zipCode}
- You MUST return results in JSON format

Return 10-20 providers in this EXACT JSON format:
{
  "search_location": "City, State (Zip Code)",
  "providers": [
    {
      "title": "Provider/Pharmacy Name",
      "date": "",
      "time": "Hours of operation",
      "location": "Full Address",
      "distance": "XX miles",
      "description": "Description of service, whether prescription required, cost details",
      "relevance_score": "High",
      "registration_url": "Website URL if available",
      "organizer": "Organization or chain name",
      "tags": ["pharmacy", "free", "OTC", "24/7", etc]
    }
  ]
}

Sort by: 1) Distance (closer first), 2) Free/low-cost options first. Use real, current provider data.`;

    // User prompt
    const userPrompt = `Find naloxone providers and resources in ZIP code ${zipCode}. List specific pharmacies, community distribution points, and other free or low-cost naloxone access points. Return results in JSON format as specified in your system prompt.`;

    // Call Perplexity API (non-streaming)
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 5000,
        stream: false, // Disable streaming
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to search for events' },
        { status: response.status }
      );
    }

    // Handle non-streaming response
    const data = await response.json();
    const fullContent = data.choices[0]?.message?.content || '';

    // Parse the complete response
    console.log('=== RAW PERPLEXITY RESPONSE ===');
    console.log(`Content length: ${fullContent.length} chars`);
    console.log('First 2000 chars:');
    console.log(fullContent.substring(0, 2000));
    console.log('=== END RAW RESPONSE ===');

    const events = parseEventsFromResponse(fullContent);

    console.log('=== PARSED EVENTS ===');
    console.log(`Found ${events.length} events`);
    if (events.length > 0) {
      console.log('First event:', JSON.stringify(events[0], null, 2));
    }

    return NextResponse.json({
      results: events,
      rawResponse: fullContent,
      searchParams: { zipCode },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching for events' },
      { status: 500 }
    );
  }
}

// Helper function to filter events by distance
function filterEventsByDistance(events: Event[]): Event[] {
  console.log(`Filtering ${events.length} events by distance...`);
  const filtered = events.filter(event => {
    if (!event.distance) {
      console.log(`Event "${event.title}" has no distance, keeping it`);
      return true; // Keep events without distance info
    }

    // Extract numeric distance value
    const distanceMatch = event.distance.match(/(\d+(?:\.\d+)?)/);
    if (!distanceMatch) {
      console.log(`Event "${event.title}" distance unparseable (${event.distance}), keeping it`);
      return true; // Keep if we can't parse distance
    }

    const distanceValue = parseFloat(distanceMatch[1]);
    const keep = distanceValue <= 100;
    console.log(`Event "${event.title}" is ${distanceValue} miles - ${keep ? 'keeping' : 'filtering out'}`);
    return keep; // Only keep events 100 miles or less
  });
  console.log(`After distance filter: ${filtered.length} events remain`);
  return filtered;
}

function parseEventsFromResponse(content: string): Event[] {
  try {
    // Try to extract JSON from the response
    console.log('Attempting JSON parsing...');
    const jsonMatch = content.match(/\{[\s\S]*"providers"[\s\S]*\}/);
    if (jsonMatch) {
      console.log('Found JSON structure in response');
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.providers && Array.isArray(parsed.providers)) {
        console.log(`Extracted ${parsed.providers.length} providers from JSON`);
        const events = parsed.providers.map((event: any) => ({
          title: event.title || '',
          date: event.date || '',
          time: event.time,
          location: event.location,
          distance: event.distance,
          description: event.description || '',
          relevance_score: event.relevance_score,
          registration_url: event.registration_url,
          organizer: event.organizer,
          tags: event.tags || [],
        }));
        return filterEventsByDistance(events);
      } else {
        console.log('JSON parsed but no events array found');
      }
    } else {
      console.log('No JSON structure found in response');
    }
  } catch (e) {
    console.error('JSON parsing failed, falling back to text parsing:', e);
  }

  // Fallback to text parsing if JSON parsing fails
  console.log('Using text parsing fallback...');
  return filterEventsByDistance(parseEventsFromText(content));
}

function parseEventsFromText(content: string): Event[] {
  const events: Event[] = [];
  const lines = content.split('\n');
  let currentEvent: Partial<Event> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Look for event titles (usually numbered or bulleted)
    if (line.match(/^\d+\.|^-|^\*/) && !line.includes('Date') && !line.includes('Link')) {
      if (currentEvent.title) {
        events.push(currentEvent as Event);
      }
      currentEvent = {
        title: line.replace(/^\d+\.|^-|^\*/, '').trim().replace(/\*\*/g, ''),
        date: '',
        description: '',
        tags: [],
      };
    } else if (line.toLowerCase().includes('date:')) {
      currentEvent.date = line.replace(/^.*date:/i, '').replace(/^-|^\*/, '').trim();
    } else if (line.toLowerCase().includes('time:')) {
      currentEvent.time = line.replace(/^.*time:/i, '').replace(/^-|^\*/, '').trim();
    } else if (line.toLowerCase().includes('location:')) {
      currentEvent.location = line.replace(/^.*location:/i, '').replace(/^-|^\*/, '').trim();
    } else if (line.toLowerCase().includes('http') || line.includes('www.')) {
      const urlMatch = line.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
      if (urlMatch) {
        currentEvent.registration_url = urlMatch[0];
      }
    } else if (currentEvent.title && !currentEvent.description && line.length > 20) {
      currentEvent.description = line.replace(/^Description:/i, '').trim();
    }
  }

  if (currentEvent.title) {
    events.push(currentEvent as Event);
  }

  return events.filter(event => event.title && (event.date || event.description));
}
