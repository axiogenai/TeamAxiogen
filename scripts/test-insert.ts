// Run this to test portfolio database insertion configuration
// Usage: npx tsx scripts/test-insert.ts

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read .env.local manually
const envPath = join(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx > 0) {
    envVars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
}

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing visitors table insertion using Service Role Key...');
  
  const testRecord = {
    ip: '127.0.0.1',
    latitude: 0,
    longitude: 0,
    city: 'Localhost Test',
    region: 'Local',
    country: 'Local',
    country_code: 'LO',
    isp: 'Localhost ISP',
    org: 'Test Org',
    user_agent: 'Node test script',
    page: '/test',
    referrer: ''
  };

  const { data, error } = await supabase
    .from('visitors')
    .insert([testRecord])
    .select();

  if (error) {
    console.error('❌ Insert failed with error:', error);
  } else {
    console.log('✅ Insert succeeded! Data:', JSON.stringify(data, null, 2));
    
    // Clean up
    console.log('Cleaning up test record...');
    const { error: delError } = await supabase
      .from('visitors')
      .delete()
      .eq('id', data[0].id);
    if (delError) console.error('Clean up failed:', delError);
    else console.log('Clean up succeeded!');
  }
}

testInsert();
