# Template — Client Teaser Output Format

IMPORTANT: This output is sent directly to the client as a lead-generation email. DO NOT provide detailed analysis, recommended amendments, fallback positions, or negotiation strategies. The purpose is to signal risk, create urgency, and prompt them to engage WPC Consulting for the full review.

Produce your response in clean HTML suitable for email. Use the exact structure below.

---

## SECTION 1 — Contract Snapshot

Output the following as a simple HTML summary block:
- Contract name: [from submission]
- Contract type: [from submission]
- Counterparty: [from submission]
- Overall risk profile: [LOW / MEDIUM / HIGH / CRITICAL] — determined from your analysis
- Total issues identified: [number] — count all issues found across all risk categories

---

## SECTION 2 — Risk Signal Summary

Output a brief 2–3 sentence plain-English paragraph that:
- Confirms you have reviewed the contract
- States the overall risk level in plain language (e.g. "This contract carries a HIGH commercial risk profile")
- Notes the number of issues identified across how many risk categories (e.g. "We identified 9 issues spanning 4 risk categories")
- Does NOT name specific clauses, clause numbers, or provide any recommended actions

---

## SECTION 3 — Risk Category Flags (Teaser Only)

List the risk categories where issues were found. For each category:
- Show the category name
- Show the highest severity rating found in that category (LOW / MEDIUM / HIGH / CRITICAL)
- Show the number of issues in that category
- DO NOT describe the issues, name clauses, or provide any detail

Format example (repeat for each affected category):
- [Category Name] — [SEVERITY] — [X] issue(s) identified

Categories to check: Payment Terms, Liability & Indemnity, Termination Rights, IP Ownership, Variations & Change Management, Dispute Resolution, Insurance, General Commercial Risk

---

## SECTION 4 — One Sample Flag (Hook)

Reveal ONE issue only — chosen as the most commercially significant. Provide:
- Category: [category name]
- Severity: [rating]
- Flag: A single sentence describing the nature of the risk in plain English — no clause reference, no recommended action, no fix

Example format:
"We identified a [SEVERITY] risk in [Category] — [one sentence describing the commercial exposure without giving away the solution]."

Do not reveal any more than this one flag.

---

## SECTION 5 — Closing Statement (Fixed Text)

Output this exact paragraph verbatim, substituting only the bracketed values:

"Hi [First Name], your [Contract Type] with [Counterparty] has been assessed and we've found [X] commercial issues that need your attention before you sign or proceed. The full findings — including clause-by-clause analysis, recommended amendments, negotiation priorities, and our commercial advice — are ready and waiting. To receive your complete report and discuss your options, book a free 30-minute call with WPC Consulting below."

---

## OUTPUT RULES

- Respond in HTML only — no markdown, no plain text
- Do not include any CSS, style tags, or inline styles (the email wrapper handles this)
- Use <h2>, <p>, <ul>, <li>, <strong>, <br> tags only
- Do not output Section headings as visible text — embed the content directly in the HTML structure
- Never include: clause references, clause numbers, recommended amendments, fallback positions, negotiation strategies, acceptance conditions, or any actionable legal or commercial advice in this output
- The full analysis is retained internally and sent separately to the WPC Consulting CC address
