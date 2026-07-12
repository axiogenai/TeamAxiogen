import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    
    // Extract IP
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : headersList.get('x-real-ip') || 'unknown';
    
    // Extract metadata
    const userAgent = headersList.get('user-agent') || '';
    const referrer = headersList.get('referer') || '';
    
    // Parse body for page info
    let page = '/';
    try {
      const body = await request.json();
      if (body.page) page = body.page;
    } catch {
      // No body or invalid JSON is fine
    }
    
    // Geolocation via ip-api.com (free, no key needed, returns lat/lon)
    let geoData = {
      latitude: 0,
      longitude: 0,
      city: headersList.get('x-vercel-ip-city') || '',
      region: headersList.get('x-vercel-ip-region') || '',
      country: headersList.get('x-vercel-ip-country') || '',
      country_code: headersList.get('x-vercel-ip-country') || '',
      isp: '',
      org: '',
    };
    
    // Only call ip-api for real IPs (not localhost/unknown)
    if (ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,lat,lon,isp,org`,
          { signal: AbortSignal.timeout(3000) } // 3s timeout
        );
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.status === 'success') {
            geoData = {
              latitude: geo.lat || 0,
              longitude: geo.lon || 0,
              city: geo.city || geoData.city,
              region: geo.regionName || geoData.region,
              country: geo.country || geoData.country,
              country_code: geo.countryCode || geoData.country_code,
              isp: geo.isp || '',
              org: geo.org || '',
            };
          }
        }
      } catch {
        // Geo lookup failed, use Vercel fallback data
      }
    }
    
    // Store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      
      await supabase.from('visitors').insert({
        ip,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        city: geoData.city,
        region: geoData.region,
        country: geoData.country,
        country_code: geoData.country_code,
        isp: geoData.isp,
        org: geoData.org,
        user_agent: userAgent,
        page,
        referrer,
      });
    }
    
    return NextResponse.json(
      { success: true },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch {
    // Never fail visibly - tracking should be invisible
    return NextResponse.json({ success: true });
  }
}
