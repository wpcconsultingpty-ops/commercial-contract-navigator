# ContractLens n8n workflow (v2)

`contractlens-workflow.json` is generated. Don't edit it by hand. Change the prompts in `prompts/contractlens-*.md` or the node code in `n8n/src/`, then run:

```
python3 n8n/build.py            # default model gpt-6.2-astra
python3 n8n/build.py --model <openai-model-id>
```

## Flow

```
Tally webhook (header auth)
  → Parse Tally submission       labels → fields, option IDs → text, form ID / email / file checks
  → Submission valid? ── no ──→ Alert WPC
  → Build OpenAI request         prompts embedded at build time; downloads each upload and sends the bytes
  → OpenAI review                POST /v1/responses, 15-minute timeout, retry once; errors → Describe AI error → Alert WPC
  → Prepare emails               reads every output_text (not output[0]), splits markers, strips scripts and handlers, wraps in WPC template
  → Report OK? ── no ──→ Alert WPC (raw output attached, nothing sent to the client)
  → Send client report + Send internal report (Gmail, in parallel, n8n attribution off)
```

The client never receives a malformed report. The email is held, and WPC is alerted, if the markers are missing, the model stopped early, the client section is too short, or template code (`{{ }}`, `$json`) is left in it.

## Setup (once)

1. Import the JSON into n8n: Workflows → Import from file.
2. Create three credentials and select them on the nodes. The placeholders are named `REPLACE_*`.
   - **OpenAI** (`openAiApi`) on "OpenAI review"
   - **Gmail OAuth2** on the three Gmail nodes, signed in as the sending account
   - **Header Auth** on "Tally webhook": name `X-ContractLens-Key`, value = a long random string
3. In Tally, open form `ob068X` → Integrations → Webhooks, and paste the production webhook URL (`…/webhook/contractlens-intake`). Then add the HTTP header `X-ContractLens-Key` with the same value.
4. Fill in and verify `prompts/contractlens-sop-reference.md`, then rebuild. Until then, reports state no statutory payment periods.
5. Test with Tally's test submission and a real anonymised contract. Check both emails. Only then activate the workflow.

## Known limits

- The form doesn't ask for project state or which side the submitter is on. The prompt infers both and flags any uncertainty. Adding those two fields to Tally would improve accuracy.
- If a Gmail send fails after three tries, the execution fails. n8n Cloud's failure email is the only alert for that case.
