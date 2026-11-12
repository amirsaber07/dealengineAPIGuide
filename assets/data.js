/* Generated from source/DealEngine-Developer-Guide.txt. */
window.DEALENGINE_DOCS = {
  "version": "v1",
  "baseUrl": "https://dealengine.cloud/api/v1",
  "sourceTitle": "DealEngine Developer Guide",
  "endpointCount": 28,
  "endpoints": [
    {
      "id": "ep-get-me",
      "slug": "get-me",
      "method": "GET",
      "path": "/api/v1/me",
      "title": "Identify the API key",
      "group": "Workspace",
      "description": "What this key is: workspace, the person it acts as, its permissions, scopes and rate limit.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-clients",
      "slug": "list-clients",
      "method": "GET",
      "path": "/api/v1/clients",
      "title": "List clients",
      "group": "Clients",
      "description": "Clients the key can see, newest change first.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-create-client",
      "slug": "create-client",
      "method": "POST",
      "path": "/api/v1/clients",
      "title": "Create a client",
      "group": "Clients",
      "description": "Create a client, optionally with its first contact.",
      "permission": "clients.create",
      "isList": false,
      "bodyFields": [
        "companyName",
        "accountStatus",
        "stageKey",
        "industry",
        "subIndustry",
        "website",
        "phone",
        "companyEmail",
        "taxNumber",
        "addressLine",
        "addressLine2",
        "city",
        "state",
        "postcode",
        "country",
        "sizeBand",
        "revenueBand",
        "foundedYear",
        "linkedinUrl",
        "doNotContact",
        "notes",
        "accountManagerPublicId",
        "salesAgentPublicId",
        "parentPublicId",
        "entityPublicId",
        "defaultCurrency",
        "defaultVatRate",
        "defaultBreakdownSchemeKey",
        "custom"
      ],
      "exampleBody": {
        "client": {
          "companyName": "Acme Trading",
          "country": "SA"
        },
        "contact": {
          "name": "Sara Ali",
          "email": "sara@acme.example"
        }
      }
    },
    {
      "id": "ep-get-client",
      "slug": "get-client",
      "method": "GET",
      "path": "/api/v1/clients/{id}",
      "title": "Retrieve a client",
      "group": "Clients",
      "description": "One client by id.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-update-client",
      "slug": "update-client",
      "method": "PATCH",
      "path": "/api/v1/clients/{id}",
      "title": "Update a client",
      "group": "Clients",
      "description": "Update a client. Only the fields you send change; everything you leave out stays as it is, and custom values you send are merged over the ones already set. The body uses the same names as the client part of a create, not the shape GET returns.",
      "permission": "clients.edit",
      "isList": false,
      "bodyFields": [
        "companyName",
        "accountStatus",
        "stageKey",
        "industry",
        "subIndustry",
        "website",
        "phone",
        "companyEmail",
        "taxNumber",
        "addressLine",
        "addressLine2",
        "city",
        "state",
        "postcode",
        "country",
        "sizeBand",
        "revenueBand",
        "foundedYear",
        "linkedinUrl",
        "doNotContact",
        "notes",
        "ownerPublicId",
        "accountManagerPublicId",
        "salesAgentPublicId",
        "parentPublicId",
        "entityPublicId",
        "defaultCurrency",
        "defaultVatRate",
        "defaultBreakdownSchemeKey",
        "custom"
      ],
      "exampleBody": null
    },
    {
      "id": "ep-list-deals",
      "slug": "list-deals",
      "method": "GET",
      "path": "/api/v1/deals",
      "title": "List deals",
      "group": "Deals & pipeline",
      "description": "Deals the key can see, newest change first.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-create-deal",
      "slug": "create-deal",
      "method": "POST",
      "path": "/api/v1/deals",
      "title": "Create a deal",
      "group": "Deals & pipeline",
      "description": "Create a deal for a client, in any stage — won and lost included, for history.",
      "permission": "deals.create",
      "isList": false,
      "bodyFields": [
        "name",
        "clientPublicId",
        "stageKey",
        "amount",
        "currency",
        "probability",
        "expectedCloseDate",
        "source",
        "nextStep",
        "competitor",
        "dealType",
        "ownerPublicId",
        "primaryContactPublicId",
        "contacts",
        "origin",
        "custom",
        "tags",
        "closedAt",
        "lostReason"
      ],
      "exampleBody": {
        "name": "Ministry of Tourism — event production",
        "clientPublicId": "01KZQ8M4T0P3JX6R2WQE5N9DAV",
        "stageKey": "negotiation",
        "amount": 14490,
        "currency": "SAR",
        "expectedCloseDate": "2026-12-15",
        "ownerPublicId": "01KZQ8M4T0P3JX6R2WQE5N9DAX",
        "primaryContactPublicId": "01KZR12RRRWC7W7VDEMP0KCKK9",
        "contacts": [
          {
            "publicId": "01KZR12RRRWC7W7VDEMP0KCKK9",
            "role": "Decision maker"
          }
        ],
        "source": "referral",
        "origin": {
          "kind": "legacy"
        },
        "tags": [
          "Migrated"
        ]
      }
    },
    {
      "id": "ep-get-deal",
      "slug": "get-deal",
      "method": "GET",
      "path": "/api/v1/deals/{id}",
      "title": "Retrieve a deal",
      "group": "Deals & pipeline",
      "description": "One deal by id.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-update-deal",
      "slug": "update-deal",
      "method": "PATCH",
      "path": "/api/v1/deals/{id}",
      "title": "Update a deal",
      "group": "Deals & pipeline",
      "description": "Update a deal: stage, owner, value, dates, people and the rest. Only the fields you send change.",
      "permission": "deals.edit",
      "isList": false,
      "bodyFields": [
        "name",
        "clientPublicId",
        "stageKey",
        "amount",
        "currency",
        "probability",
        "expectedCloseDate",
        "source",
        "nextStep",
        "competitor",
        "dealType",
        "ownerPublicId",
        "primaryContactPublicId",
        "contacts",
        "origin",
        "custom",
        "tags",
        "closedAt",
        "lostReason"
      ],
      "exampleBody": null
    },
    {
      "id": "ep-get-pipeline",
      "slug": "get-pipeline",
      "method": "GET",
      "path": "/api/v1/pipeline",
      "title": "List pipeline stages",
      "group": "Deals & pipeline",
      "description": "The workspace's deal stages in board order: each stage's key, name, type (open, won or lost) and default probability.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-leads",
      "slug": "list-leads",
      "method": "GET",
      "path": "/api/v1/leads",
      "title": "List leads",
      "group": "Leads",
      "description": "Leads the key can see, newest change first. Needs Marketing to be switched on.",
      "permission": "marketing.access",
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-upsert-lead",
      "slug": "upsert-lead",
      "method": "POST",
      "path": "/api/v1/leads",
      "title": "Create or update a lead",
      "group": "Leads",
      "description": "Add a lead, or update the one that already has that email address.",
      "permission": "marketing.leads.manage",
      "isList": false,
      "bodyFields": [
        "email",
        "firstName",
        "lastName",
        "title",
        "seniority",
        "department",
        "phone",
        "linkedinUrl",
        "companyName",
        "website",
        "industry",
        "subIndustry",
        "sizeBand",
        "country",
        "city",
        "timezone",
        "locale",
        "status",
        "source",
        "sourceDetail",
        "consentBasis",
        "notes",
        "entityPublicId",
        "custom",
        "tags"
      ],
      "exampleBody": {
        "email": "omar@prospect.example",
        "firstName": "Omar",
        "lastName": "Nasser",
        "title": "Procurement Manager",
        "companyName": "Prospect Holdings",
        "country": "AE",
        "phone": "+971 50 123 4567",
        "status": "contacted",
        "notes": "Brought over from our old CRM",
        "tags": [
          "Migrated"
        ]
      }
    },
    {
      "id": "ep-get-lead",
      "slug": "get-lead",
      "method": "GET",
      "path": "/api/v1/leads/{id}",
      "title": "Retrieve a lead",
      "group": "Leads",
      "description": "One lead by id.",
      "permission": "marketing.access",
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-update-lead",
      "slug": "update-lead",
      "method": "PATCH",
      "path": "/api/v1/leads/{id}",
      "title": "Update a lead",
      "group": "Leads",
      "description": "Update a lead. Only the fields you send change; a new email address must not belong to another lead.",
      "permission": "marketing.leads.manage",
      "isList": false,
      "bodyFields": [
        "email",
        "firstName",
        "lastName",
        "title",
        "seniority",
        "department",
        "phone",
        "linkedinUrl",
        "companyName",
        "website",
        "industry",
        "subIndustry",
        "sizeBand",
        "country",
        "city",
        "timezone",
        "locale",
        "status",
        "source",
        "sourceDetail",
        "consentBasis",
        "notes",
        "entityPublicId",
        "custom",
        "tags"
      ],
      "exampleBody": null
    },
    {
      "id": "ep-list-quotations",
      "slug": "list-quotations",
      "method": "GET",
      "path": "/api/v1/quotations",
      "title": "List quotations",
      "group": "Quotations",
      "description": "Quotations the key can see, newest change first.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-get-quotation",
      "slug": "get-quotation",
      "method": "GET",
      "path": "/api/v1/quotations/{id}",
      "title": "Retrieve a quotation",
      "group": "Quotations",
      "description": "One quotation by id, including its acceptance record if it has one.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-contacts",
      "slug": "list-contacts",
      "method": "GET",
      "path": "/api/v1/contacts",
      "title": "List contacts",
      "group": "Contacts",
      "description": "People at the accounts the key can see, filtered by the same scope as the accounts themselves.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-get-contact",
      "slug": "get-contact",
      "method": "GET",
      "path": "/api/v1/contacts/{id}",
      "title": "Retrieve a contact",
      "group": "Contacts",
      "description": "One contact by id.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-contracts",
      "slug": "list-contracts",
      "method": "GET",
      "path": "/api/v1/contracts",
      "title": "List contracts",
      "group": "Contracts",
      "description": "Contracts the key can see, the soonest-ending first — the order a renewals list wants.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-get-contract",
      "slug": "get-contract",
      "method": "GET",
      "path": "/api/v1/contracts/{id}",
      "title": "Retrieve a contract",
      "group": "Contracts",
      "description": "One contract by id, with its renewal terms.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-activities",
      "slug": "list-activities",
      "method": "GET",
      "path": "/api/v1/activities",
      "title": "List activities",
      "group": "Activities",
      "description": "The timeline, newest first: notes, tasks, calls and meetings, and the rows the product writes itself (stage changes, quotation events) — on the deals the key can see and, for a key that sees every deal, on accounts too.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-feedback",
      "slug": "list-feedback",
      "method": "GET",
      "path": "/api/v1/feedback",
      "title": "List feedback",
      "group": "Account management",
      "description": "What clients said at the accounts the key can see — Transparent's feedback, emails read as feedback and ratings clicked in account emails, newest first. Duplicates and feedback a person said is not feedback are left out. Needs Account management.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-account-touches",
      "slug": "list-account-touches",
      "method": "GET",
      "path": "/api/v1/account-touches",
      "title": "List account touches",
      "group": "Account management",
      "description": "The emails account programs wrote at the accounts the key can see, newest first, with their status and why. The subject and body come back only for an email that was sent. Needs Account management.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-tags",
      "slug": "list-tags",
      "method": "GET",
      "path": "/api/v1/tags",
      "title": "List tags",
      "group": "Tags",
      "description": "The workspace's tag library: each tag's id, name, colour, group, the kinds of record it applies to, and whether it is archived. Every resource above carries its own tags as a tags list of id, name and colour, and POST and PATCH on clients, deals and leads take tags as a list of names.",
      "permission": null,
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-list-reports",
      "slug": "list-reports",
      "method": "GET",
      "path": "/api/v1/reports",
      "title": "List saved reports",
      "group": "Reports",
      "description": "The saved reports the key's person can run, each with the columns they would receive.",
      "permission": "reports.view",
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-run-report",
      "slug": "run-report",
      "method": "GET",
      "path": "/api/v1/reports/{id}/rows",
      "title": "Run saved report",
      "group": "Reports",
      "description": "A saved report's rows, run now with the key's person's own access, in pages.",
      "permission": "reports.view",
      "isList": true,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-get-resource-request",
      "slug": "get-resource-request",
      "method": "GET",
      "path": "/api/v1/transparent/resource-requests/{transparentId}",
      "title": "Get resource request",
      "group": "Transparent integration",
      "description": "One request for resource, by Transparent's own id for it.",
      "permission": null,
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    },
    {
      "id": "ep-submit-resource-result",
      "slug": "submit-resource-result",
      "method": "POST",
      "path": "/api/v1/transparent/resource-requests/{transparentId}/result",
      "title": "Submit resource result",
      "group": "Transparent integration",
      "description": "Post the answer to a request for resource. Needs deals.edit and a key that is not read-only.",
      "permission": "deals.edit",
      "isList": false,
      "bodyFields": [],
      "exampleBody": null
    }
  ],
  "filters": [
    {
      "name": "q",
      "worksOn": "/clients",
      "description": "Matches part of the company name."
    },
    {
      "name": "q",
      "worksOn": "/leads",
      "description": "Matches part of the email address, the person's name or the company name."
    },
    {
      "name": "status",
      "worksOn": "/leads",
      "description": "new, contacted, replied, interested, qualified, lost, converted, bounced, unsubscribed or suppressed."
    },
    {
      "name": "accountStatus",
      "worksOn": "/clients",
      "description": "active, on_hold or archived."
    },
    {
      "name": "status",
      "worksOn": "/deals, /quotations, /contracts",
      "description": "Deals: open, won, lost. Quotations: draft, pending, approved, rejected, sent, won, lost, expired. Contracts: active, renewed, ended, cancelled. Invoices: draft, issued, paid, void. On deals, quotations and invoices any other value is refused with invalid."
    },
    {
      "name": "stage",
      "worksOn": "/deals",
      "description": "The pipeline stage's stable key — never its name, which a workspace is free to rename."
    },
    {
      "name": "client",
      "worksOn": "/quotations, /contacts, /contracts, /activities, /feedback, /account-touches",
      "description": "A client id, to get only that account's records."
    },
    {
      "name": "sentiment",
      "worksOn": "/feedback",
      "description": "positive, neutral or negative."
    },
    {
      "name": "source",
      "worksOn": "/feedback",
      "description": "transparent, email or survey (a rating clicked in an account email)."
    },
    {
      "name": "complaints",
      "worksOn": "/feedback",
      "description": "true for complaints only."
    },
    {
      "name": "status",
      "worksOn": "/account-touches",
      "description": "scheduled, draft, held, sent, skipped, cancelled or failed. An email going out at that moment reads sending, which cannot be filtered on."
    },
    {
      "name": "since",
      "worksOn": "/feedback, /account-touches",
      "description": "An ISO date-time: feedback received, or emails written, on or after it."
    },
    {
      "name": "email",
      "worksOn": "/contacts, /leads",
      "description": "Exact email address, for finding one person."
    },
    {
      "name": "primary",
      "worksOn": "/contacts",
      "description": "true returns only each account's primary contact."
    },
    {
      "name": "kind",
      "worksOn": "/activities",
      "description": "note, task, call or meeting — or stage_change, quote_event and system for the rows the product writes itself. Any other value is refused with invalid."
    },
    {
      "name": "deal",
      "worksOn": "/activities",
      "description": "Public id of a deal, for that deal's timeline."
    },
    {
      "name": "contact",
      "worksOn": "/activities",
      "description": "Public id of a contact, for what was logged with that person."
    },
    {
      "name": "openTasks",
      "worksOn": "/activities",
      "description": "true returns only tasks that are not done."
    },
    {
      "name": "endsBefore",
      "worksOn": "/contracts",
      "description": "Contracts ending before this date — a renewals query."
    },
    {
      "name": "updatedSince",
      "worksOn": "/clients, /deals, /leads, /quotations, /contacts, /activities",
      "description": "An ISO-8601 timestamp. Returns only records changed at or after it."
    },
    {
      "name": "tags, tagsMode",
      "worksOn": "/clients, /deals, /leads, /quotations, /contacts, /contracts, /activities",
      "description": "Tag names or ids, comma-separated: records carrying any of them. tagsMode=all asks for every one, tagsMode=none for none of them."
    },
    {
      "name": "limit",
      "worksOn": "every list",
      "description": "Rows per page. Default 50, maximum 200."
    },
    {
      "name": "offset",
      "worksOn": "every list",
      "description": "Rows to skip."
    }
  ],
  "events": [
    {
      "name": "quotation.sent",
      "description": "A quotation was sent to a client — emailed from DealEngine, or marked as sent by hand."
    },
    {
      "name": "quotation.accepted",
      "description": "A client accepted a quotation. The payload carries the accepted total, which can differ from the offered one when optional lines were declined."
    },
    {
      "name": "quotation.declined",
      "description": "A client declined a quotation."
    },
    {
      "name": "quotation.expired",
      "description": "A quotation passed its validity date without an answer."
    },
    {
      "name": "deal.created",
      "description": "A deal was created — in the app or through the API. Deals brought in by an import do not send one each."
    },
    {
      "name": "lead.created",
      "description": "A lead was added by hand or through the API. Leads from an import, a capture form or prospecting do not send one each."
    },
    {
      "name": "deal.won",
      "description": "A deal was won — moved to a won stage, won by its client accepting the quotation, or won by a quotation marked won. The event an invoicing integration is usually waiting for."
    },
    {
      "name": "deal.lost",
      "description": "A deal was lost."
    },
    {
      "name": "approval.requested",
      "description": "A quotation was submitted for approval, or an approval chain moved on to its next approver."
    },
    {
      "name": "approval.decided",
      "description": "An approver approved, rejected or asked for changes."
    },
    {
      "name": "invoice.issued",
      "description": "An invoice was issued. It is immutable from this point, and this is the event an accounting integration usually waits for."
    },
    {
      "name": "invoice.paid",
      "description": "An invoice was settled in full."
    },
    {
      "name": "invoice.voided",
      "description": "An invoice was voided. The payload carries the reason."
    },
    {
      "name": "payment.received",
      "description": "A payment was recorded against an invoice. Partial payments raise this each time, so read the invoice's standing rather than assuming it is settled."
    },
    {
      "name": "feedback.received",
      "description": "Client feedback reached the account programs — from Transparent, an email read as feedback, or a rating clicked in an account email. It is sent by the account programs' own run, so only while Account management is on and up to about five minutes after the feedback arrived; a clicked rating waits 30 minutes in case it is changed, and feedback loaded as history never sends one. Duplicates and feedback a person said is not feedback are not sent."
    },
    {
      "name": "touch.sent",
      "description": "An account program's email went out from the account manager's mailbox. The payload carries its words."
    },
    {
      "name": "tags.changed",
      "description": "Tags were put on or taken off a record — from its page, a bulk change, an import or the API. The payload names the record, what was added, what was removed, and the tags it carries now."
    }
  ],
  "errors": [
    {
      "code": "invalid",
      "status": 400,
      "description": "The body or a parameter was wrong. The message says which."
    },
    {
      "code": "unauthorized",
      "status": 401,
      "description": "No key, or a key that is not valid, revoked or expired."
    },
    {
      "code": "forbidden",
      "status": 403,
      "description": "The key is real but not allowed: read-only on a write, its role lacks the permission, or — on /feedback and /account-touches — Account management is switched off in the workspace."
    },
    {
      "code": "notFound",
      "status": 404,
      "description": "No such record — or one outside this key's scope, which reads the same on purpose."
    },
    {
      "code": "rateLimited",
      "status": 429,
      "description": "Too many requests. Wait for Retry-After."
    },
    {
      "code": "serverError",
      "status": 500,
      "description": "Our fault. Retry with backoff; if it persists, tell us."
    }
  ],
  "chapters": {
    "Getting started": "One REST API over HTTPS, JSON in and JSON out. Every path is versioned, and a breaking change gets a new version rather than a new shape at the old address.\n\nBase URL\nhttps://dealengine.cloud/api/v1\nVersion header\nX-API-Version\nEvery response carries X-API-Version with the date this contract was fixed. Log it — when something changes, that value is what tells you which one you were talking to.\n\ncurl -H \"Authorization: Bearer de_live_xxxxxxxx_…\" \\\n  https://dealengine.cloud/api/v1/me\nCopy\nThat call answers the four questions support otherwise has to look up: which workspace the key belongs to, whom it acts as, exactly which permissions and scopes it has, and its rate limit. Make it first.",
    "Authentication": "Send the key as a bearer token on every request. There is no session, no login call and no refresh — the key is the caller.\n\nAuthorization: Bearer de_live_a1b2c3d4_…\nCopy\nA key acts as one person. It inherits that person's role, permissions and record scope, so it can never see more than they can. Change their role and the key changes with it.\nA read-only key is refused on every write, before any permission is even checked. Use one for anything that only reports.\nThe key is shown once, at creation, and only a hash is kept. Nobody — including us — can read it back. Lose it and mint a new one.\nA key can be given an expiry when it is created. An expired key fails the same way an invalid one does — and so does every key acting as a person who has been deactivated or removed, or in a workspace that is not active, such as one suspended or deleted.\nEvery key starts de_live_ followed by the eight characters the Key column shows, so a credential is obvious on sight in a log or a config file.",
    "Endpoints": "28 of them today. Reads cover clients, contacts, deals, leads, quotations, contracts, activities, client feedback, account emails and saved reports; writes cover clients, deals and leads, plus the one result callback the Transparent integration posts. Campaigns, the reply inbox and Account management's own judgements — Growth ideas, account health and insights, program settings and account reviews — have no API yet. Invoices and payments are issued and recorded in Transparent, not here, so their old endpoints answer 410 Gone. Anything not listed here does not exist yet: a 404 on a path you expected is the honest answer, not an outage.\n\nMethod\tPath\tWhat it does\tNeeds\nGET\t/api/v1/me\tWhat this key is: workspace, the person it acts as, its permissions, scopes and rate limit.\t—\nGET\t/api/v1/clients\tClients the key can see, newest change first.\t—\nPOST\t/api/v1/clients\tCreate a client, optionally with its first contact.\tclients.create\nGET\t/api/v1/clients/{id}\tOne client by id.\t—\nPATCH\t/api/v1/clients/{id}\tUpdate a client. Only the fields you send change; everything you leave out stays as it is, and custom values you send are merged over the ones already set. The body uses the same names as the client part of a create, not the shape GET returns.\tclients.edit\nGET\t/api/v1/deals\tDeals the key can see, newest change first.\t—\nPOST\t/api/v1/deals\tCreate a deal for a client, in any stage — won and lost included, for history.\tdeals.create\nGET\t/api/v1/deals/{id}\tOne deal by id.\t—\nPATCH\t/api/v1/deals/{id}\tUpdate a deal: stage, owner, value, dates, people and the rest. Only the fields you send change.\tdeals.edit\nGET\t/api/v1/pipeline\tThe workspace's deal stages in board order: each stage's key, name, type (open, won or lost) and default probability.\t—\nGET\t/api/v1/leads\tLeads the key can see, newest change first. Needs Marketing to be switched on.\tmarketing.access\nPOST\t/api/v1/leads\tAdd a lead, or update the one that already has that email address.\tmarketing.leads.manage\nGET\t/api/v1/leads/{id}\tOne lead by id.\tmarketing.access\nPATCH\t/api/v1/leads/{id}\tUpdate a lead. Only the fields you send change; a new email address must not belong to another lead.\tmarketing.leads.manage\nGET\t/api/v1/quotations\tQuotations the key can see, newest change first.\t—\nGET\t/api/v1/quotations/{id}\tOne quotation by id, including its acceptance record if it has one.\t—\nGET\t/api/v1/contacts\tPeople at the accounts the key can see, filtered by the same scope as the accounts themselves.\t—\nGET\t/api/v1/contacts/{id}\tOne contact by id.\t—\nGET\t/api/v1/contracts\tContracts the key can see, the soonest-ending first — the order a renewals list wants.\t—\nGET\t/api/v1/contracts/{id}\tOne contract by id, with its renewal terms.\t—\nGET\t/api/v1/activities\tThe timeline, newest first: notes, tasks, calls and meetings, and the rows the product writes itself (stage changes, quotation events) — on the deals the key can see and, for a key that sees every deal, on accounts too.\t—\nGET\t/api/v1/feedback\tWhat clients said at the accounts the key can see — Transparent's feedback, emails read as feedback and ratings clicked in account emails, newest first. Duplicates and feedback a person said is not feedback are left out. Needs Account management.\t—\nGET\t/api/v1/account-touches\tThe emails account programs wrote at the accounts the key can see, newest first, with their status and why. The subject and body come back only for an email that was sent. Needs Account management.\t—\nGET\t/api/v1/tags\tThe workspace's tag library: each tag's id, name, colour, group, the kinds of record it applies to, and whether it is archived. Every resource above carries its own tags as a tags list of id, name and colour, and POST and PATCH on clients, deals and leads take tags as a list of names.\t—\nGET\t/api/v1/reports\tThe saved reports the key's person can run, each with the columns they would receive.\treports.view\nGET\t/api/v1/reports/{id}/rows\tA saved report's rows, run now with the key's person's own access, in pages.\treports.view\nGET\t/api/v1/transparent/resource-requests/{transparentId}\tOne request for resource, by Transparent's own id for it.\t—\nPOST\t/api/v1/transparent/resource-requests/{transparentId}/result\tPost the answer to a request for resource. Needs deals.edit and a key that is not read-only.\tdeals.edit\nThe create body wraps the record, so a contact can travel with it:\n\n{\n  \"client\":  { \"companyName\": \"Acme Trading\", \"country\": \"SA\" },\n  \"contact\": { \"name\": \"Sara Ali\", \"email\": \"sara@acme.example\" }\n}\nCopy\nWrites use input names, which are not the names GET returns. A client takes companyName, accountStatus, stageKey, industry, subIndustry, website, phone, companyEmail, taxNumber, addressLine, addressLine2, city, state, postcode, country, sizeBand, revenueBand, foundedYear, linkedinUrl, doNotContact, notes, ownerPublicId, accountManagerPublicId, salesAgentPublicId, parentPublicId, entityPublicId (the branch), defaultCurrency, defaultVatRate, defaultBreakdownSchemeKey and custom. A contact takes name, title, department, email, phone, mobile, linkedinUrl, preferredLocale, isPrimary and custom. ownerPublicId applies on a PATCH; a create is always owned by the key's own person, and a client linked to Transparent keeps its owner, the person who created it there. accountManagerPublicId also needs Assign account managers (accounts.assign), which exists only while Account management is on, and is refused when the person is not a member of the client's branch, or, on a client linked to Transparent (where the change is sent), when they are not paired with an active Transparent user. salesAgentPublicId needs only what the write itself needs, and is refused on the same three grounds (out of your scope, not in the branch, not paired on a linked client). A field name the API does not know is ignored, not refused — except by the Transparent result callback, which refuses it.\n\nA deal names its client, stage, owner and people by the ids the API returns, and is created with the same checks as the app's New deal form:\n\nPOST /api/v1/deals\nIdempotency-Key: crm-deal-48213\n\n{\n  \"name\": \"Ministry of Tourism — event production\",\n  \"clientPublicId\": \"01KZQ8M4T0P3JX6R2WQE5N9DAV\",\n  \"stageKey\": \"negotiation\",\n  \"amount\": 14490,\n  \"currency\": \"SAR\",\n  \"expectedCloseDate\": \"2026-12-15\",\n  \"ownerPublicId\": \"01KZQ8M4T0P3JX6R2WQE5N9DAX\",\n  \"primaryContactPublicId\": \"01KZR12RRRWC7W7VDEMP0KCKK9\",\n  \"contacts\": [{ \"publicId\": \"01KZR12RRRWC7W7VDEMP0KCKK9\", \"role\": \"Decision maker\" }],\n  \"source\": \"referral\",\n  \"origin\": { \"kind\": \"legacy\" },\n  \"tags\": [\"Migrated\"]\n}\nCopy\nA deal takes name, clientPublicId, stageKey (GET /api/v1/pipeline lists the keys), amount, currency, probability, expectedCloseDate (YYYY-MM-DD), source, nextStep, competitor, dealType (new, existing, renewal or upsell), ownerPublicId, primaryContactPublicId, contacts (a list of publicId and role), origin, custom and tags. The client must already exist and be visible to the key — create it first with POST /clients — and every contact must work at that client. currency defaults to the workspace's base currency. While Marketing ROI is on, a new deal needs origin: kind legacy, outbound or referral (with referrerName and reason), or request with an open request's id. For history brought over from another system, a deal created straight into a won or lost stage takes closedAt (when it closed; now if left out) and lostReason. A PATCH changes only the fields it sends: null or an empty string clears a field, and moving a deal into a won or lost stage sends deal.won or deal.lost, as the board does.\n\nA lead is identified by its email address. Sending an address that is already on the list updates that lead instead of adding a second one:\n\nPOST /api/v1/leads\nIdempotency-Key: crm-lead-90311\n\n{\n  \"email\": \"omar@prospect.example\",\n  \"firstName\": \"Omar\",\n  \"lastName\": \"Nasser\",\n  \"title\": \"Procurement Manager\",\n  \"companyName\": \"Prospect Holdings\",\n  \"country\": \"AE\",\n  \"phone\": \"+971 50 123 4567\",\n  \"status\": \"contacted\",\n  \"notes\": \"Brought over from our old CRM\",\n  \"tags\": [\"Migrated\"]\n}\nCopy\nA lead takes email, firstName, lastName, title, seniority, department, phone, linkedinUrl, companyName, website, industry, subIndustry, sizeBand, country, city, timezone, locale, status (new, contacted, replied, interested, qualified or lost), source, sourceDetail, consentBasis (legitimate_interest, consent or contract), notes, entityPublicId (the branch), custom and tags. POST answers 201 when it created the lead and 200 when the address was already there and it updated that lead; either way only the fields sent change. To check first, GET /api/v1/leads?email= finds one address. source defaults to api. An address on the do-not-contact list is kept with that status, an address on the workspace's own email domains is refused, and the lead endpoints answer 404 while Marketing is switched off.\n\nMoving from another CRM: create each account with POST /clients, with its first contact, then add the rest of its people, then its deals with POST /deals and your prospects with POST /leads. Send an Idempotency-Key on every write — the old system's record id makes a good one — so a run that stops halfway can simply be started again without making duplicates. To find a record by its old id later, keep that id in a custom field.\n\nEvery list and every lookup is filtered by the key's own record scope before anything is returned. Clients, contacts, feedback and account emails are the accounts the key's person (or team) owns or looks after as account manager; deals, quotations, contracts and activities follow the deal's owner; leads follow their owner, and a lead nobody owns is visible to every key with Marketing access. A client nobody owns opens by its id for every key, as it does in the app; lists leave it out unless the key's person manages it. A record outside the scope responds exactly as one that does not exist — that is deliberate, because a distinguishable 403 would confirm the id was real.\n\nWrites follow the same rules as the app's own forms. A field marked Required under Settings → Fields must be sent on a create and cannot be blanked by a PATCH. A Unique field refuses a value another record already holds. An email on one of the domains under Settings → Team → Your company's email domains is refused. Each comes back as invalid, with a code as the message — required:taxNumber, unique:taxNumber|Acme Trading (the other record's name appears only when this key can see it), internalDomain, unknownCurrency. A required or unique failure on the contact sent with a create is prefixed contact:.",
    "Filtering and syncing": "Query parameters, all optional, all combinable.\n\nParameter\tWorks on\tWhat it does\nq\t/clients\tMatches part of the company name.\nq\t/leads\tMatches part of the email address, the person's name or the company name.\nstatus\t/leads\tnew, contacted, replied, interested, qualified, lost, converted, bounced, unsubscribed or suppressed.\naccountStatus\t/clients\tactive, on_hold or archived.\nstatus\t/deals, /quotations, /contracts\tDeals: open, won, lost. Quotations: draft, pending, approved, rejected, sent, won, lost, expired. Contracts: active, renewed, ended, cancelled. Invoices: draft, issued, paid, void. On deals, quotations and invoices any other value is refused with invalid.\nstage\t/deals\tThe pipeline stage's stable key — never its name, which a workspace is free to rename.\nclient\t/quotations, /contacts, /contracts, /activities, /feedback, /account-touches\tA client id, to get only that account's records.\nsentiment\t/feedback\tpositive, neutral or negative.\nsource\t/feedback\ttransparent, email or survey (a rating clicked in an account email).\ncomplaints\t/feedback\ttrue for complaints only.\nstatus\t/account-touches\tscheduled, draft, held, sent, skipped, cancelled or failed. An email going out at that moment reads sending, which cannot be filtered on.\nsince\t/feedback, /account-touches\tAn ISO date-time: feedback received, or emails written, on or after it.\nemail\t/contacts, /leads\tExact email address, for finding one person.\nprimary\t/contacts\ttrue returns only each account's primary contact.\nkind\t/activities\tnote, task, call or meeting — or stage_change, quote_event and system for the rows the product writes itself. Any other value is refused with invalid.\ndeal\t/activities\tPublic id of a deal, for that deal's timeline.\ncontact\t/activities\tPublic id of a contact, for what was logged with that person.\nopenTasks\t/activities\ttrue returns only tasks that are not done.\nendsBefore\t/contracts\tContracts ending before this date — a renewals query.\nupdatedSince\t/clients, /deals, /leads, /quotations, /contacts, /activities\tAn ISO-8601 timestamp. Returns only records changed at or after it.\ntags, tagsMode\t/clients, /deals, /leads, /quotations, /contacts, /contracts, /activities\tTag names or ids, comma-separated: records carrying any of them. tagsMode=all asks for every one, tagsMode=none for none of them.\nlimit\tevery list\tRows per page. Default 50, maximum 200.\noffset\tevery list\tRows to skip.\nFor a sync loop, keep the timestamp of your last successful run and pass it as updatedSince, so a poll returns only what moved; without it you re-read the whole workspace on every cycle. Clients, deals, quotations and contacts come back newest change first. Invoices come back by issue date and activities by creation time, so on those two, page to the end rather than stopping at the first row you already have.\n\ncurl -H \"Authorization: Bearer $DE_KEY\" \\\n  \"https://dealengine.cloud/api/v1/deals?status=open&updatedSince=2026-08-01T00:00:00Z&limit=200\"\nCopy",
    "Paging": "Every list returns the same envelope. total is the full count matching your filters, not the size of this page.\n\n{\n  \"data\": [ /* … */ ],\n  \"total\": 137,\n  \"limit\": 50,\n  \"offset\": 0,\n  \"hasMore\": true\n}\nCopy\nKeep requesting while hasMore is true, adding limit to offset each time. An unparseable limit falls back to the default rather than erroring; the maximum is the part that is enforced. offset stops at 1,000,000 — a larger one is read as 1,000,000 and returns the same page again — so split a list longer than that with filters until each part is under a million rows.",
    "Conventions": "Ids are the public ids you see in the app's URLs. Internal database ids are never exposed.\nMoney is a string, always beside a currency code. JSON numbers are floating point, and a total that arrives as 1234.5599999 is worse than useless.\nDates are ISO-8601 in UTC, or null. Never a local-time string.\nA missing value is null, never omitted — so you can tell \"no value\" from \"a field I have not heard of\".\nAnything a workspace can rename travels as a stable key with the label beside it. Match on the key; show the label.\nCountries are ISO 3166-1 alpha-2 codes — \"SA\", not \"Saudi Arabia\". Send either on a write and a code comes back; text that is not a country is stored as you sent it. Match on the code, and translate it for display yourself.\nA contact's language travels as language — a code with no region, such as fr, zh or yue — and is null when they read the account's language. It can be any language the AI agents write in, not only the ten the app's screens use. On a create it is sent as contact.preferredLocale, and a code the product does not know is refused with invalid.\nSome values are tidied on a write, the way country is: an email address is stored in lower case, and anything recognisably LinkedIn — a full address with tracking on it, a regional subdomain, or just the profile name — becomes one https://www.linkedin.com address, a bare name going under /in/ for a contact and /company/ for a client. A placeholder such as n/a is stored as null, and a value that is not recognisably LinkedIn is kept as sent.\nA client filed under a parent account carries that parent as a `parent` object with its own id and name. It is null for the great majority of accounts, and null too when the parent sits in a branch this key cannot see. A client filed under a parent moves into the parent's branch, and its branch then changes only with the parent's: a write naming another branch for it is refused with `branch_inGroup`, and a parent in a branch the key's user is not a member of with `parent_branchNotYours`.\nA deleted client, deal or quotation leaves the API: it drops out of every list and answers 404 by id. A deleted client's contacts go with it, and so does the timeline of a deleted client or deal. Restored from Recently deleted, the record comes back with a fresh updatedAt, so an updatedSince poll picks it up again — but its contacts and timeline return with their old updatedAt, so re-read them for that account. Nothing announces a delete — no webhook, no tombstone — so a mirror that must drop deleted records has to compare ids now and then. A deleted contact is gone for good.\nA deal's amountBase is its amount in the workspace's base currency, converted at the rate in force when the amount was set — typed, imported or taken from a quotation — and it does not move when rates change later. \"0.00\" beside a non-zero amount means the deal's currency has no exchange rate set yet, never that the deal is worth nothing; it is converted as soon as the rate is set.\n{\n  \"object\": \"deal\",\n  \"id\": \"01KZR12RRRWC7W7VDEMP0KCKK8\",\n  \"name\": \"Ministry of Tourism — event production\",\n  \"status\": \"open\",\n  \"stage\": { \"key\": \"negotiation\", \"name\": \"Negotiation\", \"order\": 3 },\n  \"stageEnteredAt\": \"2026-08-02T11:20:05.118Z\",\n  \"amount\": \"14490.00\",\n  \"currency\": \"SAR\",\n  \"amountBase\": \"14490.00\",\n  \"probability\": 60,\n  \"expectedCloseDate\": null,\n  \"source\": \"referral\",\n  \"client\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAV\", \"companyName\": \"Ministry of Tourism\" },\n  \"contacts\": [{ \"id\": \"01KZR12RRRWC7W7VDEMP0KCKK9\", \"name\": \"Sara Al-Harbi\",\n                 \"email\": \"sara@customer.example\", \"role\": \"Decision maker\", \"primary\": true }],\n  \"primaryContact\": { \"id\": \"01KZR12RRRWC7W7VDEMP0KCKK9\", \"name\": \"Sara Al-Harbi\",\n                      \"email\": \"sara@customer.example\" },\n  \"owner\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAX\", \"name\": \"Layla Haddad\",\n             \"email\": \"layla@your-workspace.example\" },\n  \"branch\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAW\", \"name\": \"Riyadh\" },\n  \"wonAt\": null,\n  \"lostAt\": null,\n  \"lostReason\": null,\n  \"closedFromStage\": null,\n  \"nextActivityAt\": \"2026-08-15T07:00:00.000Z\",\n  \"createdAt\": \"2026-07-28T13:44:09.501Z\",\n  \"updatedAt\": \"2026-08-13T09:01:37.710Z\"\n}\nCopy\nA client, which is the resource most integrations start with and the one with the most fields:\n\n{\n  \"object\": \"client\",\n  \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAV\",\n  \"companyName\": \"PwC Middle East\",\n  \"accountStatus\": \"active\",\n  \"stage\": { \"key\": \"customer\", \"name\": \"Customer\" },\n  \"owner\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAX\", \"name\": \"Layla Haddad\",\n             \"email\": \"layla@your-workspace.example\" },\n  \"accountManager\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAY\", \"name\": \"Omar Saleh\",\n                      \"email\": \"omar@your-workspace.example\", \"source\": \"manual\" },\n  \"salesAgent\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAZ\", \"name\": \"Rania Aziz\",\n                  \"email\": \"rania@your-workspace.example\", \"source\": \"transparent\" },\n  \"industry\": \"Professional services\",\n  \"subIndustry\": \"Advisory\",\n  \"website\": null,\n  \"phone\": null,\n  \"email\": null,\n  \"taxNumber\": null,\n  \"address\": { \"line1\": null, \"line2\": null, \"city\": \"Dubai\",\n               \"state\": null, \"postcode\": null, \"country\": \"AE\" },\n  \"firmographics\": { \"sizeBand\": \"1000+\", \"revenueBand\": null, \"foundedYear\": null },\n  \"doNotContact\": false,\n  \"lastContactedAt\": null,\n  \"nextFollowUpAt\": null,\n  \"parent\": null,\n  \"defaults\": { \"currency\": \"AED\",\n                \"branch\": { \"id\": \"01KZQ8M4T0P3JX6R2WQE5N9DAW\", \"name\": \"Dubai\" } },\n  \"createdAt\": \"2026-08-20T10:12:40.118Z\",\n  \"updatedAt\": \"2026-09-02T07:41:12.004Z\"\n}\nCopy",
    "Errors": "Every failure is the same shape: a machine-readable code and a sentence for whoever is reading a log at 2am.\n\n{ \"error\": { \"code\": \"forbidden\", \"message\": \"This key is read-only.\" } }\nCopy\nCode\tStatus\tWhat it means\ninvalid\t400\tThe body or a parameter was wrong. The message says which.\nunauthorized\t401\tNo key, or a key that is not valid, revoked or expired.\nforbidden\t403\tThe key is real but not allowed: read-only on a write, its role lacks the permission, or — on /feedback and /account-touches — Account management is switched off in the workspace.\nnotFound\t404\tNo such record — or one outside this key's scope, which reads the same on purpose.\nrateLimited\t429\tToo many requests. Wait for Retry-After.\nserverError\t500\tOur fault. Retry with backoff; if it persists, tell us.\nA message never names a record the caller was not allowed to see, and every authentication failure returns the same words — telling somebody a key is \"revoked\" rather than \"invalid\" confirms it was real, which is the one fact a thief wants.",
    "Rate limits": "600 requests per 60 seconds, counted per key. Generous enough that no honest integration notices, and every response tells you where you stand.\n\nX-RateLimit-Limit: 600\nX-RateLimit-Remaining: 594\nX-RateLimit-Reset: 1786694460\nRetry-After: 37          # only on a 429\nCopy\nRequests that arrive without a valid key are counted per IP address instead, so an unauthenticated flood is not free just because it never presents a credential. The windows are fixed rather than sliding: a burst straddling a boundary can briefly reach twice the limit, which is the price of a limiter that costs less than the endpoint it protects.",
    "Idempotency": "Send an Idempotency-Key header on any write and it becomes safe to retry. A network timeout leaves you not knowing whether the client was created; retrying with the same key answers that instead of creating a second one.\n\ncurl -X POST https://dealengine.cloud/api/v1/clients \\\n  -H \"Authorization: Bearer $DE_KEY\" \\\n  -H \"Idempotency-Key: 8f2a1c4e-import-row-42\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"client\":{\"companyName\":\"Acme Trading\"}}'\nCopy\nA repeat of the same key and the same body returns the first response verbatim, with X-Idempotent-Replay: true so your logs can tell a replay from a create. A key is remembered for at least 24 hours; after that it can be forgotten at any time, and the same request then runs again.\nThe same key with a different body is refused with 400 — that is a bug on your side, and quietly returning the old answer would hide it. A repeat that arrives while the first attempt is still running gets the same 400; retry it a moment later.\nUp to 120 characters. Use something you can reproduce after a crash: a row number, a queue message id, a UUID you stored before sending.",
    "Webhooks": "The API lets you ask what happened. Webhooks tell you without being asked, which is the only way an integration reacts to a deal closing at 2am. Add an endpoint on the Webhooks screen; the signing secret is shown once, there.\n\nEvents\nquotation.sent\tA quotation was sent to a client — emailed from DealEngine, or marked as sent by hand.\nquotation.accepted\tA client accepted a quotation. The payload carries the accepted total, which can differ from the offered one when optional lines were declined.\nquotation.declined\tA client declined a quotation.\nquotation.expired\tA quotation passed its validity date without an answer.\ndeal.created\tA deal was created — in the app or through the API. Deals brought in by an import do not send one each.\nlead.created\tA lead was added by hand or through the API. Leads from an import, a capture form or prospecting do not send one each.\ndeal.won\tA deal was won — moved to a won stage, won by its client accepting the quotation, or won by a quotation marked won. The event an invoicing integration is usually waiting for.\ndeal.lost\tA deal was lost.\napproval.requested\tA quotation was submitted for approval, or an approval chain moved on to its next approver.\napproval.decided\tAn approver approved, rejected or asked for changes.\ninvoice.issued\tAn invoice was issued. It is immutable from this point, and this is the event an accounting integration usually waits for.\ninvoice.paid\tAn invoice was settled in full.\ninvoice.voided\tAn invoice was voided. The payload carries the reason.\npayment.received\tA payment was recorded against an invoice. Partial payments raise this each time, so read the invoice's standing rather than assuming it is settled.\nfeedback.received\tClient feedback reached the account programs — from Transparent, an email read as feedback, or a rating clicked in an account email. It is sent by the account programs' own run, so only while Account management is on and up to about five minutes after the feedback arrived; a clicked rating waits 30 minutes in case it is changed, and feedback loaded as history never sends one. Duplicates and feedback a person said is not feedback are not sent.\ntouch.sent\tAn account program's email went out from the account manager's mailbox. The payload carries its words.\ntags.changed\tTags were put on or taken off a record — from its page, a bulk change, an import or the API. The payload names the record, what was added, what was removed, and the tags it carries now.\nAn endpoint with no events ticked receives all of them. That is deliberate: the common case is \"tell me everything\", and a form where forgetting to tick a box silently delivers nothing is a trap.\n\nWhat arrives\nA POST with the event in a header and in the body. For quotation and deal events, data is the same resource shape the API returns for that record, so one integration can read GET /api/v1/quotations and receive quotation.accepted without learning two dialects. The four money events — payment.received included — all carry the invoice, with its payments, amountPaid and outstanding. The approval events carry an approval (status, reason, note, who asked, who approves, who decided) with the quotation inside it. feedback.received carries the feedback as GET /api/v1/feedback returns it, and touch.sent an account_email object as GET /api/v1/account-touches returns it. data is null when the record was deleted before the delivery was built.\n\nPOST /your-endpoint\nContent-Type: application/json\nUser-Agent: DealEngine-Webhooks/1\nX-DealEngine-Event: quotation.accepted\nX-DealEngine-Signature: t=1786694400,v1=6b1f…\n\n{\n  \"id\": \"evt_01KZXHHDRSJKBGB4M67F7M3CSE\",\n  \"event\": \"quotation.accepted\",\n  \"occurredAt\": \"2026-08-13T09:01:37.710Z\",\n  \"workspace\": { \"id\": \"01KZR0…\", \"name\": \"Future Group KSA\" },\n  \"data\": { \"object\": \"quotation\", \"id\": \"01KZ…\", \"status\": \"won\", … }\n}\nCopy\nVerifying the signature\nThe header carries a unix timestamp and an HMAC-SHA256 taken over the timestamp, a dot, and the raw request body, keyed with your endpoint's secret. Reject anything more than 300 seconds out of date.\n\nHeader format\nX-DealEngine-Signature: t=<unix seconds>,v1=<hex hmac>\nimport { createHmac, timingSafeEqual } from \"node:crypto\";\n\n// body must be the RAW request text, before any JSON parsing —\n// re-serialising changes the bytes and the signature will never match.\nfunction verify(secret, body, header) {\n  const parts = Object.fromEntries(\n    header.split(\",\").map((p) => p.split(\"=\", 2))\n  );\n  const t = Number(parts.t);\n  if (!Number.isFinite(t)) return false;\n  if (Math.abs(Date.now() / 1000 - t) > 300) return false;\n\n  const expected = createHmac(\"sha256\", secret)\n    .update(`${t}.${body}`, \"utf8\")\n    .digest(\"hex\");\n  if (expected.length !== parts.v1.length) return false;\n  return timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));\n}\nCopy\nTwo ways to get this wrong make the signature worthless: comparing with == instead of a constant-time compare, and skipping the clock check. The timestamp is inside what gets signed precisely so a captured request cannot be replayed forever.\n\nDelivery and retries\nUp to 7 attempts, waiting 1, 5, 30, 120, 360, 1440 minutes between them — roughly a day and a half in total, which is long enough to survive a receiver being down over a weekend.\n\nRetried: any 5xx, 408, 429, a timeout, or a connection that never answered.\nNot retried: any 3xx, or any other 4xx. That means the receiver understood and refused, or pointed somewhere else, and repeating it is noise until somebody fixes their end.\nDelivery is at-least-once. Every payload carries a stable id that does not change across retries — store it and ignore a repeat. A duplicate you can drop is a much better failure than a deal nobody heard about.\nAfter 20 consecutive failures an endpoint is switched off, with the reason kept on the row. Deliveries already waiting go out once you fix your end and press Resume, but events that happen while it is switched off are not queued for it at all — after a Resume, catch up through the API with updatedSince.\nYou have 8 seconds to answer. Return 2xx as soon as you have the payload and do the work afterwards; a slow handler will be retried while it is still running.\nHTTPS only, and no credentials in the URL. This is a signed document about a customer's contract; plain HTTP would put it on the wire in clear.\nThe host must resolve to a public address. Private, loopback, link-local and cloud-metadata addresses are refused — on every attempt, not just when you save the endpoint — so a hook cannot be aimed at our internal network. A tunnel (ngrok and friends) is the way to receive on a laptop.\nRedirects are not followed. A 3xx counts as a failed delivery, so publish the final URL rather than a shortener or a rewrite rule.\nTesting\nThe Test button on the Webhooks screen sends a signed ping immediately. A 2xx answer shows its status code; any other status, a timeout or no answer shows as a failure. Use it before you trust an endpoint — finding out tomorrow that a URL had a typo is the failure this exists to prevent.\n\n{ \"id\": \"evt_…\", \"event\": \"ping\", \"occurredAt\": \"…\",\n  \"data\": { \"message\": \"This is a test from DealEngine.\" } }\nCopy"
  },
  "exampleResponses": {
    "deal": {
      "object": "deal",
      "id": "01KZR12RRRWC7W7VDEMP0KCKK8",
      "name": "Ministry of Tourism — event production",
      "status": "open",
      "stage": {
        "key": "negotiation",
        "name": "Negotiation",
        "order": 3
      },
      "stageEnteredAt": "2026-08-02T11:20:05.118Z",
      "amount": "14490.00",
      "currency": "SAR",
      "amountBase": "14490.00",
      "probability": 60,
      "expectedCloseDate": null,
      "source": "referral",
      "client": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAV",
        "companyName": "Ministry of Tourism"
      },
      "contacts": [
        {
          "id": "01KZR12RRRWC7W7VDEMP0KCKK9",
          "name": "Sara Al-Harbi",
          "email": "sara@customer.example",
          "role": "Decision maker",
          "primary": true
        }
      ],
      "primaryContact": {
        "id": "01KZR12RRRWC7W7VDEMP0KCKK9",
        "name": "Sara Al-Harbi",
        "email": "sara@customer.example"
      },
      "owner": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAX",
        "name": "Layla Haddad",
        "email": "layla@your-workspace.example"
      },
      "branch": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAW",
        "name": "Riyadh"
      },
      "wonAt": null,
      "lostAt": null,
      "lostReason": null,
      "closedFromStage": null,
      "nextActivityAt": "2026-08-15T07:00:00.000Z",
      "createdAt": "2026-07-28T13:44:09.501Z",
      "updatedAt": "2026-08-13T09:01:37.710Z"
    },
    "client": {
      "object": "client",
      "id": "01KZQ8M4T0P3JX6R2WQE5N9DAV",
      "companyName": "PwC Middle East",
      "accountStatus": "active",
      "stage": {
        "key": "customer",
        "name": "Customer"
      },
      "owner": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAX",
        "name": "Layla Haddad",
        "email": "layla@your-workspace.example"
      },
      "accountManager": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAY",
        "name": "Omar Saleh",
        "email": "omar@your-workspace.example",
        "source": "manual"
      },
      "salesAgent": {
        "id": "01KZQ8M4T0P3JX6R2WQE5N9DAZ",
        "name": "Rania Aziz",
        "email": "rania@your-workspace.example",
        "source": "transparent"
      },
      "industry": "Professional services",
      "subIndustry": "Advisory",
      "website": null,
      "phone": null,
      "email": null,
      "taxNumber": null,
      "address": {
        "line1": null,
        "line2": null,
        "city": "Dubai",
        "state": null,
        "postcode": null,
        "country": "AE"
      },
      "firmographics": {
        "sizeBand": "1000+",
        "revenueBand": null,
        "foundedYear": null
      },
      "doNotContact": false,
      "lastContactedAt": null,
      "nextFollowUpAt": null,
      "parent": null,
      "defaults": {
        "currency": "AED",
        "branch": {
          "id": "01KZQ8M4T0P3JX6R2WQE5N9DAW",
          "name": "Dubai"
        }
      },
      "createdAt": "2026-08-20T10:12:40.118Z",
      "updatedAt": "2026-09-02T07:41:12.004Z"
    }
  },
  "meta": {
    "rateLimit": "600 requests / 60 seconds / key",
    "pageDefault": 50,
    "pageMax": 200,
    "webhookRetries": 7,
    "signatureToleranceSeconds": 300
  }
};
