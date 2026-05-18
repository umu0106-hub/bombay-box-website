# Bombay Box

Production website for **Bombay Box** — a fast Indian takeout spot in Rochelle Park, NJ. Built with Next.js 14, TypeScript, Stripe, and Supabase.

🌶️ **Live site:** [eatbombaybox.com](https://eatbombaybox.com)
📍 **Location:** 194 Rt 17 N, Rochelle Park, NJ 07602 · Inside Subzi Bazar
📞 **Phone:** 201-546-1558

---

## What's in this repo

| Folder        | Purpose                                                |
| ------------- | ------------------------------------------------------ |
| `app/`        | Next.js 14 App Router pages and API routes            |
| `components/` | All React components (Header, Cart, BowlBuilder, …)   |
| `lib/`        | Menu data, Stripe + Supabase clients                  |
| `styles/`     | Global CSS, design tokens, animations                 |

### Pages

- `/` — Landing page (hero, marquee, featured items, promise)
- `/menu` — Full menu with bowl builder
- `/checkout` — Stripe-powered payment
- `/confirmation` — Order success screen

### Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** (strict)
- **Stripe** — payments (Cards, Apple Pay, Google Pay via Payment Element)
- **Supabase** — order persistence
- **No CSS framework** — design tokens + scoped styles only

---

## 1 · Local development

### Prerequisites

- Node.js **18.17+** (or 20+)
- A Stripe account (free, test mode works)
- A Supabase project (free tier is fine)

### Install

```bash
git clone <repo-url> bombay-box
cd bombay-box
npm install
```

### Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in the keys (see [Stripe](#3--stripe-setup) and [Supabase](#2--supabase-setup) sections below for where to find them).

### Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 2 · Supabase setup

1. Go to [app.supabase.com](https://app.supabase.com) and create a new project. Pick a region close to your customers (US East is fine for NJ).
2. Once the project is ready, open **Project Settings → API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` *(server only)*
3. Open the **SQL Editor** in Supabase and run the schema below.

### Schema

```sql
-- orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  tax numeric(10, 2) not null,
  total numeric(10, 2) not null,
  stripe_payment_intent_id text,
  status text not null default 'received'
    check (status in ('received', 'preparing', 'ready', 'picked_up', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- index for staff order-lookup
create index if not exists orders_status_created_idx
  on public.orders (status, created_at desc);

create index if not exists orders_order_number_idx
  on public.orders (order_number);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- Row Level Security: anon role cannot read. Only the service_role
-- (used by the API route) can insert and read. Add policies later if
-- you build a kitchen dashboard with auth.
alter table public.orders enable row level security;
```

### Optional: see the orders flow in

In Supabase → **Table Editor** → `orders`. New rows appear as customers check out.

---

## 3 · Stripe setup

1. Sign up / log in at [dashboard.stripe.com](https://dashboard.stripe.com).
2. **Make sure you're in TEST mode** (toggle in the top-left) while developing.
3. **Developers → API keys** → copy:
   - **Publishable key** (`pk_test_…`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (`sk_test_…`) → `STRIPE_SECRET_KEY`
4. **Settings → Payment methods** → enable Cards, Apple Pay, Google Pay.

### Test cards

| Scenario                  | Card number           | Expiry  | CVC |
| ------------------------- | --------------------- | ------- | --- |
| Successful payment        | `4242 4242 4242 4242` | any future | any |
| Requires authentication   | `4000 0025 0000 3155` | any future | any |
| Declined                  | `4000 0000 0000 9995` | any future | any |

ZIP can be any 5 digits (e.g. `07602`).

Full list: [stripe.com/docs/testing](https://stripe.com/docs/testing)

### Going live

When you're ready to take real money:

1. Complete Stripe activation (business info, bank account).
2. Toggle Stripe Dashboard to **live mode** and copy the live keys.
3. Update the keys in Vercel (Production environment).
4. Redeploy.

---

## 4 · Deploy to Vercel

### One-time setup

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js. No build settings changes needed.
4. Under **Environment Variables**, add all five from `.env.local`:

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```

   Make sure they're enabled for **Production**, **Preview**, and **Development**.

5. Click **Deploy**.

### Custom domain (`eatbombaybox.com`)

In your DNS provider (e.g. GoDaddy, Namecheap, Cloudflare), add:

| Type  | Host (Name) | Value                  |
| ----- | ----------- | ---------------------- |
| A     | `@`         | `76.76.21.21`          |
| CNAME | `www`       | `cname.vercel-dns.com` |

Then in Vercel → **Project → Settings → Domains** → add `eatbombaybox.com` and `www.eatbombaybox.com`. Vercel will verify the DNS and issue an SSL cert automatically (usually within a few minutes).

---

## 5 · Updating the menu

All menu data lives in **`lib/menu.ts`**. To add or change an item:

```ts
{
  id: 'biryani-veg',         // unique slug
  category: 'biryani',
  name: 'Vegetable Biryani',
  price: 12.99,
  description: '...',
  badges: ['veg', 'glutenFree'],
}
```

Bowl proteins, sauces, and toppings are defined separately (also in `lib/menu.ts`) so changes propagate to the bowl builder automatically.

**NJ sales tax** is set to `0.06625` in `RESTAURANT.taxRate`. Don't change this unless tax law changes — the Township of Rochelle Park is in the standard NJ sales tax zone (not a UEZ).

---

## 6 · Operations / staff workflow

Right now the kitchen sees orders in the **Supabase Table Editor → orders** (sorted by `created_at` desc, filtered to `status = 'received'`). When you're ready, you can build a `/kitchen` page that:

- Polls the `orders` table every 10 seconds (or uses Supabase Realtime)
- Shows each order as a card with items + customer info
- Has buttons to advance status: `received → preparing → ready → picked_up`
- Sends an SMS via Twilio when status becomes `ready` (the customer's phone is on the order)

That's a future-scope build — the data model already supports it.

---

## 7 · Go-live checklist

Before flipping the switch on real payments:

- [ ] `npm run build` passes locally with **zero TypeScript errors**
- [ ] All seven menu categories load and items can be added to cart
- [ ] Bowl builder: pick a protein → at least one sauce → add to cart works
- [ ] Cart persists across a page refresh (session-scoped, intentional)
- [ ] Checkout with Stripe test card `4242 4242 4242 4242` succeeds end-to-end
- [ ] Order appears in Supabase `orders` table with all fields populated
- [ ] Confirmation page shows the order number and pickup address
- [ ] Mobile test on **iPhone Safari** — cart bottom sheet, tap targets, payment
- [ ] Mobile test on **Android Chrome** — same flow
- [ ] NJ sales tax shows **6.625%** on the cart and checkout totals
- [ ] Footer + confirmation show the correct pickup address (194 Rt 17 N, Rochelle Park)
- [ ] Restaurant phone number is correct (201-546-1558) and dialable from mobile
- [ ] Stripe is switched to **LIVE mode** and live keys are in Vercel (Production)
- [ ] `eatbombaybox.com` resolves to the Vercel deployment with SSL
- [ ] Test one real order with a real card, then refund yourself

---

## 8 · Tech notes

### Why no Tailwind / shadcn?

This codebase uses raw CSS with design tokens (defined in `styles/globals.css`). The aesthetic — "Midnight Masala" — is specific enough that off-the-shelf component libraries would have fought us at every step. Tokens like `--saffron`, `--amber`, and `--charcoal` keep the palette consistent without a build-time dependency.

### Cart persistence

The cart uses `sessionStorage`, not `localStorage` — orders shouldn't linger across browser sessions on shared devices. Cleared on successful payment.

### Accessibility

- All interactive controls are real `<button>` elements with focus rings and visible `:focus-visible` states.
- Color contrast meets WCAG AA in the dark theme.
- Animations respect `prefers-reduced-motion`.
- Touch targets are ≥ 44px.

### Performance

- Fonts loaded via `next/font` with `display: swap`.
- No external CSS or JS — everything bundled.
- All SVG illustrations are inline (no extra HTTP requests).
- Animations use `transform` / `opacity` only (GPU-accelerated).

---

## License

© 2025 Bombay Box. All rights reserved.