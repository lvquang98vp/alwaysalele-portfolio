import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base='http://127.0.0.1:5173';
async function make({count='2',badFile=false,omit=false}={}){
 const f=new FormData();
 for(const [key,value] of Object.entries({service:'pet-full',name:'Local QA fixture',email:'qa@example.invalid',description:'Local verification request for two painted pets.',color:'soft peach',pose:'sitting together',count,format:'half',background:'false',terms:'true',estimate:'1'}))f.append(key,value);
 const bytes=await readFile('public/art/avatar.webp');
 for(let i=0;i<(omit?1:4);i++)f.append('references',new Blob([badFile?'not an image':bytes],{type:'image/webp'}),`reference-${i}.webp`);
 return fetch(base+'/api/commissions',{method:'POST',body:f});
}
for(const input of [{count:'999'},{badFile:true},{omit:true}]){const r=await make(input);assert.equal(r.status,400);}
const r=await make();const receipt=await r.json();assert.equal(r.status,201,JSON.stringify(receipt));assert.equal(receipt.estimate,150,'Server must calculate estimate, ignoring supplied total');assert.equal(receipt.status,'received');
const invalid=await fetch(base+`/api/commissions?id=${receipt.id}`,{headers:{Authorization:'Bearer wrong-key'}});assert.equal(invalid.status,404);
const stored=await fetch(base+`/api/commissions?id=${receipt.id}`,{headers:{Authorization:`Bearer ${receipt.token}`}});const body=await stored.json();assert.equal(body.estimate,150);assert.equal(body.id,receipt.id);assert.equal(body.email,undefined);assert.equal(body.references,undefined);
console.log('PASS: invalid counts, invalid image bytes, minimum reference count, persisted request, server USD pricing, protected receipt lookup, no private data leakage. Local-only fixture: '+receipt.id);
