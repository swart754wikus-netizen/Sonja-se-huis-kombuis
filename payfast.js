/* ===== Sonja se Huis Kombuis — PayFast checkout =====
   Uses PayFast's public sandbox test credentials so checkout can be tried
   out end-to-end before the site goes live. Replace PAYFAST_CONFIG with
   your real merchant_id / merchant_key from your PayFast account, and
   switch PAYFAST_URL to the live endpoint, before accepting real payments.
   See README.md for the full go-live checklist. */

const PAYFAST_CONFIG = {
  merchant_id: '10000100',
  merchant_key: '46f0cd694581a',
};

const PAYFAST_URL = 'https://sandbox.payfast.co.za/eng/process';

/* Number the "Send Order to WhatsApp" button on the success page messages.
   Set to a test number for now — switch to Sonja's business WhatsApp
   number (082 826 9874 -> 27828269874) before going live. */
const ORDER_NOTIFY_NUMBER = '27645289171';

const LAST_ORDER_KEY = 'sonja_last_order';
const PENDING_PAYMENT_KEY = 'sonja_pending_payment_id';

function submitToPayfast(cart, details) {
  const subtotal = cartTotal(cart);
  const total = (subtotal + SHIPPING_FEE).toFixed(2);
  const itemSummary = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const address = `${details.street}, ${details.suburb}, ${details.postalCode}, ${details.province}`;
  const paymentId = 'SHK-' + Date.now();

  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify({ cart, details, total, shipping: SHIPPING_FEE, paymentId }));
  localStorage.setItem(PENDING_PAYMENT_KEY, paymentId);

  const fields = {
    merchant_id: PAYFAST_CONFIG.merchant_id,
    merchant_key: PAYFAST_CONFIG.merchant_key,
    return_url: `${location.origin}${location.pathname}?status=success&pid=${encodeURIComponent(paymentId)}`,
    cancel_url: `${location.origin}${location.pathname}?status=cancelled`,
    name_first: details.firstName,
    name_last: details.lastName,
    email_address: details.email,
    m_payment_id: paymentId,
    amount: total,
    item_name: 'Sonja se Huis Kombuis order',
    item_description: itemSummary.slice(0, 255),
    custom_str1: address,
    custom_str2: details.phone,
    custom_str3: details.notes || '',
  };

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAYFAST_URL;

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

function isPendingPaymentValid(pid) {
  if (!pid) return false;
  return localStorage.getItem(PENDING_PAYMENT_KEY) === pid;
}

function clearPendingPayment() {
  localStorage.removeItem(PENDING_PAYMENT_KEY);
}

function getWhatsAppOrderLink() {
  const raw = localStorage.getItem(LAST_ORDER_KEY);
  if (!raw) return null;

  const { cart, details, total, shipping, paymentId } = JSON.parse(raw);
  const subtotal = cartTotal(cart);
  const lines = [
    'New order — Sonja se Huis Kombuis',
    'Paid via PayFast',
    `Order reference: ${paymentId}`,
    '',
    ...cart.map(i => `${i.qty}x ${i.name} — ${formatR(i.price * i.qty)}`),
    '',
    `Subtotal: ${formatR(subtotal)}`,
    `Shipping: ${formatR(shipping)}`,
    `Total: ${formatR(Number(total))}`,
    '',
    `Name: ${details.firstName} ${details.lastName}`,
    `Phone: ${details.phone}`,
    `Deliver to: ${details.street}, ${details.suburb}, ${details.postalCode}, ${details.province}`,
  ];
  if (details.notes) lines.push(`Notes: ${details.notes}`);

  return `https://wa.me/${ORDER_NOTIFY_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
