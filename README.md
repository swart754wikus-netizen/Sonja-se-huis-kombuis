# Sonja se Huis Kombuis

Website for Sonja se Huis Kombuis — home-baked rusks and cookies.

Plain static site, 3 pages plus checkout:

- `index.html` — Home
- `products.html` — Products, with Add to Basket
- `contact.html` — Contact form
- `checkout.html` — Basket summary, delivery address, PayFast payment

Shared logic lives in `cart.js` (basket, stored in `localStorage`), `products.js`
(product list and prices — edit this to change what's for sale), and
`payfast.js` (payment submission).

## Before going live

- **Products & prices**: edit the `PRODUCTS` array in `products.js`.
- **PayFast**: `payfast.js` currently uses PayFast's public sandbox test
  credentials (`merchant_id: 10000100`) so checkout can be tested end-to-end.
  Once you have a real PayFast merchant account, replace `PAYFAST_CONFIG`
  with your live `merchant_id` / `merchant_key`, and change `PAYFAST_URL`
  to `https://www.payfast.co.za/eng/process`. For extra security you should
  also set an ITN `notify_url` pointing at a small backend endpoint that
  verifies payments server-side — that requires hosting beyond a static
  site, so it isn't wired up yet.
- **Contact form**: `contact.html` currently just shows a thank-you message
  in the browser — it doesn't send an email anywhere yet. Connect it to a
  form service (e.g. Formspree) or a backend endpoint to actually receive
  messages.
