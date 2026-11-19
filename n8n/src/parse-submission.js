// Parse Tally submission — Code node, "Run Once for All Items"
const EXPECTED_FORM_ID = 'ob068X';
const body = $input.first().json.body || {};
const data = body.data || {};
const fields = Array.isArray(data.fields) ? data.fields : [];

const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const optionText = (f, v) => {
  if (!Array.isArray(f.options)) return v;
  const o = f.options.find(o => o.id === v);
  return o ? o.text : v;
};
const valueOf = f => {
  let v = f.value;
  if (Array.isArray(v) && v.length && typeof v[0] !== 'object') v = v.map(x => optionText(f, x));
  else if (typeof v === 'string') v = optionText(f, v);
  return v;
};
const get = (...prefixes) => {
  for (const p of prefixes) {
    const f = fields.find(f => norm(f.label).startsWith(p));
    if (f) {
      const v = valueOf(f);
      if (Array.isArray(v)) return v.filter(x => x != null && x !== '').join(', ');
      return v == null ? '' : String(v).trim();
    }
  }
  return '';
};

const files = fields
  .filter(f => f.type === 'FILE_UPLOAD' || norm(f.label).startsWith('upload'))
  .flatMap(f => (Array.isArray(f.value) ? f.value : []))
  .filter(x => x && x.url)
  .map(x => ({ url: x.url, name: x.name || 'contract', mimeType: x.mimeType || '', size: x.size || null }));

const out = {
  submissionId: data.responseId || data.submissionId || body.eventId || '',
  submittedAt: data.createdAt || body.createdAt || new Date().toISOString(),
  formId: data.formId || '',
  name: get('full name', 'name'),
  company: get('company'),
  email: get('email').toLowerCase(),
  contractTitle: get('contract title', 'contract name'),
  counterparty: get('counterparty'),
  contractType: get('what type of contract', 'contract type'),
  reviewType: get('what do you need reviewed'),
  checks: get('what do you want checked'),
  priorities: get('what matters most'),
  clauseNote: get('paste the clause'),
  files,
};
out.firstName = (out.name.split(/\s+/)[0] || 'there');

const problems = [];
if (out.formId && out.formId !== EXPECTED_FORM_ID) problems.push(`unexpected form ID "${out.formId}"`);
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) problems.push('missing or invalid email');
if (!files.length) problems.push('no contract file uploaded');
const tooBig = files.filter(f => f.size && f.size > 45 * 1024 * 1024);
if (tooBig.length) problems.push('file over 45 MB');

out.valid = problems.length === 0;
if (!out.valid) {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  out.alertSubject = `[ContractLens ALERT] Submission rejected: ${problems.join('; ')}`;
  out.alertHtml = `<p>A ContractLens submission was not processed: <strong>${esc(problems.join('; '))}</strong>.</p>`
    + `<p>Name: ${esc(out.name)}<br>Email: ${esc(out.email)}<br>Company: ${esc(out.company)}<br>Contract: ${esc(out.contractTitle)}<br>Files: ${files.length}</p>`
    + `<p>No email was sent to the submitter. Follow up manually if this was a real enquiry.</p>`;
}
return [{ json: out }];
