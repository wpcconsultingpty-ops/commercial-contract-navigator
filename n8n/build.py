#!/usr/bin/env python3
"""Generate n8n/contractlens-workflow.json from prompts/contractlens-*.md and n8n/src/*.js.
Run: python3 n8n/build.py [--model MODEL]"""
import json, pathlib, sys, uuid
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'n8n' / 'src'
model = sys.argv[sys.argv.index('--model') + 1] if '--model' in sys.argv else 'gpt-6.2-astra'
rd = lambda p: (ROOT / p).read_text()
build_js = (SRC / 'build-request.js').read_text() \
    .replace('__MODEL__', model) \
    .replace('__SYSTEM__', json.dumps(rd('prompts/contractlens-system.md'))) \
    .replace('__FORMAT__', json.dumps(rd('prompts/contractlens-output-format.md'))) \
    .replace('__SOP__', json.dumps(rd('prompts/contractlens-sop-reference.md')))

def nid(name): return str(uuid.uuid5(uuid.NAMESPACE_URL, 'contractlens/' + name))
def code(name, js, pos):
    return {"id": nid(name), "name": name, "type": "n8n-nodes-base.code", "typeVersion": 2, "position": pos,
            "parameters": {"mode": "runOnceForAllItems", "language": "javaScript", "jsCode": js}}
def gmail(name, to, subj, msg, pos):
    return {"id": nid(name), "name": name, "type": "n8n-nodes-base.gmail", "typeVersion": 2.1, "position": pos,
            "parameters": {"resource": "message", "operation": "send", "sendTo": to, "subject": subj,
                           "emailType": "html", "message": msg,
                           "options": {"appendAttribution": False, "senderName": "WPC Consulting — ContractLens",
                                       "replyTo": "russell.hopkins@wpcconsulting.com.au"}},
            "credentials": {"gmailOAuth2": {"id": "REPLACE_GMAIL_CREDENTIAL", "name": "Gmail — wpcconsultingpty"}},
            "retryOnFail": True, "maxTries": 3, "waitBetweenTries": 5000}
def iff(name, expr, pos):
    return {"id": nid(name), "name": name, "type": "n8n-nodes-base.if", "typeVersion": 2.2, "position": pos,
            "parameters": {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 2},
                "conditions": [{"id": nid(name + '/c'), "leftValue": expr, "rightValue": "",
                                "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
                "combinator": "and"}, "options": {}}}

nodes = [
    {"id": nid('Tally webhook'), "name": "Tally webhook", "type": "n8n-nodes-base.webhook", "typeVersion": 2,
     "position": [0, 300], "webhookId": nid('webhook-id'),
     "parameters": {"httpMethod": "POST", "path": "contractlens-intake", "authentication": "headerAuth",
                    "responseMode": "onReceived", "options": {}},
     "credentials": {"httpHeaderAuth": {"id": "REPLACE_TALLY_HEADER_CREDENTIAL", "name": "Tally webhook header"}}},
    code('Parse Tally submission', (SRC / 'parse-submission.js').read_text(), [220, 300]),
    iff('Submission valid?', '={{ $json.valid }}', [440, 300]),
    {**code('Build OpenAI request', build_js, [660, 200]), "onError": "continueErrorOutput"},
    {"id": nid('OpenAI review'), "name": "OpenAI review", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2,
     "position": [880, 200],
     "parameters": {"method": "POST", "url": "https://api.openai.com/v1/responses",
                    "authentication": "predefinedCredentialType", "nodeCredentialType": "openAiApi",
                    "sendBody": True, "specifyBody": "json", "jsonBody": "={{ JSON.stringify($json.openaiBody) }}",
                    "options": {"timeout": 900000}},
     "credentials": {"openAiApi": {"id": "REPLACE_OPENAI_CREDENTIAL", "name": "OpenAI — ContractLens"}},
     "retryOnFail": True, "maxTries": 2, "waitBetweenTries": 5000, "onError": "continueErrorOutput"},
    code('Prepare emails', (SRC / 'prepare-emails.js').read_text(), [1100, 120]),
    iff('Report OK?', '={{ $json.ok }}', [1320, 120]),
    gmail('Send client report', '={{ $json.clientTo }}', '={{ $json.clientSubject }}', '={{ $json.clientHtml }}', [1540, 40]),
    gmail('Send internal report', '={{ $json.internalTo }}', '={{ $json.internalSubject }}', '={{ $json.internalHtml }}', [1540, 200]),
    code('Describe AI error', (SRC / 'describe-ai-error.js').read_text(), [1100, 320]),
    gmail('Alert WPC', 'russell.hopkins@wpcconsulting.com.au', '={{ $json.alertSubject }}', '={{ $json.alertHtml }}', [1540, 400]),
]
C = lambda *targets: {"main": [[{"node": t, "type": "main", "index": 0} for t in br] for br in targets]}
connections = {
    "Tally webhook": C(["Parse Tally submission"]),
    "Parse Tally submission": C(["Submission valid?"]),
    "Submission valid?": C(["Build OpenAI request"], ["Alert WPC"]),
    "Build OpenAI request": C(["OpenAI review"], ["Describe AI error"]),
    "OpenAI review": C(["Prepare emails"], ["Describe AI error"]),
    "Prepare emails": C(["Report OK?"]),
    "Report OK?": C(["Send client report", "Send internal report"], ["Alert WPC"]),
    "Describe AI error": C(["Alert WPC"]),
}
wf = {"name": "ContractLens — contract review (v2)", "nodes": nodes, "connections": connections,
      "settings": {"executionOrder": "v1", "timezone": "Australia/Brisbane", "saveDataErrorExecution": "all",
                   "saveDataSuccessExecution": "all"}, "pinData": {}}
out = ROOT / 'n8n' / 'contractlens-workflow.json'
out.write_text(json.dumps(wf, indent=2, ensure_ascii=False) + '\n')
print('wrote', out, 'model', model, 'nodes', len(nodes))
