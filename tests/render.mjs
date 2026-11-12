import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=fs.readFileSync(path.join(root,'assets/data.js'),'utf8');
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const datastore={window:{}};vm.runInNewContext(data,datastore);
const guide=datastore.window.DEALENGINE_DOCS;
const pageIds=['overview','quickstart','authentication','api-directory','writes','migration','filtering','pagination','conventions','errors','rate-limits','idempotency','webhooks','webhook-events','webhook-signature','webhook-delivery','full-guide'];
const allIds=[...pageIds,...guide.endpoints.map(e=>e.id)];
function simulate(id){
  const elems=new Map();
  function elem(name=''){
    if(elems.has(name))return elems.get(name);
    const value={innerHTML:'',value:'',textContent:'',dataset:{},focus(){},addEventListener(){},setAttribute(){},scrollIntoView(){},
      get classList(){return {add(){},remove(){},toggle(){return false},contains(){return false}}},
      querySelectorAll(){return []},querySelector(){return null}};
    elems.set(name,value);return value;
  }
  const locationObj={href:`https://docs.example.com/?doc=${encodeURIComponent(id)}`,search:`?doc=${encodeURIComponent(id)}`,hash:''};
  const documentObj={title:'',documentElement:{dataset:{}},activeElement:{tagName:'BODY'},
    querySelector(sel){return elem(sel)},
    createElement(){return elem('temporary')},
    addEventListener(){},
    getElementById(id){return elem('#'+id)}
  };
  const context={
    window:{DEALENGINE_DOCS:guide,location:locationObj,history:{pushState(){}},scrollTo(){},setTimeout(){},clearTimeout(){},addEventListener(){},isSecureContext:true},
    location:locationObj,
    document:documentObj,
    localStorage:{getItem(){return null},setItem(){}},
    navigator:{},URL,URLSearchParams,console,setTimeout,clearTimeout
  };
  vm.runInNewContext(app,context,{timeout:3000});
  return {content:elem('#content').innerHTML,rail:elem('#railContent').innerHTML,sidebar:elem('#sidebarNav').innerHTML,title:documentObj.title};
}
for(const id of allIds){
  const {content,rail,sidebar,title}=simulate(id);
  assert(content.length>200,`${id}: empty page`);
  assert(rail.length>100,`${id}: empty code/help rail`);
  assert(sidebar.includes('Create a deal')&&sidebar.includes('Create or update a lead'),`${id}: missing navigation`);
  assert(title.includes('DealEngine'),`${id}: invalid page title`);
  if(id.startsWith('ep-')){
    const e=guide.endpoints.find(x=>x.id===id);
    assert(content.includes(e.path),`${id}: missing endpoint path`);
    assert(rail.includes('cURL'),`${id}: missing code tabs`);
  }
  if(id==='webhook-events')assert(content.includes('tags.changed')&&content.includes('payment.received'));
}
console.log(`✓ Rendered ${allIds.length} pages without runtime JavaScript errors`);
console.log('✓ All endpoints have route-specific documentation and code examples');
console.log('✓ Sidebar navigation includes updated CRM resources');
