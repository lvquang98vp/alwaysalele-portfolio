import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Deploy the already-built Vinext Worker; never run Wrangler framework migration.
const root = new URL('../', import.meta.url);
const configUrl = new URL('dist/server/wrangler.json', root);
const outputUrl = new URL('dist/server/wrangler.cloudflare.json', root);
const dryRun = process.argv.slice(2).includes('--dry-run');
if (process.argv.slice(2).some(arg => arg !== '--dry-run')) {
  throw new Error('Only --dry-run is supported.');
}
const databaseId = process.env.CF_D1_DATABASE_ID?.trim();
const bucketName = process.env.CF_R2_BUCKET_NAME?.trim();
if (!databaseId || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(databaseId) || databaseId === '00000000-0000-4000-8000-000000000000') {
  throw new Error('Set CF_D1_DATABASE_ID to the real D1 database UUID in Cloudflare build variables. Do not use the local preview placeholder.');
}
if (!bucketName || !/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(bucketName)) {
  throw new Error('Set CF_R2_BUCKET_NAME to an existing R2 bucket name in your Cloudflare account.');
}
let config;
try { config = JSON.parse(await readFile(configUrl, 'utf8')); }
catch { throw new Error('Vinext build output is missing. Run npm run build before deploying.'); }
config.name = 'alwaysalele-portfolio';
config.topLevelName = config.name;
config.d1_databases = [{ binding: 'DB', database_name: 'alwaysalele-commissions', database_id: databaseId, migrations_dir: '../../drizzle' }];
config.r2_buckets = [{ binding: 'BUCKET', bucket_name: bucketName }];
// Keep main, assets, compatibility flags and module rules from the Vite build.
await writeFile(outputUrl, JSON.stringify(config, null, 2) + '\n');
const args = [fileURLToPath(new URL('node_modules/wrangler/bin/wrangler.js', root)), 'deploy', '--config', fileURLToPath(outputUrl), ...(dryRun ? ['--dry-run'] : [])];
const result = spawnSync(process.execPath, args, { cwd: fileURLToPath(root), stdio: 'inherit', env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
