// Describe AI error — Code node, "Run Once for All Items"
const sub = $('Parse Tally submission').first().json;
const e = $input.first().json;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const detail = e.error ? (e.error.message || JSON.stringify(e.error)) : JSON.stringify(e).slice(0, 4000);
return [{ json: {
  alertSubject: `[ContractLens ALERT] AI review failed — ${sub.name} (${sub.company})`,
  alertHtml: `<p>The contract download or OpenAI request failed, so <strong>no report was sent</strong> to ${esc(sub.email)}.</p>`
    + `<p>Contract: ${esc(sub.contractTitle)}<br>Files: ${esc(sub.files.map(f => f.url).join(' '))}</p>`
    + `<pre style="white-space:pre-wrap;font-size:12px;">${esc(detail)}</pre>`,
} }];
