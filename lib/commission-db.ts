import { env } from 'cloudflare:workers';
export function storage() {
  if (!env.DB || !env.BUCKET) throw new Error('Commission storage unavailable');
  return { db: env.DB, bucket: env.BUCKET };
}
export async function hash(value:string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,'0')).join('');
}
