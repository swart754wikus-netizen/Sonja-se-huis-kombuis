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

function submitToPayfast(cart, details) {
  const total = cartTotal(cart).toFixed(2);
  const itemSummary = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const address = `${details.street}, ${details.suburb}, ${details.postalCode}, ${details.province}`;

  const fields = {
    merchant_id: PAYFAST_CONFIG.merchant_id,
    merchant_key: PAYFAST_CONFIG.merchant_key,
    return_url: `${location.origin}${location.pathname}?status=success`,
    cancel_url: `${location.origin}${location.pathname}?status=cancelled`,
    name_first: details.firstName,
    name_last: details.lastName,
    email_address: details.email,
    m_payment_id: 'SHK-' + Date.now(),
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
