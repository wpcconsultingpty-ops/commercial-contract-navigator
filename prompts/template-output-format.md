# Template — Dual Output Format (Teaser + Full Report)

IMPORTANT: This prompt instructs you to produce TWO separate outputs in a single response.

1. A CLIENT TEASER — sent to the customer to signal risk and drive them to engage WPC Consulting. No actionable detail.
2. A FULL INTERNAL REPORT — sent only to WPC Consulting (russell.hopkins@wpcconsulting.com.au) with the complete commercial analysis.

Produce both outputs in clean HTML. Separate them using the exact HTML comment markers shown below. Do not include any text outside these two sections.

---

<!-- TEASER_START -->

## TEASER SECTION (Client-Facing)

Output content for the CLIENT EMAIL only. Rules:
- DO NOT provide clause references, recommended amendments, fallback positions, negotiation strategies, or any actionable advice
- Purpose: signal risk, create urgency, prompt them to book a call with WPC Consulting

### Contract Snapshot
Present as a simple HTML table:
- Contract name: [from submission]
- Contract type: [from submission]
- Counterparty: [from submission]
- Overall risk profile: [LOW / MEDIUM / HIGH / CRITICAL]
- Total issues identified: [number] across [number] risk categories

### Risk Signal Summary
A 2-3 sentence plain-English paragraph:
- Confirms the contract has been reviewed
- States the overall risk level plainly
- Notes how many issues were found across how many categories
- NO clause names, numbers, or recommended actions

### Risk Category Flags
For each category where issues were found, output a single line:
- [Category Name] — [SEVERITY] — [X] issue(s)
Categories: Payment Terms, Liability & Indemnity, Termination Rights, IP Ownership, Variations & Change Management, Dispute Resolution, Insurance, General Commercial Risk

### Sample Flag (Hook)
Reveal ONE issue only — the most commercially significant. One sentence describing the risk in plain English. No clause reference, no fix.
Format: "We identified a [SEVERITY] risk in [Category] — [one sentence on the commercial exposure]."

### Closing Statement
Output this verbatim (substitute bracketed values only):
"Hi [First Name], your [Contract Type] with [Counterparty] has been assessed and we’ve found [X] commercial issues that need your attention before you sign or proceed. The full findings — including clause-by-clause analysis, recommended amendments, negotiation priorities, and our commercial advice — are ready and waiting. To receive your complete report and discuss your options, book a free 30-minute call with WPC Consulting below."

<!-- TEASER_END -->

<!-- FULL_REPORT_START -->

## FULL INTERNAL REPORT SECTION (WPC Consulting Only)

Output the COMPLETE commercial analysis. This is a working document for Russell Hopkins as Commercial Manager. Be thorough and specific.

### Executive Snapshot
HTML table with:
- Contract name
- Party position (which party the client represents)
- Contract type
- Governing law / jurisdiction
- Contract value (if stated or estimable)
- Overall risk profile: LOW / MEDIUM / HIGH / CRITICAL
- Total issues identified
- Recommended action: ACCEPT / ACCEPT WITH AMENDMENTS / REJECT / ESCALATE

### Detailed Issues
For EVERY issue found, output a block:

**Issue [number] — [title]**
- Clause reference: [exact clause number and heading]
- Risk rating: LOW / MEDIUM / HIGH / CRITICAL
- Contract position: [what it currently says, plain English]
- Why it matters: [commercial impact — financial, operational, legal]
- Recommended amendment: [exact proposed wording or deletion]
- Fallback position: [what to accept if preferred amendment is rejected]
- Operational mitigation: [internal steps if clause cannot be changed]
- Escalate for legal review: Yes/No — [reason]

Include ALL issues. Group by risk category. Do not omit or summarise.

### Negotiation Priorities
Top 5 in order of commercial importance:
- Priority 1: [issue title + why it’s the top priority]
- Priority 2:
- Priority 3:
- Priority 4:
- Priority 5:

### Acceptance Conditions
List all matters that could be accepted if pricing, exclusions, qualifications, or delivery controls are adjusted. State the matter and the condition for acceptance.

### Commercial Manager Notes
3-5 strategic dot points for Russell Hopkins:
- Key relationships and leverage points
- Commercial risks to monitor during execution (not just at signing)
- Suggested opening position for negotiations
- Any red flags suggesting bad faith or unfair contract terms
- Recommended sequence for raising issues
- Flag any clauses that may constitute unfair contract terms under Australian Consumer Law
- Reference applicable Australian standards (AS 4902, AS 4000, etc.) where relevant

<!-- FULL_REPORT_END -->

---

## OUTPUT RULES

- Respond in HTML only — no markdown, no plain text
- Do not include CSS, style tags, or html/body wrappers (the email node handles this)
- Use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table>, <tr>, <td>, <br> tags
- Start your response with <!-- TEASER_START --> and include both sections
- Do NOT output anything outside the two comment-marked sections
