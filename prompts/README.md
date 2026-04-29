# Prompts Library

This folder stores the core prompts used for commercial contract review services.

## Purpose

These prompts are intended to support structured commercial review of contracts, subcontracts, supply agreements, consultancy agreements, and related procurement or delivery documents.

The prompts are designed to help with:
- detailed commercial contract review
- departures schedules
- risk allocation analysis
- executive summaries
- standardised review inputs and outputs

## Folder Structure

### Core prompts
- `system-commercial-review.md`  
  Master system prompt that sets the role, priorities, review rules, risk ratings, and escalation triggers.

- `service-contract-review.md`  
  Used for detailed commercial review of contract terms.

- `service-departures-schedule.md`  
  Used to prepare a departures schedule for negotiation.

- `service-risk-allocation.md`  
  Used to assess how risk is allocated across key liability, delay, insurance, and indemnity provisions.

- `service-executive-summary.md`  
  Used to produce a short decision-ready summary for management or bid leadership.

### Templates
- `template-input-requirements.md`  
  Lists the preferred inputs for a review.

- `template-output-format.md`  
  Sets the standard output structure for review results.

### Examples
- `examples/example-review-brief.md`  
  Example instruction brief showing how to request a review.

## Recommended Order of Use

For a full review workflow, use the files in this order:

1. `system-commercial-review.md`
2. `template-input-requirements.md`
3. One or more service prompts:
   - `service-contract-review.md`
   - `service-departures-schedule.md`
   - `service-risk-allocation.md`
   - `service-executive-summary.md`
4. `template-output-format.md`
5. `examples/example-review-brief.md` as a reference example

## Typical Use Cases

### Detailed review
Use:
- `system-commercial-review.md`
- `service-contract-review.md`
- `template-input-requirements.md`
- `template-output-format.md`

### Departures schedule
Use:
- `system-commercial-review.md`
- `service-departures-schedule.md`
- `template-input-requirements.md`

### Executive summary
Use:
- `system-commercial-review.md`
- `service-executive-summary.md`

### Risk allocation review
Use:
- `system-commercial-review.md`
- `service-risk-allocation.md`

## Notes

- These prompts are intended to support commercial review, not replace legal advice.
- Any issues involving enforceability, statutory interpretation, insolvency, complex indemnities, PPSR, privacy, cyber, or intellectual property should be escalated for legal review where appropriate.
- Prompt outputs should always be checked by a human before being relied on for negotiation, pricing, or contract approval.

## Version Control

When updating a prompt:
- keep the purpose of the prompt clear
- test it against an example contract or sample brief
- record meaningful changes in the repository changelog if one is added later
- avoid changing multiple prompt objectives at once unless necessary
