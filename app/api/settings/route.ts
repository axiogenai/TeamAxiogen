import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Public endpoint — no auth required — used by Portfolio to get active background
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ activeBg: '' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'active_bg')
      .single();

    if (error || !data) {
      return NextResponse.json({ activeBg: '' });
    }

    return NextResponse.json(
      { activeBg: data.value || '' },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
        },
      }
    );
  } catch {
    return NextResponse.json({ activeBg: '' });
  }
}
