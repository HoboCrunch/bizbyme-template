# Naloxone Finder

A Next.js web application that helps users locate free or low-cost naloxone (Narcan) providers in their area using AI-powered search.

![Version](https://img.shields.io/badge/version-1.3.0-orange)
![Next.js](https://img.shields.io/badge/Next.js-15.0.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Application Structure](#application-structure)
- [Key Functions](#key-functions)
- [Modifying the Application](#modifying-the-application)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)

---

## 🎯 Overview

**Naloxone Finder** helps save lives by connecting people with free or affordable naloxone providers. Users simply enter their ZIP code, and the app uses AI to search for and return a curated list of pharmacies, community distribution points, and other resources.

### How It Works

1. **User enters ZIP code** on the home page
2. **AI searches** for naloxone providers using Perplexity API
3. **Results are filtered** and sorted (free first, then by distance)
4. **Users can filter** results by cost, training requirements, and location type
5. **One-click actions** to get directions or visit provider websites

---

## ✨ Features

### Core Functionality
- 🔍 **ZIP Code Search** - Simple, fast search by location
- 🤖 **AI-Powered Results** - Perplexity API finds real, current providers
- 📍 **Smart Sorting** - Free providers first, then sorted by distance
- 🎯 **Advanced Filters** - Filter by cost, training requirements, location type
- 🗺️ **Intelligent Actions** - "Get Directions" for physical locations, "Visit Website" for online providers

### User Experience
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Clean Design** - Light, accessible interface with orange (#F9542E) accents
- ⚡ **Fast Loading** - Optimized performance with Next.js
- 📚 **Educational Content** - Blog articles about naloxone
- 🔄 **Sticky Filter Modal** - Easy-to-access filters without cluttering the page

### Technical Features
- 🎯 **SEO Optimized** - Meta tags and Open Graph integration
- 🖼️ **Image Optimization** - Next.js Image component with Supabase integration
- 💾 **Session Storage** - Preserves search results across navigation
- 🎭 **Loading States** - Rotating status messages during search
- ♿ **Accessibility** - ARIA labels and semantic HTML

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Perplexity API key ([Get one here](https://www.perplexity.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bizbyme-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   PERPLEXITY_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Application Structure

```
bizbyme-template/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── search/               # Main search endpoint
│   │   │   └── route.ts          # Perplexity API integration
│   │   └── search-stream/        # Streaming search (future)
│   │       └── route.ts
│   ├── blog/                     # Blog articles
│   │   ├── what-is-naloxone/     # Educational content
│   │   ├── how-to-use-naloxone/
│   │   └── when-to-use-naloxone/
│   ├── results/                  # Results page
│   │   └── page.tsx              # Provider listings with filters
│   ├── globals.css               # Global styles & design tokens
│   ├── layout.tsx                # Root layout & metadata
│   └── page.tsx                  # Home page with search
├── public/                       # Static assets
│   ├── findmynaloxone-logo.png   # App logo
│   └── nove logo black.png       # Partner branding
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── DEVELOPER-GUIDE.md            # Comprehensive dev documentation
└── README.md                     # This file
```

---

## ⚙️ Key Functions

### 1. **Home Page** (`/app/page.tsx`)
**What it does:**
- Displays search form with ZIP code input
- Shows loading carousel during search
- Links to educational blog articles
- Handles API calls to search endpoint

**Key elements:**
- ZIP code input field
- Search button with loading animation
- Rotating status messages ("Finding life saving medication...")
- Blog article cards

### 2. **Results Page** (`/app/results/page.tsx`)
**What it does:**
- Displays list of naloxone providers
- Provides sticky filter button (bottom-left)
- Opens filter modal with three options
- Shows provider cards with badges and actions
- Enables "Load More" functionality

**Key elements:**
- Sticky header with "New Search" button
- Sticky filter button (bottom-left corner)
- Filter modal (Cost, Training Required, Location Type)
- Provider cards with:
  - Free/Paid badges
  - Distance or "online" badge
  - Tags (OTC, 24/7, etc.)
  - Smart action buttons
- Footer with result count

### 3. **Search API** (`/app/api/search/route.ts`)
**What it does:**
- Validates ZIP code input
- Constructs AI prompt for naloxone search
- Calls Perplexity API
- Parses and filters results
- Returns up to 20 providers within 100 miles

**Key functions:**
- `POST()` - Main API handler
- `parseEventsFromResponse()` - Converts AI response to structured data
- `filterEventsByDistance()` - Filters by 100-mile radius
- `parseEventsFromText()` - Fallback text parser

### 4. **Filter System**
**What it does:**
- Sticky button at bottom-left opens modal
- Three filter options:
  - **Cost**: All / Free / Paid
  - **Training Required**: All / Yes / No
  - **Location Type**: All / Physical / Online
- "Clear All" resets filters
- "Apply Filters" closes modal
- Filters work in real-time

### 5. **Blog Articles** (`/app/blog/*`)
**What it does:**
- Provides educational content about naloxone
- SEO-optimized with meta tags
- Responsive images from Supabase
- Table of contents with anchor links
- Related articles section

**Articles:**
- What is Naloxone?
- How to Use Naloxone
- When to Use Naloxone

---

## 🛠️ Modifying the Application

### Common Modifications

#### Change Branding Colors
**File:** `/app/globals.css`
```css
:root {
  --accent: #F9542E;        /* Change to your brand color */
  --light-grey: #eae9e7;    /* Change light backgrounds */
}
```

#### Modify Search Prompt
**File:** `/app/api/search/route.ts` (Line ~37)
```typescript
const systemPrompt = `Your custom prompt here...`;
```

#### Update Home Page Text
**File:** `/app/page.tsx`
```tsx
// Headline (Line ~120-124)
<h2>Find Free</h2>
<h2>Naloxone</h2>

// Tagline (Line ~126-128)
<p>Locate pharmacies and resources in your area</p>
```

#### Change Filter Button Position
**File:** `/app/results/page.tsx` (Line ~269)
```tsx
className="fixed bottom-6 left-6 z-40..."
// Change bottom-6 and left-6 to desired position
```

#### Add New Filter Option
1. Add state variable in `/app/results/page.tsx`
2. Add filter UI in the modal
3. Add filtering logic in `filteredProviders`
4. Update modal layout to accommodate new filter

#### Modify Provider Cards
**File:** `/app/results/page.tsx` - `ProviderCard` function
- Change badge colors (Line ~430, ~431)
- Modify tag colors (Line ~511-512)
- Update action button text (Line ~538)
- Add new fields to display

#### Change Search Radius
**File:** `/app/api/search/route.ts` (Line ~155)
```typescript
return distanceValue <= 100; // Change 100 to desired radius in miles
```

#### Add New Blog Post
1. Create folder: `/app/blog/your-article-name/`
2. Create file: `page.tsx`
3. Copy structure from existing blog page
4. Update content and metadata
5. Add to home page blog cards array

#### Update SEO/Metadata
**File:** `/app/layout.tsx` (Line ~6-7)
```typescript
title: "Your App Name",
description: "Your app description",
```

---

## 📖 Documentation

For comprehensive documentation on every aspect of the application:

👉 **[Read the Developer Guide](./DEVELOPER-GUIDE.md)**

The Developer Guide includes:
- Detailed file-by-file breakdown
- Complete API documentation
- Step-by-step modification guides
- Data flow diagrams
- Design system specifications
- Troubleshooting guide
- Deployment instructions
- Version changelog

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.0.2 | React framework with App Router |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4.1 | Styling framework |
| **Perplexity AI** | Latest | AI-powered search |
| **Heebo Font** | - | Google Fonts typography |

### Key Dependencies
```json
{
  "next": "15.0.2",
  "react": "18.3.1",
  "typescript": "^5",
  "tailwindcss": "^3.4.1"
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variable: `PERPLEXITY_API_KEY`
   - Click "Deploy"

3. **Environment Variables**
   Add in Vercel dashboard:
   - `PERPLEXITY_API_KEY` - Your Perplexity API key

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Docker

**Requirements:**
- Node.js 18+ runtime
- Environment variable support
- Static file serving

---

## 🔑 Environment Variables

Create a `.env.local` file with:

```bash
# Required
PERPLEXITY_API_KEY=your_api_key_here

# Optional (auto-detected in production)
NODE_ENV=development
```

---

## 🧪 Testing Locally

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Test search functionality**
   - Enter ZIP code: `10001`
   - Verify results appear
   - Test filters
   - Check "Get Directions" and "Visit Website" buttons

3. **Test blog pages**
   - Visit `/blog/what-is-naloxone`
   - Verify images load
   - Check responsive design

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📝 Version History

### v1.3.0 (Current) - 2025-10-31
- ✅ Sticky filter modal with bottom-left button
- ✅ Improved filter UX (gray selectors on white)
- ✅ Blog pages with educational content
- ✅ Supabase image integration

### v1.2.0 - 2025-10-28
- ✅ Advanced filtering (Cost, Training, Location Type)
- ✅ Smart action buttons
- ✅ Online provider badges

### v1.1.0 - 2025-10-27
- ✅ Free/Paid badge system
- ✅ Google Maps integration
- ✅ Tag color coding

### v1.0.0
- ✅ Initial release
- ✅ ZIP code search
- ✅ AI-powered results
- ✅ Provider cards

---

## 🤝 Contributing

This is a proprietary application developed for Nove. For questions or issues:

- 📧 Contact: [novedevice.com/contact-us](https://www.novedevice.com/contact-us)
- 🌐 Website: [novedevice.com](https://www.novedevice.com)

---

## 📄 License

Copyright © 2025 Nove. All rights reserved.

---

## 🆘 Need Help?

### Quick Links
- [Developer Guide](./DEVELOPER-GUIDE.md) - Comprehensive documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference
- [Perplexity API](https://docs.perplexity.ai/) - AI API documentation

### Common Issues

**No results appearing?**
- Check `.env.local` has `PERPLEXITY_API_KEY`
- Verify API key is valid
- Check console for errors

**Images not loading?**
- Verify image domain in `next.config.ts`
- Check Supabase URL is correct

**Filters not working?**
- Clear browser cache
- Check filter state in React DevTools
- Verify filtering logic in code

---

**Built with ❤️ by Nove**

*Helping save lives, one search at a time.*
