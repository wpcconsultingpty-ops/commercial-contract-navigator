// Prepare emails — Code node, "Run Once for All Items"
const res = $input.first().json;
const sub = $('Parse Tally submission').first().json;
const INTERNAL_EMAIL = 'russell.hopkins@wpcconsulting.com.au';
const BOOKING_URL = 'mailto:russell.hopkins@wpcconsulting.com.au?subject=ContractLens%20consultation';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Responses API: concatenate every output_text in message items (output[0] may be a reasoning item).
let text = '';
for (const item of (res.output || [])) {
  if (item.type !== 'message') continue;
  for (const c of (item.content || [])) if (c.type === 'output_text' && c.text) text += c.text;
}
if (!text && typeof res.output_text === 'string') text = res.output_text;
text = text.replace(/^\s*```(?:html)?\s*/i, '').replace(/\s*```\s*$/i, '');

const between = (s, a, b) => {
  const i = s.indexOf(a), j = s.indexOf(b);
  return i >= 0 && j > i ? s.slice(i + a.length, j).trim() : '';
};
const clean = html => html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<\/?(html|head|body)[^>]*>/gi, '')
  .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/javascript:/gi, '')
  .trim();

const clientRaw = between(text, '<!-- TEASER_START -->', '<!-- TEASER_END -->');
const internalRaw = between(text, '<!-- FULL_REPORT_START -->', '<!-- FULL_REPORT_END -->');
const verdict = ((internalRaw.match(/<!--\s*VERDICT:\s*([A-Z]+)\s*-->/) || [])[1]) || 'UNRATED';

const problems = [];
if (res.status && res.status !== 'completed') problems.push(`model status "${res.status}"${res.incomplete_details ? ' (' + JSON.stringify(res.incomplete_details) + ')' : ''}`);
if (!clientRaw) problems.push('client section markers missing or empty');
if (!internalRaw) problems.push('internal section markers missing or empty');
if (/\{\{|\}\}|\$json|\$input/.test(clientRaw)) problems.push('unrendered template code in client section');
if (clientRaw && clientRaw.length < 400) problems.push('client section suspiciously short');

const shell = (inner, banner) => `<div style="font-family:Arial,Helvetica,sans-serif;color:#28251D;background:#F9F8F5;padding:24px;">
<div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #D4D1CA;">
<div style="background:#01696F;color:#ffffff;padding:18px 24px;"><div style="font-size:12px;letter-spacing:1px;">CONTRACTLENS — A WPC CONSULTING PRODUCT</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px;">${banner}</div></div>
<div style="padding:24px;font-size:14px;line-height:1.55;">${inner}</div>
<div style="padding:16px 24px;border-top:1px solid #D4D1CA;font-size:12px;color:#7A7974;">Commercial risk insights only — not legal advice. Prepared by ContractLens, a WPC Consulting product. © ${new Date().getFullYear()} WPC Consulting Pty Ltd</div>
</div></div>`;

const ok = problems.length === 0;
const out = { ok, verdict, problems };

if (ok) {
  out.clientTo = sub.email;
  out.clientSubject = `Your ContractLens report — ${sub.contractTitle || sub.contractType || 'your contract'}`;
  out.clientHtml = shell(
    `<p>Hi ${esc(sub.firstName)},</p><p>Thanks for sending through <strong>${esc(sub.contractTitle || 'your contract')}</strong>. Your ContractLens report is below.</p>`
    + clean(clientRaw)
    + `<p style="margin-top:28px;"><a href="${BOOKING_URL}" style="background:#01696F;color:#ffffff;padding:12px 20px;text-decoration:none;font-weight:bold;">Book your free 30-minute consultation</a></p>`
    + `<p>Or reply to this email. — Russell Hopkins, WPC Consulting</p>`,
    'Commercial Contract Risk Report');
  out.internalTo = INTERNAL_EMAIL;
  out.internalSubject = `[ContractLens INTERNAL] ${verdict} — ${sub.name} (${sub.company}) — ${sub.contractTitle}`;
  out.internalHtml = shell(
    `<p style="background:#F9F8F5;border-left:4px solid #96421A;padding:8px 12px;"><strong>Internal only — do not forward to the client.</strong></p>`
    + `<table cellpadding="4" style="border-collapse:collapse;font-size:13px;">`
    + [['Name', sub.name], ['Email', sub.email], ['Company', sub.company], ['Contract', sub.contractTitle], ['Counterparty', sub.counterparty], ['Type', sub.contractType], ['Review requested', sub.reviewType], ['Checks', sub.checks], ['Priorities', sub.priorities], ['Clause note', sub.clauseNote], ['Files', sub.files.map(f => f.name).join(', ')], ['Submission ID', sub.submissionId], ['Model', res.model], ['Tokens', res.usage ? `${res.usage.input_tokens} in / ${res.usage.output_tokens} out` : '']]
        .map(([k, v]) => `<tr><td style="color:#7A7974;">${k}</td><td>${esc(v)}</td></tr>`).join('')
    + `</table><hr style="border:none;border-top:1px solid #D4D1CA;">`
    + clean(internalRaw)
    + `<hr style="border:none;border-top:1px solid #D4D1CA;"><h3>Client copy as sent</h3>` + clean(clientRaw),
    'Internal report');
} else {
  out.alertSubject = `[ContractLens ALERT] Report not sent — ${sub.name} (${sub.company})`;
  out.alertHtml = `<p>The report for <strong>${esc(sub.name)}</strong> (${esc(sub.email)}) was <strong>not</strong> sent to the client: ${esc(problems.join('; '))}.</p>`
    + `<p>Contract: ${esc(sub.contractTitle)} · Files: ${esc(sub.files.map(f => f.url).join(' '))}</p>`
    + `<h3>Raw model output (first 20,000 characters)</h3><pre style="white-space:pre-wrap;font-size:12px;">${esc(text.slice(0, 20000))}</pre>`;
}
return [{ json: out }];
