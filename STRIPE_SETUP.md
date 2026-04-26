# Stripe Setup Walkthrough

Step-by-step setup for the /work-with-me payment flow. This needs to happen in your Stripe dashboard because Stripe requires identity verification, business info, bank, and tax details that I can't supply via API.

Follow this in order. Should take about 15 minutes.

---

## 1. Confirm your Stripe account is in Live mode

1. Log into https://dashboard.stripe.com
2. Top-left, make sure the toggle says **Live mode** (not Test mode)
3. If your account isn't fully activated yet (some businesses still require submitting tax/identity info), do that first. Stripe will guide you.

---

## 2. Create the 5 base coaching products

Go to **Products → Catalog → Add product**.

Create each of these as **separate products**. Recurring monthly billing.

### Product 1: GROW Coaching
- Name: `GROW Coaching`
- Description: `Coaching plus strategy. Twice-monthly 1-on-1 strategy calls, monthly channel audits, direct access via Voxer, all community features included.`
- Default price: `$997.00 USD`
- Billing period: `Monthly`
- Lookup key: `grow-coaching` (this is important — we use it to look up the product from code)

### Product 2: SCALE Done-With-You
- Name: `SCALE Done-With-You`
- Description: `Weekly 1-on-1 strategy calls. Custom thumbnails twice monthly. Title and description writing. Content repurposing into Shorts and social. Basic editing support.`
- Default price: `$1,500.00 USD`
- Billing period: `Monthly`
- Lookup key: `scale-coaching`

### Product 3: ACCELERATE Management
- Name: `ACCELERATE YouTube Management`
- Description: `4 professional videos monthly, fully edited and optimized. Weekly strategy. Keyword research per video. Monthly performance reports.`
- Default price: `$2,500.00 USD`
- Billing period: `Monthly`
- Lookup key: `accelerate-management`

### Product 4: ELEVATE Management
- Name: `ELEVATE YouTube Management`
- Description: `8 professional videos monthly with enhanced editing. Lead generation system buildout. Multi-platform distribution. Optional paid advertising.`
- Default price: `$3,750.00 USD`
- Billing period: `Monthly`
- Lookup key: `elevate-management`

### Product 5: DOMINATE Management
- Name: `DOMINATE YouTube Management`
- Description: `12+ professional videos monthly with quarterly shoots. Full funnel buildout. Community management. Dedicated account manager.`
- Default price: `$5,000.00 USD`
- Billing period: `Monthly`
- Lookup key: `dominate-management`

---

## 3. Create a Custom Deal product (for special offers)

For coach-to-coach deals, mastermind partners, special arrangements:

- Name: `Custom Coaching Engagement`
- Description: `Custom coaching package. Pricing varies by engagement.`
- Pricing model: **Customer chooses price** (or leave default empty and use Stripe Payment Links to set price per deal)
- Lookup key: `custom-coaching`

When you do a special deal, you create a **Payment Link** in Stripe with the custom price and send it directly to the buyer. Saves having a hundred separate products.

---

## 4. Create Payment Links for each product

Stripe Payment Links are the simplest way for the website to send people to Stripe checkout without us building a custom integration.

For each of the 5 base products:
1. Go to the product
2. Click **+ Create payment link**
3. Settings:
   - Quantity: limit to 1
   - Customer collection: collect email + name
   - Confirmation page: redirect to `https://crazysimpleyoutube.com/welcome` (we'll build this page or update later)
   - Tax: Automatic (Stripe handles)
4. Copy the resulting URL (looks like `https://buy.stripe.com/xxxxx`)
5. Save each URL paired with the lookup key. Send the list to me, format like:
   ```
   grow-coaching: https://buy.stripe.com/xxx
   scale-coaching: https://buy.stripe.com/yyy
   accelerate-management: https://buy.stripe.com/zzz
   elevate-management: https://buy.stripe.com/aaa
   dominate-management: https://buy.stripe.com/bbb
   ```

Then I'll wire each tier's "Buy" button on `/work-with-me` to the matching Payment Link.

---

## 5. Set up the Stripe webhook (so we know when someone buys)

This lets the site tag a contact in Brevo as `behav_paid` automatically when someone subscribes.

1. In Stripe dashboard: **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://crazysimpleyoutube.com/api/stripe-webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the **Signing secret** (starts with `whsec_...`)
5. Send me the signing secret. I'll add it as `STRIPE_WEBHOOK_SECRET` in Vercel env.

I'll build the `/api/stripe-webhook` endpoint once you have these set up.

---

## 6. Get your Stripe API keys (for the webhook handler)

1. **Developers → API keys**
2. Copy:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`) — click reveal once
3. Send both to me. I add them to Vercel env as:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

---

## 7. Confirmation: what I will do once you send me the keys

After you complete steps 1 to 6:

1. Add Stripe keys + webhook secret to Vercel environment variables
2. Build `/api/stripe-webhook` to receive Stripe events and update Brevo
3. Wire each tier card's CTA button on `/work-with-me` to the matching Payment Link URL
4. Build `/welcome` post-purchase page (success message, next steps, calendar link to schedule first call)
5. Add Brevo workflow trigger: when someone is tagged `behav_paid` with `tier_grow`, send them the GROW onboarding email sequence
6. Test end-to-end with Stripe test mode first, then flip to live

---

## What I need from you (TLDR)

Reply with these and I will handle the rest:

1. The 5 Payment Link URLs (one per coaching tier)
2. The Stripe webhook signing secret (starts with `whsec_...`)
3. The Stripe publishable key (starts with `pk_live_...`)
4. The Stripe secret key (starts with `sk_live_...`)

Or if you want, just hit Reply and tell me you've created the products. I'll walk you through getting the keys after.
