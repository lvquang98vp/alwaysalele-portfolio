import { storage, hash } from '@/lib/commission-db';
import { services, estimate } from '@/lib/catalog';
const fail=(message:string,status=400)=>Response.json({error:message},{status});
export async function POST(request:Request) {
  const origin=request.headers.get('origin');
  if(origin && origin!==new URL(request.url).origin) return fail('Invalid request origin.',403);
  if(Number(request.headers.get('content-length')||0)>27*1024*1024) return fail('Attachments must total less than 25 MB.',413);
  let uploaded:string[]=[];
  let bucket:ReturnType<typeof storage>['bucket']|undefined;
  try {
    const form=await request.formData();
    if(form.get('website')) return fail('Invalid request.');
    const service=services.find(s=>s.id===form.get('service'));
    const name=String(form.get('name')||'').trim(), email=String(form.get('email')||'').trim();
    const description=String(form.get('description')||'').trim();
    const color=String(form.get('color')||'').trim(), pose=String(form.get('pose')||'').trim();
    const count=Number(form.get('count')),format=String(form.get('format')||'half'),background=form.get('background')==='true';
    if(!service || !name || name.length>120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254 || description.length<20 || description.length>5000 || !color || color.length>200 || !pose || pose.length>500 || !Number.isInteger(count) || count<1 || count>5 || !['half','full'].includes(format) || (service.id==='pngtuber'&&count!==1) || form.get('terms')!=='true') return fail('Please complete all required fields and accept the commission terms.');
    const files=form.getAll('references').filter((f):f is File=>f instanceof File && f.size>0);
    if(files.length<service.minRefs || files.length>10 || files.some(f=>f.size>5*1024*1024) || files.reduce((sum,f)=>sum+f.size,0)>25*1024*1024) return fail(`Attach ${service.minRefs}–10 reference images (up to 5 MB each, 25 MB total).`);
    const buffers=await Promise.all(files.map(f=>f.arrayBuffer()));
    for(const buffer of buffers) {
      const b=new Uint8Array(buffer);
      const valid=(b[0]===0xff&&b[1]===0xd8&&b[2]===0xff)||(b[0]===0x89&&b[1]===0x50&&b[2]===0x4e&&b[3]===0x47)||(String.fromCharCode(...b.slice(0,4))==='RIFF'&&String.fromCharCode(...b.slice(8,12))==='WEBP');
      if(!valid) return fail('Reference images must be PNG, JPEG or WebP.');
    }
    const bindings=storage(); bucket=bindings.bucket;
    const id=crypto.randomUUID(),token=crypto.randomUUID()+crypto.randomUUID(),createdAt=new Date().toISOString();
    const refs=[];
    for(let i=0;i<files.length;i++) {
      const key=`commissions/${id}/${i}`;
      await bucket.put(key,buffers[i],{httpMetadata:{contentType:files[i].type||'application/octet-stream'}}); uploaded.push(key);
      refs.push({key,name:files[i].name.slice(0,200),size:files[i].size});
    }
    const total=estimate(service,count,format,background);
    await bindings.db.prepare('INSERT INTO commissions (id, token_hash, name, email, service, options, estimate, description, "references", status, created_at, terms_version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(id,await hash(token),name,email,service.id,JSON.stringify({count,format,background,color,pose}),total,description,JSON.stringify(refs),'received',createdAt,'2026-10-08').run();
    return Response.json({id,token,status:'received',service:service.short,estimate:total,createdAt},{status:201,headers:{'Cache-Control':'no-store'}});
  } catch(error) {
    if(bucket&&uploaded.length) await Promise.allSettled(uploaded.map(key=>bucket!.delete(key)));
    console.error('Commission save failed',error);
    return fail('Your request could not be saved. Your form is still here — please try again.',503);
  }
}
export async function GET(request:Request) {
  const url=new URL(request.url),id=url.searchParams.get('id'),token=request.headers.get('authorization')?.replace(/^Bearer /,'');
  if(!id||!token||token.length>200) return fail('A request ID and receipt key are required.',401);
  try {
    const {db}=storage();
    const row=await db.prepare('SELECT id, service, estimate, status, created_at FROM commissions WHERE id = ? AND token_hash = ?').bind(id,await hash(token)).first();
    if(!row)return fail('No matching request found.',404);
    return Response.json(row,{headers:{'Cache-Control':'no-store'}});
  }catch {return fail('Request lookup is temporarily unavailable.',503);}
}
