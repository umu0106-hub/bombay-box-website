# Bombay Box - Fast Indian Takeout Website

Premium Indian fast-casual dining in Rochelle Park, NJ. Build your custom bowl, order tiffins, or try our street fusion menu.

**Live at:** [eatbombaybox.com](https://eatbombaybox.com)

## Features

- 🥘 Custom Bowl Builder with 50+ customization options
- 🍛 7 menu categories with 40+ dishes
- 💳 Stripe payments (test mode for development)
- 📦 Real-time order management via Supabase
- 🎨 Animated hero section with smooth transitions
- 📱 Fully responsive design (mobile-first)
- ⚡ Next.js 14 + React 18 for blazing-fast performance

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, CSS animations
- **Payments:** Stripe (test & live modes)
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel (US East - iad1)
- **Styling:** Custom CSS with design tokens

## Environment Setup

```bash
# Install dependencies
npm install

# Create .env.local with your keys
cp .env.local.example .env.local

# Development server
npm run dev

# Build for production
npm run build
npm run start
```

## Deployment

Deployed on Vercel with automatic CI/CD from GitHub.

**Custom Domain:** eatbombaybox.com via GoDaddy DNS

## Menu Data

All menu items, prices, and customization options are centralized in `lib/menu.ts` for easy management.

---

**Restaurant Info:**
- 📍 194 Route 17 North, inside Subzi Bazar, Rochelle Park, NJ 07662
- 📞 (201) 546-1558
- 🕒 Hours: [See website]
- 💳 Stripe, Apple Pay, Google Pay
