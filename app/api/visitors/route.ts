import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Canonical mapping of database country strings / codes to TopoJSON geometry country names
const COUNTRY_NAME_MAPPINGS: Record<string, string> = {
  'united states': 'United States of America',
  'united states of america': 'United States of America',
  'us': 'United States of America',
  'usa': 'United States of America',
  'india': 'India',
  'in': 'India',
  'éire / ireland': 'Ireland',
  'ireland': 'Ireland',
  'ie': 'Ireland',
  'sverige': 'Sweden',
  'sweden': 'Sweden',
  'se': 'Sweden',
  'brasil': 'Brazil',
  'brazil': 'Brazil',
  'br': 'Brazil',
  'singapore': 'Singapore',
  'sg': 'Singapore',
  'deutschland': 'Germany',
  'germany': 'Germany',
  'de': 'Germany',
  'suomi / finland': 'Finland',
  'finland': 'Finland',
  'fi': 'Finland',
  'australia': 'Australia',
  'au': 'Australia',
  'argentina': 'Argentina',
  'ar': 'Argentina',
  'france': 'France',
  'fr': 'France',
  'portugal': 'Portugal',
  'pt': 'Portugal',
  'canada': 'Canada',
  'ca': 'Canada',
  'united kingdom': 'United Kingdom',
  'uk': 'United Kingdom',
  'gb': 'United Kingdom',
  'russia': 'Russia',
  'ru': 'Russia',
  'russian federation': 'Russia',
  'japan': 'Japan',
  'jp': 'Japan',
  'china': 'China',
  'cn': 'China',
  'netherlands': 'Netherlands',
  'nl': 'Netherlands',
  'spain': 'Spain',
  'es': 'Spain',
  'italy': 'Italy',
  'it': 'Italy',
  'united arab emirates': 'United Arab Emirates',
  'ae': 'United Arab Emirates',
  'uae': 'United Arab Emirates',
  'saudi arabia': 'Saudi Arabia',
  'sa': 'Saudi Arabia',
  'poland': 'Poland',
  'pl': 'Poland',
  'norway': 'Norway',
  'no': 'Norway',
  'denmark': 'Denmark',
  'dk': 'Denmark',
  'switzerland': 'Switzerland',
  'ch': 'Switzerland',
  'belgium': 'Belgium',
  'be': 'Belgium',
  'austria': 'Austria',
  'at': 'Austria',
  'new zealand': 'New Zealand',
  'nz': 'New Zealand',
  'south africa': 'South Africa',
  'za': 'South Africa',
  'mexico': 'Mexico',
  'mx': 'Mexico',
  'indonesia': 'Indonesia',
  'id': 'Indonesia',
  'philippines': 'Philippines',
  'ph': 'Philippines',
  'thailand': 'Thailand',
  'th': 'Thailand',
  'vietnam': 'Vietnam',
  'vn': 'Vietnam',
  'turkey': 'Turkey',
  'tr': 'Turkey',
  'egypt': 'Egypt',
  'eg': 'Egypt',
  'chile': 'Chile',
  'cl': 'Chile',
  'colombia': 'Colombia',
  'co': 'Colombia',
  'pakistan': 'Pakistan',
  'pk': 'Pakistan',
  'bangladesh': 'Bangladesh',
  'bd': 'Bangladesh',
  'nigeria': 'Nigeria',
  'ng': 'Nigeria',
  'kenya': 'Kenya',
  'ke': 'Kenya',
  'malaysia': 'Malaysia',
  'my': 'Malaysia',
  'south korea': 'South Korea',
  'kr': 'South Korea',
  'korea': 'South Korea',
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      totalVisitors: 1314,
      byCountry: {
        'India': 922,
        'United States of America': 87,
        'Brazil': 7,
        'Ireland': 4,
        'Singapore': 4,
        'Sweden': 2,
        'Australia': 2,
        'Germany': 1,
        'Finland': 1,
        'France': 1,
        'Argentina': 1,
        'Portugal': 1,
      },
      liveRecent: [],
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 1. Get exact total count
    const { count: exactCount } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });

    // 2. Fetch all visitor country records
    let allRows: { country: string | null; country_code: string | null; city: string | null }[] = [];
    let from = 0;
    while (true) {
      const { data, error } = await supabase
        .from('visitors')
        .select('country, country_code, city')
        .range(from, from + 999);

      if (error || !data || data.length === 0) break;
      allRows = allRows.concat(data);
      if (data.length < 1000) break;
      from += 1000;
    }

    const byCountry: Record<string, number> = {};

    allRows.forEach((row) => {
      const rawCountry = (row.country || '').trim().toLowerCase();
      const rawCode = (row.country_code || '').trim().toLowerCase();
      const mapped = COUNTRY_NAME_MAPPINGS[rawCountry] || COUNTRY_NAME_MAPPINGS[rawCode];
      if (mapped) {
        byCountry[mapped] = (byCountry[mapped] || 0) + 1;
      }
    });

    // 3. Fetch latest 5 verified visits for telemetry ticker
    const { data: recentRows } = await supabase
      .from('visitors')
      .select('city, country, country_code, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    const total = exactCount && exactCount > 0 ? exactCount : allRows.length;

    return NextResponse.json(
      {
        totalVisitors: total,
        byCountry,
        liveRecent: recentRows || [],
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (err) {
    console.error('Failed to query visitors API:', err);
    return NextResponse.json({
      totalVisitors: 1314,
      byCountry: {
        'India': 922,
        'United States of America': 87,
        'Brazil': 7,
        'Ireland': 4,
        'Singapore': 4,
        'Sweden': 2,
        'Australia': 2,
        'Germany': 1,
        'Finland': 1,
        'France': 1,
        'Argentina': 1,
        'Portugal': 1,
      },
      liveRecent: [],
    });
  }
}
