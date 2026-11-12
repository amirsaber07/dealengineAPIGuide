/* DealEngine Developer Portal — dependency-free, client-side documentation viewer.
 * Source of truth: source/DealEngine-Developer-Guide.txt (not a live API client).
 */
(() => {
  'use strict';
  const docs = window.DEALENGINE_DOCS;
  if (!docs || docs.endpointCount !== 28) throw new Error('DealEngine documentation data missing or incomplete.');

  const $ = (sel, parent=document) => parent.querySelector(sel);
  const escapeHTML = (input) => String(input ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatJSON = obj => JSON.stringify(obj, null, 2);
  const base = docs.baseUrl;
  const exampleId='01KZR12RRRWC7W7VDEMP0KCKK8';
  let activeId = 'overview';
  let activeTab = 'curl';
  let selectedResult = 0;
  let filteredResults = [];
  let toastTimeout;
  let copyCounter = 0;
  const copyRegistry = new Map();
  const endpointLookup = new Map(docs.endpoints.map(e => [e.id,e]));

  const guidePages = [
    {id:'overview',title:'Overview',category:'Start here',icon:'✦',description:'Introduction to the DealEngine Developer API'},
    {id:'quickstart',title:'Getting started',category:'Start here',icon:'➜',description:'Make your first request with GET /me'},
    {id:'authentication',title:'Authentication',category:'Start here',icon:'♢',description:'Bearer tokens, record scope and read-only keys'},
    {id:'api-directory',title:'Endpoint directory',category:'API reference',icon:'☷',description:'All 28 documented API endpoints'},
    {id:'writes',title:'Request bodies & writes',category:'Guides',icon:'✎',description:'Clients, contacts, deals and leads input fields'},
    {id:'migration',title:'CRM migration',category:'Guides',icon:'⇄',description:'Idempotent import order and reconciliation rules'},
    {id:'filtering',title:'Filtering & syncing',category:'Guides',icon:'⌕',description:'All supported query parameters and updatedSince'},
    {id:'pagination',title:'Pagination',category:'Guides',icon:'☰',description:'limit, offset, hasMore and page envelope'},
    {id:'conventions',title:'Data conventions',category:'Guides',icon:'◈',description:'Money, IDs, dates, custom fields, deletes and more'},
    {id:'errors',title:'Errors & status codes',category:'Guides',icon:'!',description:'Error envelope, permissions and HTTP status codes'},
    {id:'rate-limits',title:'Rate limits',category:'Guides',icon:'◷',description:'600 requests per 60 seconds and Retry-After'},
    {id:'idempotency',title:'Idempotency',category:'Guides',icon:'↻',description:'Safe retries on write operations'},
    {id:'webhooks',title:'Webhooks overview',category:'Webhooks',icon:'⌁',description:'Set up webhook endpoints and payloads'},
    {id:'webhook-events',title:'Webhook events',category:'Webhooks',icon:'◎',description:'17 officially documented event types'},
    {id:'webhook-signature',title:'Signature verification',category:'Webhooks',icon:'◇',description:'HMAC SHA-256 and the five-minute time window'},
    {id:'webhook-delivery',title:'Delivery & retries',category:'Webhooks',icon:'↗',description:'Attempts, timeouts, pause, replay and testing'},
    {id:'full-guide',title:'Original developer guide',category:'Reference',icon:'≡',description:'Verbatim supplied guide text'}
  ];
  const pageLookup = new Map(guidePages.map(page => [page.id,page]));
  const navGroups = [...new Set(docs.endpoints.map(e=>e.group))];
  const icons = {
    check:'<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
    lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    link:'<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19.5"/></svg>',
    arrow:'<svg viewBox="0 0 24 24"><path d="m5 12 14 0m-6-6 6 6-6 6"/></svg>',
    bolt:'<svg viewBox="0 0 24 24"><path d="m13 2-9 12h7l-1 8 10-12h-7V2Z"/></svg>',
    chevron:'<svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg>'
  };

  function urlFor(route) { return `?doc=${encodeURIComponent(route)}`; }
  function routeLink(route,label,className='', extra='') { return `<a class="${className}" href="${urlFor(route)}" data-route="${escapeHTML(route)}" ${extra}>${label}</a>`; }
  function breadcrumb(level,title) { return `<div class="crumbs">${routeLink('overview','Documentation')}<span class="crumb-chevron">/</span>${escapeHTML(level)}<span class="crumb-chevron">/</span><span class="crumbs-current">${escapeHTML(title)}</span></div>`; }
  function kicker(text) { return `<div class="section-kicker">${escapeHTML(text)}</div>`; }
  function pill(text,className='') { return `<span class="chip ${className}">${text}</span>`; }
  function methodBadge(method,mini=false) { return `<span class="${mini?'method-mini':'method-badge'} ${method.toLowerCase()}">${escapeHTML(method)}</span>`; }
  function callout(title,description,type='info') { return `<aside class="callout ${type}"><span class="callout-icon">${type==='warning'?'!':type==='success'?'✓':'i'}</span><div class="callout-content"><strong>${title}</strong><p>${description}</p></div></aside>`; }
  function cardLink(id,title,desc,icon='↗') { return routeLink(id, `<div class="resource-card-icon">${escapeHTML(icon)}</div><span class="card-arrow">↗</span><strong>${escapeHTML(title)}</strong><p>${escapeHTML(desc)}</p>`, 'resource-card'); }
  function table(headers,rows) { return `<div class="api-table-wrap"><table class="api-table"><thead><tr>${headers.map(v=>`<th scope="col">${escapeHTML(v)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; }
  function codeBlock(title,code) {
    const id='code-'+(++copyCounter);copyRegistry.set(id,code);
    return `<div class="code-block"><div class="code-toolbar"><span class="label-left"><span class="code-dots"><span></span><span></span><span></span></span>${escapeHTML(title)}</span><button type="button" data-copy-id="${id}">Copy code</button></div><pre><code>${escapeHTML(code)}</code></pre></div>`;
  }
  function copyButton(value,label='Copy') { const id='copy-'+(++copyCounter);copyRegistry.set(id,value); return `<button type="button" class="copy-inline" data-copy-id="${id}">${escapeHTML(label)}</button>`; }
  function sourceDetails(chapter) {
    const txt=docs.chapters[chapter];
    if (!txt) return '';
    return `<details class="source-detail"><summary>Show original guide wording: ${escapeHTML(chapter)}</summary><div class="guide-source">${escapeHTML(txt)}</div></details>`;
  }
  function pageIntro(category,title,description) {return `${breadcrumb(category,title)}${kicker(category)}<h1>${escapeHTML(title)}</h1><p class="lead">${escapeHTML(description)}</p>`;}
  function simpleList(items) { return `<ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul>`; }
  function step(number,title,body){return `<div class="step"><span class="step-number">${number}</span><div><strong>${title}</strong><p>${body}</p></div></div>`;}

  function renderSidebar() {
    const start=guidePages.filter(x=>x.category==='Start here');
    const guides=guidePages.filter(x=>x.category==='Guides');
    const webhooks=guidePages.filter(x=>x.category==='Webhooks');
    const refs=guidePages.filter(x=>x.category==='Reference');
    const groupOpen = Object.create(null);
    const nav = (p)=>routeLink(p.id,`<span class="nav-icon">${escapeHTML(p.icon)}</span><span>${escapeHTML(p.title)}</span>`,'nav-item'+(activeId===p.id?' active':''));
    const route = e=>routeLink(e.id, `${methodBadge(e.method,true)}<span>${escapeHTML(e.title)}</span>`, 'nav-item endpoint-nav'+(activeId===e.id?' active':''));
    const sidebar = [
      '<div class="sidebar-heading">Getting started</div>', ...start.map(nav),
      '<div class="sidebar-divider"></div>',
      `<div class="sidebar-heading">API Reference <span class="nav-count">${docs.endpointCount}</span></div>`,
      nav(pageLookup.get('api-directory')),
      ...navGroups.map(g=> {
        const eps=docs.endpoints.filter(e=>e.group===g);
        const opened=eps.some(e=>e.id===activeId);
        groupOpen[g]=opened;
        return `<div class="nav-group ${opened?'':'collapsed'}" data-group="${escapeHTML(g)}"><button class="nav-group-label" type="button" data-toggle-group="${escapeHTML(g)}" aria-expanded="${opened?'true':'false'}">${escapeHTML(g)} <span style="display:flex;align-items:center;gap:8px;color:var(--muted)">${eps.length} ${icons.chevron}</span></button><div class="nav-group-links">${eps.map(route).join('')}</div></div>`;
      }),
      '<div class="sidebar-divider"></div><div class="sidebar-heading">Integration guides</div>',...guides.map(nav),
      '<div class="sidebar-divider"></div><div class="sidebar-heading">Events & Webhooks</div>',...webhooks.map(nav),
      '<div class="sidebar-divider"></div><div class="sidebar-heading">Source material</div>',...refs.map(nav)
    ];
    $('#sidebarNav').innerHTML=sidebar.join('');
  }

  function overview() {
    return `${breadcrumb('Start here','Overview')}
      <div class="hero-surface"><div class="top-stars">✦ &nbsp;REST API · VERSION 1</div>
        <div class="eyebrow">BUILD WITH DEALENGINE</div>
        <h1 class="hero-title">One API.<br><span>Every deal in motion.</span></h1>
        <p class="lead">Connect your CRM workflows to DealEngine. Query the records you can access, safely create and update supported resources, and subscribe to business events as they happen.</p>
        <div class="button-row">${routeLink('quickstart',`Get started ${icons.arrow}`,'btn primary')}${routeLink('api-directory','Browse all endpoints','btn secondary')}</div>
      </div>
      <div class="stat-grid"><div class="stat"><strong class="stat-accent">28</strong><span>Documented endpoints</span></div><div class="stat"><strong>600</strong><span>Requests / 60 seconds</span></div><div class="stat"><strong>17</strong><span>Webhook event types</span></div></div>
      <div class="section-kicker">YOUR ENTRY POINT</div><h2 id="base-url">API base URL</h2><p>All documented resources use HTTPS and JSON under this versioned root. Breaking changes receive a new API version.</p>
      <div class="overview-actions"><code>${escapeHTML(base)}</code>${copyButton(base,'Copy base URL')}${pill('X-API-Version response header')}</div>
      ${callout('Start with GET /me','This identifies the workspace, acting user, permissions, record scopes and rate limit associated with your key. It should be your first request.')}
      <h2 id="resource-map">Explore the API</h2><p>Browse resources just like a conventional developer portal. Each operation is documented separately with its method, path, permissions, filters and sample request.</p>
      <div class="card-grid">
        ${cardLink('ep-list-clients','Clients','Read, create and update client accounts.','▣')}
        ${cardLink('ep-list-deals','Deals & pipeline','Work with deals, stages, owners and people.','◇')}
        ${cardLink('ep-list-leads','Leads','Read and manage marketing leads.','◎')}
        ${cardLink('ep-list-reports','Saved reports','List saved reports and retrieve their rows.','▤')}
        ${cardLink('webhooks','Webhooks','Receive event notifications with signed payloads.','⌁')}
        ${cardLink('filtering','Filtering & syncing','Query incrementally and page through results.','↻')}
      </div>
      <h2 id="coverage">What the API does not expose</h2>
      ${callout('No invoice or payment REST endpoints','Invoices and payments are handled in Transparent. Their former endpoints return <code>410 Gone</code>. Invoice/payment webhook events are still listed in the guide.','warning')}
      <p>Campaigns, the reply inbox, and Account management judgments (Growth ideas, health, insights, program settings and account reviews) do not have documented APIs yet. A missing path is not an endpoint to guess.</p>
      <div class="divider"></div>
      <p class="muted-note">This reference is derived exclusively from the updated DealEngine Developer Guide supplied for this project. Examples are illustrative; fields or request bodies not defined in the guide are not invented.</p>`;
  }

  function quickstart() {
    return `${pageIntro('Start here','Getting started','The DealEngine API is a versioned, HTTPS-only REST interface that sends and receives JSON. Make a successful first call in three steps.')}
      <h2 id="first-request">Your first API request</h2>
      <div class="steps">${step(1,'Create an API key','Open the API keys screen in your workspace. The full key is displayed once when created. Prefer a read-only key for reports.')}${step(2,'Send a bearer token','Include <code>Authorization: Bearer &lt;your-key&gt;</code> on each request. There is no token-refresh or session endpoint.')}${step(3,'Call GET /me','Check the workspace, acting person, permissions, scopes and rate limit before connecting business workflows.')}</div>
      ${codeBlock('GET · FIRST REQUEST',`curl -H "Authorization: Bearer $DE_KEY" \\\n  ${base}/me`)}
      <h2 id="version-header">Track the API contract</h2><p>DealEngine returns <code>X-API-Version</code> on every response. The value indicates the date of the fixed contract; log it alongside API errors and integration metrics.</p>
      ${callout('Where to go next',`${routeLink('authentication','Understand API key access')} before sending any writes, or ${routeLink('ep-list-deals','list your deals')} using the key's own record scope.`)}
      ${sourceDetails('Getting started')}`;
  }

  function authentication() {
    return `${pageIntro('Start here','Authentication','Every request uses an API key presented as a bearer token. The key represents a person, not an independently privileged service account.')}
      ${codeBlock('HTTP REQUEST HEADER','Authorization: Bearer de_live_a1b2c3d4_…')}
      <h2 id="permission-scope">Permissions & record scope</h2>
      ${simpleList([
      'The key inherits the person’s <strong>role, permissions, and record visibility</strong>; changes to the person’s role affect the key immediately.',
      'A <strong>read-only key</strong> cannot perform writes. Those requests are refused before operation-specific permission checks.',
      'The key is shown only once. DealEngine stores a hash, so a lost credential must be replaced.',
      'A key can expire; invalid, expired, or revoked keys fail authentication. So do keys for removed or deactivated people and inactive workspaces.',
      'Credentials begin with <code>de_live_</code> plus the eight characters shown in the Key column.'
      ])}
      <h2 id="identity">Inspect effective access</h2>${codeBlock('cURL',`curl -H "Authorization: Bearer $DE_KEY" ${base}/me`)}
      ${callout('Keep secrets off the client','Do not embed bearer keys in front-end JavaScript or commit them to GitHub. Run authenticated integrations on a trusted server and load the key from protected environment configuration.','warning')}
      <h2 id="notfound-scope">404 does not always mean missing</h2><p>Record lookups return <code>404 notFound</code> both for missing IDs and for records outside the key’s visible scope. This prevents exposing whether an inaccessible record exists.</p>
      ${sourceDetails('Authentication')}`;
  }

  function directory() {
    return `${pageIntro('API reference','Endpoint directory','All 28 operations documented by the updated DealEngine Developer Guide. Select any operation to see parameters, permissions, request examples and relevant constraints.')}
       ${callout('Only documented paths are supported','The API has no REST paths for campaigns, reply inbox or Account management judgments. Invoice/payment REST endpoints have been retired and return <code>410 Gone</code>.','warning')}
       ${navGroups.map(group=>`<h2 id="grp-${group.replace(/[^a-zA-Z]/g,'-').toLowerCase()}">${escapeHTML(group)}</h2><div class="endpoint-directory">${docs.endpoints.filter(e=>e.group===group).map(e=>routeLink(e.id,`${methodBadge(e.method,true)}<span class="title">${escapeHTML(e.title)}</span><span class="path">${escapeHTML(e.path.replace('/api/v1',''))}</span>`,'directory-row')).join('')}</div>`).join('')}`;
  }

  function writes() {
    return `${pageIntro('Guides','Request bodies & writes','Write requests use input field names, not the nested shapes returned by GET. DealEngine applies the same validation rules as its application forms.')}
      <h2 id="client-create">Clients: create with first contact</h2><p>Client creates wrap the record in a <code>client</code> object; you can optionally include a <code>contact</code> object in the same request.</p>
      ${codeBlock('POST /api/v1/clients · BODY',formatJSON(docs.endpoints.find(e=>e.slug==='create-client').exampleBody))}
      <p>Client input fields:</p><div class="verb-tags">${docs.endpoints.find(e=>e.slug==='update-client').bodyFields.map(f=>`<span class="field-chip">${escapeHTML(f)}</span>`).join('')}</div>
      <p>Contact input fields: <code>name</code>, <code>title</code>, <code>department</code>, <code>email</code>, <code>phone</code>, <code>mobile</code>, <code>linkedinUrl</code>, <code>preferredLocale</code>, <code>isPrimary</code> and <code>custom</code>.</p>
      ${callout('Ownership and branch restrictions','A client create is owned by the key’s person; <code>ownerPublicId</code> applies to PATCH. Account manager assignments require <code>accounts.assign</code>, Account management enabled, and branch/pairing checks. A Transparent-linked client retains its Transparent creator as owner.')}
      <h2 id="deal-create">Deals: create and update</h2><p>Create a deal for an existing, visible client and use the pipeline stage’s <strong>stable key</strong>. Related contacts must belong to that client.</p>
      ${codeBlock('POST /api/v1/deals · BODY',formatJSON(docs.endpoints.find(e=>e.slug==='create-deal').exampleBody))}
      <p>Deal input fields:</p><div class="verb-tags">${docs.endpoints.find(e=>e.slug==='create-deal').bodyFields.map(f=>`<span class="field-chip">${escapeHTML(f)}</span>`).join('')}</div>
      ${callout('Stage & origin rules','While Marketing ROI is on, new deals require an <code>origin</code> kind (<code>legacy</code>, <code>outbound</code>, <code>referral</code>, or <code>request</code> with an open request ID). Historical deals can be created directly in a won/lost stage; use <code>closedAt</code> and <code>lostReason</code> where appropriate.','warning')}
      <h2 id="lead-upsert">Leads: email-based upsert</h2><p>Sending an existing email to <code>POST /leads</code> updates that lead instead of creating a duplicate; response is <code>201</code> for create and <code>200</code> for update. The <code>source</code> defaults to <code>api</code>.</p>
      ${codeBlock('POST /api/v1/leads · BODY',formatJSON(docs.endpoints.find(e=>e.slug==='upsert-lead').exampleBody))}
      <p>Lead input fields:</p><div class="verb-tags">${docs.endpoints.find(e=>e.slug==='upsert-lead').bodyFields.map(f=>`<span class="field-chip">${escapeHTML(f)}</span>`).join('')}</div>
      ${callout('Fields settings still apply','A field configured as Required must be present at create and cannot be cleared by PATCH. Unique values, internal company email domains, and unknown currencies can trigger <code>invalid</code> with machine-readable field details. Unknown general input fields are ignored; the Transparent result callback is stricter.')}
      ${sourceDetails('Endpoints')}`;
  }

  function migration() {
    return `${pageIntro('Guides','CRM migration','Import client accounts, related contacts, deals, and prospects safely from another CRM. Preserve external IDs and make every write retryable.')}
      <h2 id="sequence">Recommended import order</h2>
      <div class="steps">${step(1,'Create client accounts',`Use ${routeLink('ep-create-client','POST /clients')} and optionally include the first contact.`)}${step(2,'Import the remaining people','The guide describes importing remaining contacts; it does not list a standalone contact-create endpoint in the current API table.')}${step(3,'Create related deals',`Use ${routeLink('ep-create-deal','POST /deals')} with a visible <code>clientPublicId</code>. Each contact must belong to that client.`)}${step(4,'Upsert prospects',`Use ${routeLink('ep-upsert-lead','POST /leads')}. A repeated email updates the existing lead.`)}${step(5,'Resume safely','Pass a stable <code>Idempotency-Key</code> for each write, ideally derived from the legacy row ID. Save external IDs in your own custom fields.')}</div>
      <h2 id="deletes">Deletion and reconciliation</h2><p>Clients, deals and quotations disappear from lists after deletion and return <code>404</code> by ID. There are <strong>no delete webhooks or tombstones</strong>, so a complete mirror must periodically compare IDs. Restored records receive a new <code>updatedAt</code>, but related contacts and timeline records retain previous timestamps.</p>
      ${callout('Missing contact-create route','The guide recommends adding the remaining people during migration, but does not document a standalone POST contact API. Do not assume one exists: plan this step via supported application workflows or request clarification from DealEngine.','warning')}
      ${sourceDetails('Endpoints')}`;
  }

  function filtering() {
    return `${pageIntro('Guides','Filtering & syncing','Query parameters are optional and combinable where documented. Use incremental syncs to avoid re-reading your entire visible workspace.')}
       <h2 id="available-filters">Supported query parameters</h2>
       ${table(['Parameter','Works on','Description'],docs.filters.map(f=>[`<code>${escapeHTML(f.name)}</code>`,`<code>${escapeHTML(f.worksOn)}</code>`,escapeHTML(f.description)]))}
       <h2 id="sync-loop">Incremental synchronization</h2><p>Keep the timestamp from your last successful run, pass it as <code>updatedSince</code> on supported lists, and continue paging until <code>hasMore</code> is false. The API applies access scope before returning results.</p>
       ${codeBlock('cURL · FILTERED DEALS',`curl -H "Authorization: Bearer $DE_KEY" \\\n  "${base}/deals?status=open&updatedSince=2026-08-01T00:00:00Z&limit=200"`)}
       ${callout('Stability matters','Use <code>stage</code> with a pipeline stage <strong>key</strong>, not the display name. Stage names can change per workspace. The guide still mentions legacy invoice filters, but no current invoice REST endpoint exists.','warning')}
       ${sourceDetails('Filtering and syncing')}`;
  }

  function pagination() {
    const paging = `{
  "data": [ /* … */ ],
  "total": 137,
  "limit": 50,
  "offset": 0,
  "hasMore": true
}`;
    return `${pageIntro('Guides','Pagination','Every documented list returns a consistent envelope. Continue requesting pages until hasMore is false.')}
      <h2 id="envelope">The list response envelope</h2>
      ${codeBlock('DOCUMENTED JSONC EXAMPLE',paging)}
      ${table(['Field','Meaning'],[
        ['<code>data</code>','Array of records matching the key’s access scope and filters.'],
        ['<code>total</code>','Full number of matching records, not just the current page.'],
        ['<code>limit</code>','Rows per page: default 50, maximum 200.'],
        ['<code>offset</code>','Rows to skip. Starts at 0.'],
        ['<code>hasMore</code>','Boolean indicating another page is available.']
      ])}
      <h2 id="paging-example">Fetching all deals</h2>${codeBlock('cURL · PAGE ONE',`curl -H "Authorization: Bearer $DE_KEY" \\\n  "${base}/deals?limit=200&offset=0"`)}
      <p>For the next request use <code>offset=200</code>, then <code>offset=400</code>, and continue while <code>hasMore</code> is true.</p>
      ${callout('Important offset cap','An offset greater than 1,000,000 is interpreted as 1,000,000, which can repeat the same page. Partition extremely large syncs with filters. An unparseable limit uses the default; the 200 maximum is enforced.','warning')}
      ${sourceDetails('Paging')}`;
  }

  function conventions() {
    return `${pageIntro('Guides','Data conventions','Consistent identifiers, monetary values and timestamps make integrations portable across workspaces.')}
      <h2 id="field-rules">Response conventions</h2>
      ${table(['Topic','Documented contract'],[
        ['IDs','Public IDs from application URLs. Internal database IDs are never returned.'],
        ['Money','Returned as strings next to a currency code, never floating-point response numbers.'],
        ['Timestamps','ISO-8601 UTC or <code>null</code>, not local-time strings.'],
        ['Absent values','Properties are present with <code>null</code> rather than omitted.'],
        ['Stable keys','A renameable value includes a stable key and a label; match using the key.'],
        ['Countries','ISO 3166-1 alpha-2 codes such as <code>SA</code> and <code>AE</code>.'],
        ['Contact language','A short <code>language</code> code (for example <code>fr</code>) or <code>null</code>; create uses <code>contact.preferredLocale</code>.']
      ])}
      <h2 id="normalization">Normalization on writes</h2><p>Emails are stored in lowercase. Recognizable LinkedIn links and profile names are normalized to LinkedIn URLs; placeholders such as <code>n/a</code> become null. Country input can be normalized to a code.</p>
      <h2 id="parent-branches">Parent accounts & branches</h2><p>A child client includes a <code>parent</code> object or null, and inherits the parent’s branch. Attempting to set a different branch for a child is refused with <code>branch_inGroup</code>; a parent outside the caller’s branch can produce <code>parent_branchNotYours</code>.</p>
      <h2 id="money-example">Deal amount and exchange rates</h2><p><code>amountBase</code> uses the workspace’s base currency with the rate in force when the amount was set. An <code>amountBase</code> value of <code>"0.00"</code> alongside a nonzero amount may mean no exchange rate is configured yet.</p>
      ${codeBlock('DOCUMENTED DEAL RESPONSE',formatJSON(docs.exampleResponses.deal))}
      <h2 id="deletion">Deletion semantics</h2><p>Deleted clients, deals and quotations drop out of the API and return <code>404</code> by ID. There are no delete tombstones or webhooks; mirror systems should periodically compare all IDs. Restored records regain fresh timestamps, while their old contacts and timeline need special re-reading.</p>
      ${sourceDetails('Conventions')}`;
  }

  function errors() {
    return `${pageIntro('Guides','Errors & status codes','Every failure uses a machine-readable error code and a readable message. Handle errors without revealing whether inaccessible records exist.')}
      ${codeBlock('ERROR RESPONSE',formatJSON({error:{code:'forbidden',message:'This key is read-only.'}}))}
      <h2 id="error-codes">Documented error codes</h2>
      ${table(['Code','HTTP','Meaning'],docs.errors.map(e=>[`<code>${escapeHTML(e.code)}</code>`,`<strong>${e.status}</strong>`,escapeHTML(e.description)]))}
      <h2 id="validation">Field validation</h2><p>Field settings can cause errors like <code>required:taxNumber</code>, <code>unique:taxNumber</code>, <code>internalDomain</code> and <code>unknownCurrency</code>. Related contact create errors receive a <code>contact:</code> prefix.</p>
      ${callout('404 is intentionally ambiguous','An ID outside the caller’s record scope returns the same <code>404</code> as a nonexistent record. Do not treat every 404 as evidence the record has been deleted.','warning')}
      ${sourceDetails('Errors')}`;
  }

  function rateLimits() {
    return `${pageIntro('Guides','Rate limits','The current API contract permits 600 requests per 60 seconds per key. Each response communicates the remaining allowance.')}
      <div class="stat-grid"><div class="stat"><strong class="stat-accent">600</strong><span>Requests per window</span></div><div class="stat"><strong>60s</strong><span>Fixed window</span></div><div class="stat"><strong>429</strong><span>Too many requests</span></div></div>
      ${codeBlock('RATE-LIMIT RESPONSE HEADERS',`X-RateLimit-Limit: 600
X-RateLimit-Remaining: 594
X-RateLimit-Reset: 1786694460
Retry-After: 37          # only on a 429`)}
      <h2 id="backoff">Handling 429 responses</h2><p>Wait for the number of seconds in <code>Retry-After</code> before retrying. Unauthorized requests are also rate-limited per IP. Windows are fixed, so traffic at a boundary may briefly exceed the usual per-minute rate.</p>
      ${sourceDetails('Rate limits')}`;
  }

  function idempotency() {
    return `${pageIntro('Guides','Idempotency','Attach an Idempotency-Key to writes so a network failure can be retried without accidentally creating duplicate records.')}
      ${codeBlock('CURL · IDEMPOTENT CLIENT CREATE',`curl -X POST ${base}/clients \\\n  -H "Authorization: Bearer $DE_KEY" \\\n  -H "Idempotency-Key: 8f2a1c4e-import-row-42" \\\n  -H "Content-Type: application/json" \\\n  -d '{"client":{"companyName":"Acme Trading"}}'`)}
      <h2 id="rules">Replay semantics</h2>
      ${simpleList([
        'The same key and identical body return the first response verbatim, with <code>X-Idempotent-Replay: true</code>.',
        'A key is retained for <strong>at least 24 hours</strong>; after that it may be forgotten and the write can run again.',
        'Reusing a key with a different request body returns <code>400</code>. An overlapping in-flight retry also receives <code>400</code>; try again later.',
        'The key can be up to <strong>120 characters</strong>. Prefer a stable legacy row ID, persisted UUID, or queue-message ID.'
      ])}
      ${sourceDetails('Idempotency')}`;
  }

  function webhooks() {
    return `${pageIntro('Webhooks','Webhooks overview','Webhooks deliver signed event notifications when DealEngine business events happen. Create an endpoint using the Webhooks screen and store its one-time signing secret securely.')}
      <div class="card-grid">
        ${cardLink('webhook-events','17 events','Deals, leads, quotations, payments, feedback and more.','◎')}
        ${cardLink('webhook-signature','Verify signatures','HMAC-SHA256 over timestamp and raw body.','◇')}
        ${cardLink('webhook-delivery','Delivery & retries','At-least-once delivery, backoff and disablement.','↻')}
        ${cardLink('ep-list-deals','Related REST API','Poll after downtime using supported updatedSince filters.','↗')}
      </div>
      <h2 id="payload">Webhook request format</h2>
      ${codeBlock('HEADERS & PAYLOAD (GUIDE EXAMPLE)',`POST /your-endpoint
Content-Type: application/json
User-Agent: DealEngine-Webhooks/1
X-DealEngine-Event: quotation.accepted
X-DealEngine-Signature: t=1786694400,v1=6b1f…

{
  "id": "evt_01KZXHHDRSJKBGB4M67F7M3CSE",
  "event": "quotation.accepted",
  "occurredAt": "2026-08-13T09:01:37.710Z",
  "workspace": { "id": "01KZR0…", "name": "Future Group KSA" },
  "data": { "object": "quotation", "id": "01KZ…", "status": "won", … }
}`)}
      <h2 id="behavior">Delivery contract</h2>${simpleList([
        'The same event appears in <code>X-DealEngine-Event</code> and the JSON body.',
        'Each event has a stable <code>id</code> across retries: deduplicate by it.',
        'If no events are selected on the webhook screen, the endpoint receives <strong>all</strong> event types.',
        'If the record was deleted before payload assembly, the <code>data</code> field can be <code>null</code>.',
        'Invoice/payment events contain an invoice payload, although those old REST endpoints return <code>410 Gone</code>.'
      ])}
      ${sourceDetails('Webhooks')}`;
  }

  function eventCategory(name) {
    if (name.startsWith('quotation.')) return 'Quotations';
    if (name.startsWith('deal.')) return 'Deals';
    if (name.startsWith('lead.')) return 'Leads';
    if (name.startsWith('approval.')) return 'Approvals';
    if (name.startsWith('invoice.')||name.startsWith('payment.')) return 'Money events';
    if (name.startsWith('feedback.')||name.startsWith('touch.')) return 'Account management';
    return 'Tags';
  }
  function webhookEvents() {
    const groups=[...new Set(docs.events.map(e=>eventCategory(e.name)))];
    return `${pageIntro('Webhooks','Webhook events','The guide specifies 17 event types. Subscribe to selected events, or leave every checkbox clear to receive all events.')}
      ${groups.map(g=>`<h2 id="events-${g.toLowerCase().replace(/\W+/g,'-')}">${escapeHTML(g)}</h2><div class="events-grid">${docs.events.filter(e=>eventCategory(e.name)===g).map(e=>`<div class="event-row"><code>${escapeHTML(e.name)}</code><p>${escapeHTML(e.description)}</p></div>`).join('')}</div>`).join('')}
      ${callout('The money event distinction','The old invoice/payment REST endpoints respond <code>410 Gone</code>; the guide still lists invoice/payment events and their invoice-bearing webhook payloads.','warning')}`;
  }

  function webhookSignature() {
    const verify=`import { createHmac, timingSafeEqual } from "node:crypto";

// body must be the RAW request text, before any JSON parsing —
// re-serialising changes the bytes and the signature will never match.
function verify(secret, body, header) {
  const parts = Object.fromEntries(
    header.split(",").map((p) => p.split("=", 2))
  );
  const t = Number(parts.t);
  if (!Number.isFinite(t)) return false;
  if (Math.abs(Date.now() / 1000 - t) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(\`\${t}.\${body}\`, "utf8")
    .digest("hex");
  if (expected.length !== parts.v1.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));
}`;
    return `${pageIntro('Webhooks','Signature verification','Each webhook is signed with HMAC-SHA256 using the endpoint signing secret. Verify the raw request body, enforce timestamp tolerance and compare digests in constant time.')}
      <h2 id="header">Signature header</h2>${codeBlock('HEADER FORMAT','X-DealEngine-Signature: t=<unix seconds>,v1=<hex hmac>')}
      <div class="steps">${step(1,'Preserve the raw request body','Read the exact bytes of the incoming payload before JSON parsing or serialization.')}${step(2,'Check timestamp freshness','Reject a timestamp more than 300 seconds away from the current time.')}${step(3,'Compute the digest','Calculate HMAC-SHA256 using your endpoint secret over <code>timestamp.raw_body</code>.')}${step(4,'Compare safely','Use a constant-time comparison such as Node.js <code>timingSafeEqual</code>.')}</div>
      ${codeBlock('NODE.JS · VERBATIM GUIDE EXAMPLE',verify)}
      ${callout('Security requirement','Do not trust a signature based on a re-serialized JSON object, skip the clock check or compare secrets with a normal equality operator.','warning')}`;
  }

  function webhookDelivery() {
    return `${pageIntro('Webhooks','Delivery & retries','Webhook delivery is at-least-once. Your receiver should persist the payload promptly, acknowledge within eight seconds, and process asynchronously.')}
      <h2 id="attempts">Retry policy</h2><p>Up to <strong>7 delivery attempts</strong>, with delays of <code>1</code>, <code>5</code>, <code>30</code>, <code>120</code>, <code>360</code>, and <code>1440</code> minutes between attempts.</p>
      ${table(['Retry','Action'],[
        ['HTTP <code>5xx</code>, <code>408</code>, <code>429</code>','Retried.'],
        ['Timeouts and connection failures','Retried.'],
        ['HTTP <code>3xx</code> or other <code>4xx</code>','Not retried. Redirects are not followed.'],
        ['Within <code>8 seconds</code>','Return <code>2xx</code> after accepting the payload.']
      ])}
      <h2 id="disablement">Auto-disable and recovery</h2><p>After 20 consecutive failures, the webhook endpoint is switched off. After fixing the issue and choosing Resume, pending deliveries resume, but events generated while disabled were not queued for that endpoint. Catch up using the REST API’s <code>updatedSince</code> filters where supported.</p>
      <h2 id="network">Network restrictions</h2>${simpleList([
        'The destination must be an HTTPS URL with no credentials embedded.',
        'The host must resolve publicly; loopback, private, link-local and metadata addresses are blocked on each attempt.',
        'Redirects are not followed; configure the final destination URL.',
        'For local testing, use a public HTTPS tunnel and validate with the Webhooks screen’s signed Test ping.'
      ])}
      ${codeBlock('WEBHOOK TEST PAYLOAD (GUIDE EXAMPLE)',`{ "id": "evt_…", "event": "ping", "occurredAt": "…",
  "data": { "message": "This is a test from DealEngine." } }`)}
      ${sourceDetails('Webhooks')}`;
  }

  function fullGuide() {
    const chapters=['Getting started','Authentication','Endpoints','Filtering and syncing','Paging','Conventions','Errors','Rate limits','Idempotency','Webhooks'];
    return `${pageIntro('Reference','Original developer guide','The complete supplied source remains available verbatim. This page provides an easy way to compare the curated reference against the original contract wording.')}
      <div class="button-row"><a class="btn primary" href="source/DealEngine-Developer-Guide.txt" download>Download source TXT ↓</a>${routeLink('api-directory','Browse structured endpoints','btn secondary')}</div>
      ${chapters.map((h,i)=>`<h2 id="chapter-${i+1}">${i+1}. ${escapeHTML(h)}</h2><div class="guide-source" style="max-height:620px">${escapeHTML(docs.chapters[h])}</div>`).join('')}`;
  }

  const pageRenderers={overview,quickstart,authentication,'api-directory':directory,writes,migration,filtering,pagination,conventions,errors,'rate-limits':rateLimits,idempotency,webhooks,'webhook-events':webhookEvents,'webhook-signature':webhookSignature,'webhook-delivery':webhookDelivery,'full-guide':fullGuide};

  function matchesFilter(filter,e) {
    const works=filter.worksOn;
    if (works==='every list') return e.isList;
    if (!e.isList) return false;
    const stem=e.path.replace('/api/v1','').replace(/\/\{[^}]+\}/g,'');
    // /reports/{id}/rows is a list even though it does not have a normal resource stem.
    if (stem.includes('/reports') && works.includes('/reports')) return true;
    const bases=works.split(',').map(x=>x.trim());
    return bases.some(x=>stem===x || stem.startsWith(x+'/'));
  }
  function relatedParameters(e) {
    const params=[];
    for (const name of (e.path.match(/\{[^}]+\}/g)||[])) params.push({name:name.slice(1,-1),type:'path',desc:name.includes('transparent')?'Transparent resource request ID.':'Public record or report ID returned by the API.'});
    for(const f of docs.filters) if(matchesFilter(f,e)) params.push({name:f.name,type:'query',desc:f.description});
    return params;
  }
  function endpointNotes(e) {
    const notes=[];
    const group=e.group;
    if(group==='Clients') {
      notes.push('Client records are filtered by account ownership, management and branch scope. An unowned client may open by ID even if it does not appear in the visible list.');
      if(e.method!=='GET') notes.push('Write bodies use client input field names. Custom fields are merged on PATCH. Required and Unique field settings are enforced.');
      if(e.slug==='create-client') notes.push('The client is owned by the key’s acting person on create; a first contact can be sent in the same request.');
      if(e.slug==='update-client') notes.push('ownerPublicId works on PATCH. Manager assignment can require accounts.assign; branch and Transparent pairing checks apply.');
    }
    if(group==='Deals & pipeline') {
      notes.push('Deal lists and lookups follow deal-owner scope. The pipeline endpoint returns stable stage keys, display names, stage types and default probabilities.');
      if(e.method!=='GET') notes.push('Use clientPublicId for an existing visible client and stageKey from /pipeline. A deal contact must work at the named client.');
      if(e.slug==='create-deal') notes.push('Deals may be created directly into won/lost stages for historical imports. Marketing ROI may require origin; currency defaults to workspace base currency.');
      if(e.slug==='update-deal') notes.push('PATCH changes only supplied fields. Null or empty string clears a non-required field; moving to won/lost triggers deal.won / deal.lost.');
    }
    if(group==='Leads') {
      notes.push('Marketing must be enabled. Leads are restricted to the key’s owner scope, except unowned leads visible to keys with Marketing access.');
      if(e.slug==='upsert-lead') notes.push('POST upserts by email: 201 when created, 200 when updated. Internal company email domains are refused; source defaults to api.');
      if(e.slug==='update-lead') notes.push('A changed email may not belong to a different lead. Only the submitted fields change.');
    }
    if(group==='Quotations') notes.push('Quotation reads follow deal-owner scope. The single-quotation response includes its acceptance record when one exists.');
    if(group==='Contacts') notes.push('Contact visibility follows the client account scope. Use email or primary filters for the contact list.');
    if(group==='Contracts') notes.push('Contracts follow deal-owner scope; the list is ordered by soonest-ending first.');
    if(group==='Activities') notes.push('Activities include notes, tasks, calls, meetings, stage changes and quotation events. They follow deal access, and can include account-level events for a key that sees all deals.');
    if(group==='Account management') notes.push('Account management must be enabled. The data is limited to visible accounts. Access can return 403 while the feature is switched off.');
    if(group==='Tags') notes.push('The tag library includes ID, name, colour, group, record kinds and archive state. Writes on supported records accept a list of tag names.');
    if(group==='Reports') notes.push('The key needs reports.view. Saved reports and their rows use the person’s own access scope.');
    if(group==='Transparent integration') notes.push('Transparent integration uses Transparent’s own resource request identifier rather than the CRM public ID.');
    if(e.slug==='submit-resource-result') notes.push('The guide does not specify the callback JSON body; verify the required schema with DealEngine before integrating. The key must have deals.edit and must not be read-only.');
    return notes;
  }

  function extractPath(path){return path.replace('/api/v1','').replace(/\{id\}/g,'YOUR_PUBLIC_ID').replace(/\{transparentId\}/g,'YOUR_TRANSPARENT_ID');}
  function bodyExampleFor(e) {
    if(e.exampleBody) return e.exampleBody;
    if(e.slug==='update-client') return {companyName:'Acme Trading'};
    if(e.slug==='update-deal') return {stageKey:'negotiation'};
    if(e.slug==='update-lead') return {status:'contacted'};
    return null;
  }
  function sampleUrl(e) {
    let url=base+extractPath(e.path);
    if(e.slug==='list-deals') return url+'?limit=200&offset=0';
    if(e.isList) return url+'?limit=50&offset=0';
    return url;
  }
  function sampleCode(e,lang) {
    const url=sampleUrl(e), body=bodyExampleFor(e), unknownBody=e.slug==='submit-resource-result';
    if(lang==='curl') {
      const args=[`curl -X ${e.method} "${url}" \\`,'  -H "Authorization: Bearer $DE_KEY"'];
      if(e.method!=='GET'){
        args[args.length-1]+=' \\';
        args.push('  -H "Content-Type: application/json"');
        if(e.method==='POST'&&body) args[args.length-1]+=' \\';
        if(e.method==='POST'&&body) args.push('  -H "Idempotency-Key: your-stable-write-id"');
        if(body) {
          args[args.length-1]+=' \\';
          args.push('  --data-raw '+JSON.stringify(JSON.stringify(body)));
        } else if (unknownBody) {
          args[args.length-1] += ' \\';
          args.push('  --data-raw "<CALLBACK_JSON_SCHEMA_NOT_DOCUMENTED>"');
        }
      }
      return args.join('\n');
    }
    if(lang==='node') {
      const lines=[`// Node.js 18+ · set DE_API_KEY on your server`, `const response = await fetch(${JSON.stringify(url)}, {`,`  method: "${e.method}",`,'  headers: {','    Authorization: `Bearer ${process.env.DE_API_KEY}`,'];
      if(e.method!=='GET')lines.push('    "Content-Type": "application/json",');
      if(e.method==='POST'&&body)lines.push('    "Idempotency-Key": "your-stable-write-id",');
      lines.push('  },');
      if(body) lines.push(`  body: JSON.stringify(${JSON.stringify(body,null,2).replace(/\n/g,'\n  ')}),`);
      if(unknownBody) lines.push('  // Body schema: not documented in the supplied guide.');
      lines.push('});','if (!response.ok) throw new Error(`HTTP ${response.status}`);','const result = await response.json();','console.log(result);');
      return lines.join('\n');
    }
    if(lang==='csharp') {
      const method=e.method==='GET'?'Get':e.method==='POST'?'Post':'Patch';
      const lines=['// .NET 8+ · configured on your trusted server','using System.Net.Http.Headers;','using System.Text;','using System.Text.Json;','','using var http = new HttpClient();','var apiKey = Environment.GetEnvironmentVariable("DE_API_KEY")','    ?? throw new InvalidOperationException("Missing DE_API_KEY");','http.DefaultRequestHeaders.Authorization =','    new AuthenticationHeaderValue("Bearer", apiKey);','',`using var request = new HttpRequestMessage(HttpMethod.${method},`,`    ${JSON.stringify(url)});`];
      if(e.method==='POST'&&body) lines.push('request.Headers.TryAddWithoutValidation("Idempotency-Key", "your-stable-write-id");');
      if(body) lines.push(`var json = """`, formatJSON(body), `""";`, 'request.Content = new StringContent(json, Encoding.UTF8, "application/json");');
      if(unknownBody) lines.push('// Callback JSON body is not defined in this guide; confirm its contract first.');
      lines.push('','using var response = await http.SendAsync(request);','response.EnsureSuccessStatusCode();','Console.WriteLine(await response.Content.ReadAsStringAsync());');
      return lines.join('\n');
    }
    return '';
  }

  function endpoint(e) {
    const params=relatedParameters(e);
    const body=bodyExampleFor(e);
    const isDocBody=Boolean(e.exampleBody);
    const notes=endpointNotes(e);
    const exampleResponse=(e.slug==='get-deal')?docs.exampleResponses.deal:(e.slug==='get-client')?docs.exampleResponses.client:null;
    const permission=e.permission?`${pill(`Permission: <strong>${escapeHTML(e.permission)}</strong>`,'permission-pill')}`:pill('Inherits key scope');
    const pathParams=params.filter(p=>p.type==='path'), queryParams=params.filter(p=>p.type==='query');
    const tag=e.method==='GET'?'READ OPERATION':'WRITE OPERATION';
    return `${breadcrumb(e.group,e.title)}${kicker(`API REFERENCE / ${tag}`)}
      <div class="endpoint-top">${methodBadge(e.method)}<h1>${escapeHTML(e.title)}</h1></div>
      <div class="endpoint-url"><code>${escapeHTML(e.path)}</code>${copyButton(base+extractPath(e.path),'Copy URL')}</div>
      <p class="endpoint-description">${escapeHTML(e.description)}</p>
      <div class="tag-row">${pill('Bearer API key', '')}${permission}${e.isList?pill('Paginated list','green'):''}</div>
      <h2 id="request">Request</h2><p>Send this operation to the versioned DealEngine base URL. A valid bearer key is required for every request.</p>
      ${pathParams.length?`<h3 id="path-parameters">Path parameters</h3>${table(['Name','Location','Description'],pathParams.map(p=>[`<code>${escapeHTML(p.name)}</code>`,escapeHTML(p.type),escapeHTML(p.desc)]))}`:''}
      ${queryParams.length?`<h3 id="query-parameters">Query parameters</h3>${table(['Parameter','Type','Description'],queryParams.map(p=>[`<code>${escapeHTML(p.name)}</code>`,'Query (optional)',escapeHTML(p.desc)]))}`:''}
      ${e.isList?`<p class="muted-note">Lists use <code>limit</code> (default 50, max 200), <code>offset</code>, and return <code>hasMore</code>. All rows are filtered to this key’s visible records.</p>`:''}
      ${e.method!=='GET'?`<h2 id="request-body">Request body</h2>`:''}
      ${e.bodyFields?.length?`<p>Documented input names for this operation:</p><div class="verb-tags">${e.bodyFields.map(f=>`<span class="field-chip">${escapeHTML(f)}</span>`).join('')}</div>`:''}
      ${e.slug==='create-client'?`<p>The create request wraps <code>client</code> and optionally <code>contact</code>. Contact inputs are <code>name</code>, <code>title</code>, <code>department</code>, <code>email</code>, <code>phone</code>, <code>mobile</code>, <code>linkedinUrl</code>, <code>preferredLocale</code>, <code>isPrimary</code> and <code>custom</code>.</p>`:''}
      ${body?`${!isDocBody?'<p class="muted-note">Minimal illustrative PATCH example using documented fields; not an exhaustive request schema.</p>':''}${codeBlock(isDocBody?'BODY EXAMPLE FROM THE GUIDE':'ILLUSTRATIVE JSON BODY',formatJSON(body))}`:e.method!=='GET'?`${callout('No callback body defined','The current Developer Guide documents the method and permission, but does not provide the JSON schema for this callback. Do not send a guessed payload.','warning')}`:''}
      <h2 id="response">Response</h2>
      ${exampleResponse?`${codeBlock('EXACT EXAMPLE FROM THE GUIDE',formatJSON(exampleResponse))}`:
      e.isList?`<p>Returns the standard list envelope with <code>data</code>, <code>total</code>, <code>limit</code>, <code>offset</code>, and <code>hasMore</code>. The guide does not publish a separate full JSON schema for this resource.</p>${codeBlock('LIST ENVELOPE · JSONC',`{\n  "data": [ /* resource objects */ ],\n  "total": 137,\n  "limit": 50,\n  "offset": 0,\n  "hasMore": true\n}`)}`:
      `<p>The supplied guide does not include an operation-specific complete response sample. ${e.method==='GET'?'The resource is returned within the authenticated key’s record scope.':'A write follows the documented field validations and access checks.'}</p>`}
      <h2 id="important-details">Important details</h2>
      ${simpleList(notes.map(n=>escapeHTML(n)))}
      ${e.slug==='get-pipeline'?callout('Use stable keys','The pipeline response gives each stage’s <code>key</code>, <code>name</code>, <code>type</code> and default probability. Use keys, not workspace-editable labels, on deal writes.'):''}
      ${e.slug==='list-feedback'?callout('Account management required','Feedback aggregates Transparent, email-derived feedback and clicked ratings. Duplicates and items determined not to be feedback are excluded.'):''}
      ${e.slug==='list-account-touches'?callout('Sent content is conditional','Email subject and body are returned only when the account touch has been sent.'):''}
      ${e.slug==='get-resource-request'?callout('Source identifier','The lookup uses Transparent’s own <code>transparentId</code> as documented, not a CRM record ID.'):''}
      <div class="divider"></div><div class="button-row">${routeLink('api-directory','← All endpoints','btn secondary')}${routeLink('authentication',`Authentication ${icons.arrow}`,'btn secondary')}</div>`;
  }

  function tocFor(articleHTML) {
    const parser=document.createElement('div');parser.innerHTML=articleHTML;
    const h=parser.querySelectorAll('h2[id], h3[id]');
    return [...h].slice(0,14).map(node=>({id:node.id,text:node.textContent,level:node.tagName}));
  }

  function railForEndpoint(e) {
    const code=sampleCode(e,activeTab);
    const codeId='rail-code';copyRegistry.set(codeId,code);
    return `<div class="rail-heading">REQUEST EXAMPLE</div><div class="rail-example"><div class="rail-example-title"><span>${methodBadge(e.method,true)} &nbsp;${escapeHTML(e.path.replace('/api/v1',''))}</span><button type="button" data-copy-id="${codeId}">Copy</button></div><div class="code-tabs"><button type="button" data-code-lang="curl" class="code-tab ${activeTab==='curl'?'selected':''}">cURL</button><button type="button" data-code-lang="node" class="code-tab ${activeTab==='node'?'selected':''}">Node.js</button><button type="button" data-code-lang="csharp" class="code-tab ${activeTab==='csharp'?'selected':''}">C# / .NET</button></div><pre><code>${escapeHTML(code)}</code></pre></div>
      <p class="rail-note">Examples use <code>$DE_KEY</code> (shell) or the server-side <code>DE_API_KEY</code> environment variable. ID placeholders need replacement. Never paste live API keys into browser-side code.</p>
      <div class="divider"></div><div class="rail-heading">OPERATION DETAILS</div><div class="rail-statbox"><span class="rail-label">VERSIONED ENDPOINT</span><strong>${escapeHTML(e.method)}</strong><p><code>${escapeHTML(e.path)}</code></p><div class="mini-divider"></div><span class="rail-label">REQUIRED PERMISSION</span><p style="margin-top:7px;color:var(--ink);font-weight:750">${escapeHTML(e.permission||'No additional named permission')}</p></div>
      <div class="divider"></div><div class="rail-tip"><b>Need every record?</b><p>A key can only return records visible to its acting person. To retrieve everything in scope, follow <code>hasMore</code> to the last page.</p>${routeLink('pagination','Read pagination guide →')}</div>`;
  }
  function railForGuide(html) {
    const toc=tocFor(html);
    const tocHtml=toc.length?`<div class="rail-heading">ON THIS PAGE</div><nav class="right-toc">${toc.map(x=>`<a href="#${escapeHTML(x.id)}" data-anchor="${escapeHTML(x.id)}" style="${x.level==='H3'?'padding-left:22px':''}">${escapeHTML(x.text)}</a>`).join('')}</nav>`:'';
    return `${tocHtml}<div class="rail-heading">AT A GLANCE</div><div class="rail-statbox"><span class="rail-label">BASE URL</span><p class="mono" style="word-break:break-word;margin-top:7px;font-size:11px;color:var(--ink)">${escapeHTML(base)}</p><div class="mini-divider"></div><span class="rail-label">DEVELOPER API</span><strong>v1</strong><p>28 endpoints · 17 webhook events</p></div><div class="divider"></div><div class="rail-tip"><b>Documentation first</b><p>Every published path, behavior and restriction comes from the updated guide supplied for this portal.</p><a href="source/DealEngine-Developer-Guide.txt" download>Download source text →</a></div>`;
  }

  function render() {
    copyRegistry.clear();copyCounter=0;
    const e=endpointLookup.get(activeId);
    const html=e?endpoint(e):(pageRenderers[activeId]||overview)();
    $('#content').innerHTML=html;
    renderSidebar();
    $('#railContent').innerHTML=e?railForEndpoint(e):railForGuide(html);
    const title=e?`${e.title} · API Reference`:`${(pageLookup.get(activeId)||pageLookup.get('overview')).title} · Developer Docs`;
    document.title=`${title} | DealEngine`;
  }
  function navigate(id,{updateHistory=true}={}) {
    if(!pageLookup.has(id)&&!endpointLookup.has(id)) id='overview';
    activeId=id;
    if(updateHistory){const url=new URL(window.location.href);url.searchParams.set('doc',id);url.hash='';window.history.pushState({doc:id},'',url);}
    activeTab='curl';render();
    $('.sidebar').classList.remove('open');$('#sidebarBackdrop').classList.remove('visible');$('#menuToggle').setAttribute('aria-expanded','false');
    window.scrollTo(0,0);
    const main=$('#main'); if(main) main.focus({preventScroll:true});
  }

  function showToast(message) {const toast=$('#toast');toast.textContent=message;toast.classList.add('show');window.clearTimeout(toastTimeout);toastTimeout=window.setTimeout(()=>toast.classList.remove('show'),1700);}
  async function copyText(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else { const el=document.createElement('textarea');el.value=value;el.style.position='fixed';el.style.opacity='0';document.body.appendChild(el);el.select();const ok=document.execCommand('copy');el.remove();if(!ok) throw new Error('Clipboard unavailable'); }
      showToast('Copied to clipboard');
    } catch {showToast('Copy unavailable — select the text manually');}
  }

  const searchItems=[...guidePages.map(p=>({...p,type:'Guide',search:`${p.title} ${p.description} ${p.category}`})),...docs.endpoints.map(e=>({...e,title:e.title,type:'API endpoint',search:`${e.method} ${e.path} ${e.title} ${e.group} ${e.description} ${e.permission||''}`}))];
  const searchBox=$('#searchInput');
  const overlay=$('#searchOverlay');
  function findResults(query) {
    const q=query.trim().toLowerCase();
    if(!q) return searchItems.slice(0,12);
    const tokens=q.split(/\s+/).filter(Boolean);
    return searchItems.filter(item=>tokens.every(t=>item.search.toLowerCase().includes(t))).sort((a,b)=>{
      const at=a.title.toLowerCase().includes(q)?1:0,bt=b.title.toLowerCase().includes(q)?1:0;
      return bt-at;
    }).slice(0,35);
  }
  function drawSearch() {
    filteredResults=findResults(searchBox.value);selectedResult=Math.min(selectedResult,Math.max(0,filteredResults.length-1));
    $('#searchResults').innerHTML=filteredResults.length?`<div class="search-section-label">${searchBox.value.trim()?'Matching documentation':'Popular documentation'}</div>${filteredResults.map((r,i)=>`<button class="search-result ${i===selectedResult?'active':''}" data-result-index="${i}" type="button"><span class="search-result-icon">${r.method?escapeHTML(r.method.slice(0,1)):escapeHTML(r.icon||'↗')}</span><span class="search-result-body"><b>${escapeHTML(r.title)}</b><small>${escapeHTML(r.method?r.method+' '+r.path:r.description)}</small></span><span class="search-enter">↵</span></button>`).join('')}`:'<div class="search-empty">No matching documentation. Try a method, resource name, or keyword.</div>';
    $('#searchResults .search-result.active')?.scrollIntoView({block:'nearest'});
  }
  function openSearch(initial=''){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchBox.value=initial;selectedResult=0;drawSearch();window.setTimeout(()=>searchBox.focus(),0);}
  function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
  function handleSearchOpen() {openSearch('');}
  $('#topSearch').addEventListener('click',handleSearchOpen);
  $('#sideSearch').addEventListener('click',handleSearchOpen);
  $('#searchShade').addEventListener('click',closeSearch);
  $('#closeSearch').addEventListener('click',closeSearch);
  searchBox.addEventListener('input',()=>{selectedResult=0;drawSearch();});
  $('#searchResults').addEventListener('click',ev=>{const b=ev.target.closest('[data-result-index]');if(!b)return;const item=filteredResults[Number(b.dataset.resultIndex)];if(item){closeSearch();navigate(item.id);}});

  document.addEventListener('keydown',ev=>{
    if ((ev.metaKey||ev.ctrlKey) && ev.key.toLowerCase()==='k') {ev.preventDefault();if(overlay.classList.contains('open')) closeSearch();else openSearch();return;}
    if(ev.key==='/' && !overlay.classList.contains('open') && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){ev.preventDefault();openSearch();return;}
    if(!overlay.classList.contains('open'))return;
    if(ev.key==='Escape'){ev.preventDefault();closeSearch();}
    else if(ev.key==='ArrowDown'){ev.preventDefault();selectedResult=Math.min(filteredResults.length-1,selectedResult+1);drawSearch();}
    else if(ev.key==='ArrowUp'){ev.preventDefault();selectedResult=Math.max(0,selectedResult-1);drawSearch();}
    else if(ev.key==='Enter'&&filteredResults[selectedResult]){ev.preventDefault();const item=filteredResults[selectedResult];closeSearch();navigate(item.id);}
  });
  $('#menuToggle').addEventListener('click',()=>{const isOpen=$('#sidebar').classList.toggle('open');$('#sidebarBackdrop').classList.toggle('visible',isOpen);$('#menuToggle').setAttribute('aria-expanded',String(isOpen));});
  $('#sidebarBackdrop').addEventListener('click',()=>{$('#sidebar').classList.remove('open');$('#sidebarBackdrop').classList.remove('visible');$('#menuToggle').setAttribute('aria-expanded','false');});

  const savedTheme=(()=>{try{return localStorage.getItem('dealengine-docs-theme')}catch{return null}})();
  if(savedTheme==='dark')document.documentElement.dataset.theme='dark';
  $('#themeToggle').addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('dealengine-docs-theme',t)}catch{};});
  document.addEventListener('click',ev=>{
    const route=ev.target.closest('a[data-route]');
    if(route){ev.preventDefault();navigate(route.dataset.route);return;}
    const copy=ev.target.closest('[data-copy-id]');
    if(copy){const val=copyRegistry.get(copy.dataset.copyId);if(val!==undefined)copyText(val);return;}
    const tab=ev.target.closest('[data-code-lang]');
    if(tab){activeTab=tab.dataset.codeLang;const e=endpointLookup.get(activeId);if(!e)return;$('#railContent').innerHTML=railForEndpoint(e);return;}
    const group=ev.target.closest('[data-toggle-group]');
    if(group){const outer=group.closest('.nav-group');const collapsed=outer.classList.toggle('collapsed');group.setAttribute('aria-expanded',String(!collapsed));return;}
    const anchor=ev.target.closest('[data-anchor]');
    if(anchor){ev.preventDefault();document.getElementById(anchor.dataset.anchor)?.scrollIntoView({behavior:'smooth',block:'start'});}
  });
  window.addEventListener('popstate',()=>navigate(new URLSearchParams(location.search).get('doc')||'overview',{updateHistory:false}));
  navigate(new URLSearchParams(location.search).get('doc')||'overview',{updateHistory:false});
})();
