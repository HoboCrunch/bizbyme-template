# Naloxone Finder - Developer Guide

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Key Files & Their Responsibilities](#key-files--their-responsibilities)
- [Data Flow](#data-flow)
- [Making Changes](#making-changes)
- [Design System](#design-system)
- [API Integration](#api-integration)
- [Deployment](#deployment)

---

## Overview

**Naloxone Finder** is a Next.js web application that helps users locate free or low-cost naloxone (Narcan) providers in their area. Users enter their ZIP code, and the app uses the Perplexity AI API to search for and return a list of pharmacies, community distribution points, and other resources where naloxone is available.

### Core Functionality
1. User enters ZIP code
2. App calls Perplexity AI API with specialized prompt
3. AI searches the web for naloxone providers near that ZIP code
4. Results are parsed, filtered, and displayed as provider cards
5. Users can sort by distance or relevance
6. Users can click "Visit Website" to access provider information

---

## Tech Stack

- **Framework**: Next.js 15.0.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Library**: React 18.3.1
- **AI Provider**: Perplexity AI (sonar-pro model)
- **Font**: Heebo (Google Fonts)
- **Deployment**: Vercel-ready

---

## Project Structure

```
bizbyme-template/
├── app/
│   ├── api/
│   │   ├── search/
│   │   │   └── route.ts              # Main search API endpoint
│   │   └── search-stream/
│   │       └── route.ts              # Streaming search API endpoint
│   ├── results/
│   │   └── page.tsx                  # Results display page
│   ├── globals.css                   # Global styles & design tokens
│   ├── layout.tsx                    # Root layout, metadata
│   └── page.tsx                      # Home page with search form
├── public/
│   └── bizbyme-logo.png              # Heart logo (orange with white plus)
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── new-design-scheme.md              # Design specifications
├── new-syst-prompt.md                # Perplexity system prompt
└── DEVELOPER-GUIDE.md                # This file
```

---

## How It Works

### 1. User Journey

```
User visits home page (/)
    ↓
Enters ZIP code
    ↓
Clicks "Search" button
    ↓
Loading state (typewriter animation with status messages)
    ↓
API calls Perplexity AI with ZIP code
    ↓
Perplexity searches web for naloxone providers
    ↓
Results parsed into JSON format
    ↓
Results stored in sessionStorage
    ↓
User redirected to /results
    ↓
Results page displays provider cards
    ↓
User can sort, view details, click "Visit Website"
```

### 2. Technical Flow

**Frontend (Home Page)**
- User input captured in React state (`zipCode`)
- On submit, POST request sent to `/api/search`
- Loading state shows animated status messages
- On success, results saved to `sessionStorage` and user navigated to `/results`

**Backend (API Route)**
- Validates ZIP code
- Constructs system prompt with naloxone-specific instructions
- Calls Perplexity API with `sonar-pro` model
- Parses response (tries JSON first, falls back to text parsing)
- Filters providers by distance (≤100 miles)
- Returns up to 20 providers

**Frontend (Results Page)**
- Loads results from `sessionStorage`
- Renders provider cards with all details
- Provides sorting options (distance, relevance)
- Allows "Load More" to fetch additional providers

---

## Key Files & Their Responsibilities

### 1. **`/app/page.tsx`** - Home Page (Search Interface)
**Purpose**: Main landing page with ZIP code search form

**What it contains**:
- ZIP code input field
- Search button with loading states
- Example ZIP code suggestions (10001, 90210, 60601)
- Typewriter loading animation
- Header with logo and branding
- Footer with About button

**Key state variables**:
- `zipCode`: Current ZIP code input
- `isLoading`: Controls loading UI
- `typedText`: Status message during search
- `showCursor`: Blinking cursor animation

**When to modify**:
- Change branding/logo: Update header section (line ~106)
- Modify search UI: Update form section (line ~132)
- Change example ZIP codes: Update `exampleSearches` array (line ~30)
- Update loading messages: Modify `statusMessages` array (line ~49)
- Change main heading: Update headline section (line ~119)

---

### 2. **`/app/results/page.tsx`** - Results Display Page
**Purpose**: Displays list of naloxone providers after search

**What it contains**:
- Sticky header with branding, "Naloxone providers near you" headline, and "New Search" button
- Provider cards grid with Free/Paid badges, tags, and "Get Directions" button
- "Load More" button
- Footer with result count

**Key state variables**:
- `providers`: Array of provider results
- `searchParams`: Stores ZIP code from search
- `loadingMore`: Controls "Load More" button state

**Key components**:
- `ResultsPage`: Main component
- `ProviderCard`: Individual provider card component

**Sorting behavior**:
- **Hard-coded multi-tier sorting** (no user controls):
  - Tier 1: Free > Paid
  - Tier 2: 24/7 > non-24/7
  - Tier 3: OTC > non-OTC
  - Tier 4: Distance (closest first)

**Badge system**:
- **Free badge**: White text on orange (#F9542E) background
- **Paid badge**: Bold orange (#F9542E) "$$$" text
- **OTC/24/7 tags**: Green badges (bg-green-100, text-green-800)
- **Other tags**: Light blue badges (bg-blue-50, text-blue-700)

**When to modify**:
- Change card design: Update `ProviderCard` function (line ~223)
- Change provider display fields: Update card JSX (line ~240-380)
- Modify empty state: Update no-results section (line ~96)
- Adjust sorting tiers: Update `sortedProviders` logic (line ~60-83)

---

### 3. **`/app/api/search/route.ts`** - Main Search API
**Purpose**: Backend endpoint that calls Perplexity AI

**What it contains**:
- Input validation (ZIP code required)
- System prompt configuration
- Perplexity API integration
- Response parsing (JSON and text fallback)
- Distance filtering (100 mile limit)

**Key functions**:
- `POST`: Main handler function
- `parseEventsFromResponse`: Parses AI response into structured data (looks for `"providers"` array in JSON)
- `filterEventsByDistance`: Filters providers by distance
- `parseEventsFromText`: Fallback text parser

**Environment variables**:
- `PERPLEXITY_API_KEY`: Required in `.env.local`

**Important parsing note**:
- The JSON parser looks for a `"providers"` array in the AI response (line ~167)
- Make sure system prompt requests this exact structure for proper parsing

**When to modify**:
- Change search radius: Update distance filter in `filterEventsByDistance` (line ~155)
- Modify system prompt: Update `systemPrompt` variable (line ~37)
- Change AI model: Update `model` parameter in API call (line ~79)
- Adjust result count: Modify system prompt instructions (line ~47)
- Add/remove provider fields: Update parsing logic (line ~173-184)

---

### 4. **`/app/api/search-stream/route.ts`** - Streaming Search API
**Purpose**: Alternative endpoint with real-time streaming updates

**Similar to main search API but**:
- Streams responses in real-time
- Sends status updates during search
- Used for future enhancement possibilities

**Currently not used** in production flow but available for future enhancements.

---

### 5. **`/app/globals.css`** - Global Styles
**Purpose**: Defines design system tokens and global styles

**What it contains**:
- CSS variables (colors, fonts)
- Font imports (Heebo from Google Fonts)
- Global body styles
- Animation keyframes

**Design tokens**:
```css
--background: #ffffff      /* White background */
--foreground: #000000      /* Black text */
--accent: #F9542E          /* Orange accent color */
--light-grey: #eae9e7      /* Light grey background */
```

**When to modify**:
- Change colors: Update CSS variables in `:root` (line ~7-11)
- Change fonts: Update font import and body font-family (line ~1, ~17)
- Add animations: Add new keyframes and utilities (line ~26-35)

---

### 6. **`/app/layout.tsx`** - Root Layout
**Purpose**: Defines app-wide layout and metadata

**What it contains**:
- SEO metadata (title, description)
- Open Graph tags
- Favicon configuration
- Global CSS import

**When to modify**:
- Update page title/SEO: Modify `metadata` object (line ~4-22)
- Change favicon: Replace `/public/bizbyme-logo.png` and update path
- Update meta description: Edit `description` field (line ~7)

---

### 7. **`/tailwind.config.ts`** - Tailwind Configuration
**Purpose**: Extends Tailwind CSS with custom design tokens

**What it contains**:
- Custom color definitions
- Font family extensions
- Content paths for Tailwind scanning

**Custom utilities available**:
- `bg-accent` - Orange accent color
- `bg-light-grey` - Light grey background
- `font-heebo` - Heebo font
- `font-helvetica` - Helvetica font

**When to modify**:
- Add custom colors: Extend `colors` object (line ~11-15)
- Add custom fonts: Extend `fontFamily` object (line ~17-20)

---

## Data Flow

### Search Request Flow
```
User Input (ZIP code)
    ↓
POST /api/search
    ↓
Validate input
    ↓
Construct prompts (system + user)
    ↓
POST to Perplexity API
    https://api.perplexity.ai/chat/completions
    ↓
Receive AI response
    ↓
Parse JSON (or fallback to text parsing)
    ↓
Filter by distance (≤100 miles)
    ↓
Return array of providers
    ↓
Store in sessionStorage
    ↓
Navigate to /results
    ↓
Display provider cards
```

### Data Structure: Provider Object
```typescript
interface Provider {
  title: string;              // Provider/Pharmacy name
  date: string;               // Not used for naloxone (legacy)
  time?: string;              // Hours of operation
  location?: string;          // Full address
  distance?: string;          // Distance from ZIP code (e.g., "5 miles")
  description: string;        // Service details, cost, prescription info
  relevance_score?: string;   // "High" | "Medium" | "General"
  registration_url?: string;  // Website URL
  organizer?: string;         // Organization/chain name
  tags?: string[];           // Tags like ["pharmacy", "free", "OTC"]
}
```

---

## Making Changes

### Common Modifications

#### 1. **Change the Search Prompt**
**File**: `/app/api/search/route.ts`
**Location**: Line ~37 (systemPrompt variable)

```typescript
const systemPrompt = `Your prompt here...`;
```

**Note**: Also update `/new-syst-prompt.md` for documentation

**What this affects**:
- What the AI searches for
- Quality and type of results returned
- Which providers are included/excluded

---

#### 2. **Modify UI Text/Branding**

**Home Page Headlines**
**File**: `/app/page.tsx`
**Location**: Line ~119-128
```tsx
<h2>Find free</h2>
<h2>naloxone</h2>
<p>Locate pharmacies and resources in your area</p>
```

**App Name**
**File**: `/app/page.tsx` (Line ~110) and `/app/results/page.tsx` (Line ~165)
```tsx
<h1>Naloxone Finder</h1>
```

**Results Page Header**
**File**: `/app/results/page.tsx` (Line ~168-170)
```tsx
<h2>Naloxone providers near <span style={{ color: '#F9542E' }}>you</span></h2>
```

**Metadata/SEO**
**File**: `/app/layout.tsx`
**Location**: Line ~6-7
```typescript
title: "Naloxone Finder - Find Free Naloxone Near You",
description: "Locate pharmacies, community resources, and free naloxone..."
```

---

#### 3. **Change Colors**

**Global Color Variables**
**File**: `/app/globals.css`
**Location**: Line ~7-11
```css
:root {
  --accent: #F9542E;        /* Change button/accent color */
  --light-grey: #eae9e7;    /* Change light backgrounds */
}
```

**Tailwind Config**
**File**: `/tailwind.config.ts`
**Location**: Line ~11-15
```typescript
colors: {
  accent: "var(--accent)",
  "light-grey": "var(--light-grey)",
}
```

**What this affects**:
- All buttons (search, sort, action buttons)
- Accent colors throughout app
- Background colors for form and cards

---

#### 4. **Modify Search Behavior**

**Change Search Radius**
**File**: `/app/api/search/route.ts`
**Location**: Line ~174 (filterEventsByDistance function)
```typescript
return distanceValue <= 100; // Change 100 to desired radius
```

**Also update**: System prompt to mention new radius (line ~37)

**Change Number of Results**
**File**: `/app/api/search/route.ts`
**Location**: Line ~47 (in system prompt)
```typescript
Return 10-20 providers... // Change to "Return 5-10 providers" or similar
```

**Change AI Model**
**File**: `/app/api/search/route.ts`
**Location**: Line ~96
```typescript
model: 'sonar-pro',  // Change to 'sonar', 'sonar-medium', etc.
```

---

#### 5. **Modify Sorting Priority**

**Note**: The app uses hard-coded multi-tier sorting (no user-facing controls)

**File**: `/app/results/page.tsx`
**Location**: Line ~60-83 (sortedProviders)

Current sorting tiers:
1. Free > Paid
2. 24/7 > non-24/7
3. OTC > non-OTC
4. Distance (closest first)

**To add a new tier**:
Add another comparison block before the distance sorting:
```typescript
// Tier 4: New priority
const aHasNewFeature = a.tags?.some(tag => tag === 'NewFeature') || false;
const bHasNewFeature = b.tags?.some(tag => tag === 'NewFeature') || false;

if (aHasNewFeature && !bHasNewFeature) return -1;
if (!aHasNewFeature && bHasNewFeature) return 1;
```

---

#### 6. **Customize Provider Cards**

**File**: `/app/results/page.tsx`
**Location**: Line ~223-400 (ProviderCard function)

**Current card features**:
- **Free/Paid badge**: Line ~265-271
  - Free: White text on orange background
  - Paid: Bold orange "$$$" text
- **Organizer link**: Line ~273-285 (clickable when website available)
- **Tags**: Line ~329-365 (filtered, sorted, color-coded)
  - OTC/24/7: Green badges
  - Others: Light blue badges
- **Get Directions button**: Line ~367-381 (Google Maps integration)

**Change badge colors**:
```tsx
// Free badge (line ~269)
style={{ backgroundColor: '#NewColor' }}

// Paid badge (line ~269)
style={{ color: '#NewColor' }}
```

**Change tag colors**:
```tsx
// Green tags (OTC/24/7) - line ~355
'bg-green-100 text-green-800 border border-green-200'

// Blue tags - line ~356
'bg-blue-50 text-blue-700 border border-blue-100'
```

**Add new field**:
```tsx
{provider.newField && (
  <div className="flex items-center gap-1.5">
    <span>{provider.newField}</span>
  </div>
)}
```

---

#### 7. **Change Example ZIP Codes**

**File**: `/app/page.tsx`
**Location**: Line ~30-34
```typescript
const exampleSearches = [
  { zip: '10001' },  // New York
  { zip: '90210' },  // Los Angeles
  { zip: '60601' },  // Chicago
  // Add more as needed
];
```

---

## Design System

### Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--background` | #ffffff | Page background (white) |
| `--foreground` | #000000 | Text color (black) |
| `--accent` | #F9542E | Buttons, accents (orange) |
| `--light-grey` | #eae9e7 | Input backgrounds, cards |

### Typography

**Font**: Heebo (Google Fonts)
- **Light (300)**: Body text, headlines
- **Normal (400)**: Not currently used
- **Bold (700)**: Not currently used

**Tailwind Classes**:
- `font-heebo` - Applies Heebo font
- `font-light` - 300 weight
- `font-normal` - 400 weight
- `font-semibold` - 600 weight
- `font-bold` - 700 weight

### Spacing & Layout

**Container**: `max-w-3xl` (home), `max-w-5xl` (results)
**Padding**: Responsive (`p-4 md:p-6 lg:p-8`)
**Gaps**: `gap-3 md:gap-4` for most layouts
**Border Radius**: `rounded-xl` (cards), `rounded-full` (buttons)

### Components

**Button Styles**:
```tsx
// Primary (Accent)
className="text-white px-6 py-3 rounded-full font-medium hover:opacity-90"
style={{ backgroundColor: '#F9542E' }}

// Secondary (Light)
className="bg-light-grey border border-gray-300 px-6 py-3 rounded-full
           hover:bg-gray-200 text-black"
```

**Input Styles**:
```tsx
className="bg-transparent px-4 py-3.5 outline-none text-black
           placeholder-gray-500 font-heebo"
```

**Card Styles**:
```tsx
className="bg-white border border-gray-300 rounded-xl p-4 md:p-5
           hover:border-gray-400 hover:shadow-md transition-all"
```

---

## API Integration

### Perplexity AI Setup

**1. Get API Key**:
- Sign up at [perplexity.ai](https://www.perplexity.ai/)
- Generate API key from dashboard

**2. Add to Environment**:
Create `.env.local` in project root:
```bash
PERPLEXITY_API_KEY=your_api_key_here
```

**3. API Configuration**:
```typescript
// Endpoint
https://api.perplexity.ai/chat/completions

// Model
sonar-pro (best for web search)

// Parameters
{
  model: 'sonar-pro',
  temperature: 0.1,        // Low for consistent results
  max_tokens: 5000,        // High for detailed responses
  stream: false            // Non-streaming
}
```

### Changing AI Provider

To use a different AI provider (OpenAI, Anthropic, etc.):

**File**: `/app/api/search/route.ts`

**Step 1**: Update API endpoint (line ~89)
```typescript
const response = await fetch('https://new-api-endpoint.com', {
  // ...
});
```

**Step 2**: Update request format (line ~95-111)
```typescript
body: JSON.stringify({
  // Update to match new API format
})
```

**Step 3**: Update response parsing (line ~123-133)
```typescript
// Adjust based on new API's response structure
const fullContent = data.choices[0]?.message?.content || '';
```

**Step 4**: Update environment variable name
- Change `PERPLEXITY_API_KEY` to new provider key name

---

## Deployment

### Vercel (Recommended)

**1. Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

**2. Deploy to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variable: `PERPLEXITY_API_KEY`
- Deploy

**3. Custom Domain** (Optional):
- Add custom domain in Vercel dashboard
- Update `metadataBase` in `/app/layout.tsx`

### Environment Variables

**Required**:
- `PERPLEXITY_API_KEY` - Your Perplexity API key

**Optional**:
- `NODE_ENV` - Set to 'production' in deployment

---

## Testing Locally

**1. Install dependencies**:
```bash
npm install
```

**2. Create `.env.local`**:
```bash
PERPLEXITY_API_KEY=your_key_here
```

**3. Run development server**:
```bash
npm run dev
```

**4. Open browser**:
```
http://localhost:3000
```

---

## Common Issues & Solutions

### Issue: No results returned
**Cause**: API key missing or invalid, or parsing mismatch
**Solution**:
1. Check `.env.local` has correct `PERPLEXITY_API_KEY`
2. Verify the system prompt requests a `"providers"` array (line ~37-66 in route.ts)
3. Verify the parser looks for `"providers"` not `"events"` (line ~167 in route.ts)

### Issue: Results not parsing correctly
**Cause**: AI response format mismatch with parser
**Solution**:
1. Check console logs in `/api/search/route.ts` (line ~110-122) to see raw response
2. Verify JSON structure matches what parser expects (`"providers"` array)
3. Ensure system prompt and parser are synchronized

### Issue: Fonts not loading
**Cause**: Google Fonts blocked or slow connection
**Solution**: Check font import in `/app/globals.css` (line ~1)

### Issue: Styles not applying
**Cause**: Tailwind not scanning files
**Solution**: Check `content` paths in `/tailwind.config.ts` (line ~4-7)

---

## Future Enhancements

### Potential Features
1. **Map view** - Show providers on interactive map
2. **Filters** - Filter by pharmacy chain, hours, free vs paid
3. **User location** - Auto-detect user's location
4. **Favorites** - Save favorite providers
5. **Directions** - Link to Google Maps for directions
6. **Phone integration** - Click to call provider
7. **Language support** - Multi-language interface
8. **Accessibility** - Enhanced screen reader support

### Where to Add Them

**Map View**:
- Add to `/app/results/page.tsx`
- Use library like `react-map-gl` or `google-maps-react`
- Add toggle between list/map view in sort controls

**Filters**:
- Add filter state in `/app/results/page.tsx`
- Create filter UI in sort controls section
- Add filtering logic before mapping provider cards

**User Location**:
- Add to `/app/page.tsx`
- Use browser geolocation API
- Convert coordinates to ZIP code using geocoding API

---

## Getting Help

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Perplexity API Docs](https://docs.perplexity.ai/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Project-Specific Questions
Check these files first:
1. `new-design-scheme.md` - Design specifications
2. `new-syst-prompt.md` - AI prompt details
3. `package.json` - Dependencies and scripts
4. This file - Architecture and how-tos

---

## Changelog

### v1.1.0 (Current)
**Date**: 2025-10-27

**Bug Fixes**:
- Fixed critical parsing bug: Changed JSON parser to look for `"providers"` instead of `"events"`

**New Features**:
- Multi-tier hard-coded sorting (Free > 24/7 > OTC > Distance)
- Free/Paid badge system with "$$$" indicator
- Green badges for OTC and 24/7 tags
- Light blue badges for other identifier tags
- "Get Directions" button with Google Maps integration
- Clickable organizer names (when website available)
- New heart logo with medical cross

**UI Improvements**:
- Removed user-facing sort controls (now hard-sorted)
- Changed header to "Naloxone providers near you" with orange accent
- Removed circular crop from logo display
- Improved tag filtering (removes free/paid duplicates)
- Enhanced badge color scheme aligned with brand

### v1.0.0
- Initial release as Naloxone Finder
- Converted from events platform
- Light mode design implementation
- Perplexity AI integration
- ZIP code-only search
- Distance and relevance sorting

---

*Last Updated: 2025-10-27*
