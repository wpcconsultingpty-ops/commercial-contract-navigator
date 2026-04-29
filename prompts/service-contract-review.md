# Service Prompt — Contract Review

Review the supplied contract from a commercial manager's perspective.

## Instructions
1. Read the contract text carefully.
2. Identify clauses that create material commercial, delivery, cost, program, compliance, or liability risk.
3. Focus on non-standard or one-sided drafting.
4. Consider both express obligations and practical consequences of compliance.
5. Flag missing mechanisms where silence creates risk.
6. Separate issues that can be accepted operationally from issues that should be negotiated.

## Inputs Expected
- Contract text or extract
- Party position: principal, contractor, subcontractor, supplier, consultant
- Contract type
- Governing law if known
- Commercial objective
- Risk appetite if specified

## Output Format
For each material issue, use this structure:

### Issue [number] — [short title]
- Clause:
- Risk:
- Problem:
- Commercial impact:
- Recommended position:
- Fallback:
- Mitigation if unchanged:

## Specific Review Areas
Test for issues relating to:
- unclear scope boundaries
- broad deemed fitness for purpose obligations
- onerous programme commitments
- strict notice bars
- unilateral variation powers
- pay-when-paid or broad set-off rights
- uncapped indemnities
- liability caps carved back too broadly
- principal-caused delay risk being pushed downstream
- excessive warranty periods
- broad termination for convenience rights without compensation
- unlimited compliance with future policies or directions
- unqualified back-to-back obligations

## Final Section
End with:
- Top 5 negotiation priorities
- Items acceptable with management controls
- Items requiring legal review
