import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { zipCode, afterDate } = await request.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiKey = process.env.PERPLEXITY_API_KEY;

        if (!apiKey) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'API key not configured' })}\n\n`));
          controller.close();
          return;
        }

        // Send initial status
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'status', message: 'Initializing search...' })}\n\n`));

        const systemPrompt = `In ZIP ${zipCode} and nearby areas, list confirmed providers and resources offering free or low-cost naloxone access.

CRITICAL REQUIREMENTS:
- Include the provider name, description, locations (address, hours), contact/website as available
- Specifically list individual pharmacies (chain + independent) in ${zipCode} and surrounding area that stock naloxone over-the-counter (without prescription) and note the pharmacy name and address
- Include other distribution channels such as county dispenser boxes, mail-order programs, community organisations
- Do NOT just say "Pharmacies" generically; list each specific pharmacy individually
- Ensure data reflects local availability around ${zipCode}
- You MUST return results in JSON format

Return 10-20 providers in valid JSON format with title, time (hours), location (full address), distance, description, registration_url (website), organizer, and tags for each provider.`;

        const userPrompt = `Find naloxone providers and resources in ZIP code ${zipCode}. List specific pharmacies, community distribution points, and other free or low-cost naloxone access points. Return results in JSON format.`;

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'status', message: 'Connecting to AI search...' })}\n\n`));

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'sonar-pro',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.1,
            max_tokens: 2500,
            stream: true,
          }),
        });

        if (!response.ok) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Search failed' })}\n\n`));
          controller.close();
          return;
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'status', message: 'Searching for naloxone providers...' })}\n\n`));

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';
        let lastStatusUpdate = Date.now();

        const statusMessages = [
          'Locating pharmacies...',
          'Checking distribution points...',
          'Finding community resources...',
          'Verifying availability...',
          'Compiling results...',
        ];
        let statusIndex = 0;

        if (reader) {
          let chunkCount = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunkCount++;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content || '';
                  if (chunkCount <= 3) {
                    console.log(`Chunk ${chunkCount} content:`, content);
                  }
                  fullContent += content;

                  // Send periodic status updates
                  if (Date.now() - lastStatusUpdate > 2000) {
                    if (statusIndex < statusMessages.length) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        type: 'status',
                        message: statusMessages[statusIndex]
                      })}\n\n`));
                      statusIndex++;
                      lastStatusUpdate = Date.now();
                    }
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'status', message: 'Processing results...' })}\n\n`));

        console.log('=== STREAM COMPLETE ===');
        console.log(`Total content length: ${fullContent.length} chars`);
        console.log('First 1000 chars:');
        console.log(fullContent.substring(0, 1000));
        console.log('Last 500 chars:');
        console.log(fullContent.substring(Math.max(0, fullContent.length - 500)));
        console.log('=== END STREAM ===');

        // Send the complete response
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'complete',
          content: fullContent,
          params: { zipCode }
        })}\n\n`));

        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'An error occurred' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
