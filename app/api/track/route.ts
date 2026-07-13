import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    
    // Extract IP (supports IPv4 and IPv6)
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : headersList.get('x-real-ip') || 'unknown';
    
    // Extract metadata from headers
    const userAgent = headersList.get('user-agent') || '';
    const referrer = headersList.get('referer') || '';
    
    // Parse full body payload
    let page = '/';
    let clientLat: number | null = null;
    let clientLon: number | null = null;
    let gpsAccuracy: number | null = null;
    let screenWidth: number | null = null;
    let screenHeight: number | null = null;
    let language = '';
    let timezone = '';
    let platform = '';
    let connectionType = '';
    let locationSource = 'ip';

    try {
      const body = await request.json();
      if (body.page) page = body.page;
      if (typeof body.latitude === 'number' && typeof body.longitude === 'number') {
        clientLat = body.latitude;
        clientLon = body.longitude;
      }
      if (typeof body.gps_accuracy === 'number') gpsAccuracy = body.gps_accuracy;
      if (typeof body.screen_width === 'number') screenWidth = body.screen_width;
      if (typeof body.screen_height === 'number') screenHeight = body.screen_height;
      if (body.language) language = body.language;
      if (body.timezone) timezone = body.timezone;
      if (body.platform) platform = body.platform;
      if (body.connection_type) connectionType = body.connection_type;
      if (body.location_source) locationSource = body.location_source;
    } catch {
      // No body or invalid JSON
    }
    
    // Parse Vercel geo headers (IPv4 + IPv6 supported)
    const vercelLat = parseFloat(headersList.get('x-vercel-ip-latitude') || '0');
    const vercelLon = parseFloat(headersList.get('x-vercel-ip-longitude') || '0');

    // Build geolocation data with priority chain
    let geoData = {
      latitude: clientLat ?? (vercelLat !== 0 ? vercelLat : 0),
      longitude: clientLon ?? (vercelLon !== 0 ? vercelLon : 0),
      city: headersList.get('x-vercel-ip-city') || '',
      region: headersList.get('x-vercel-ip-region') || '',
      country: headersList.get('x-vercel-ip-country') || '',
      country_code: headersList.get('x-vercel-ip-country') || '',
      isp: '',
      org: '',
      is_vpn: false,
      is_proxy: false,
      is_tor: false,
      ip_type: '',
    };
    
    // ipwho.is: Full IPv4/IPv6 geolocation + security flags
    if (ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(
          `https://ipwho.is/${ip}?fields=success,type,latitude,longitude,city,region,country,country_code,connection,security`,
          { signal: AbortSignal.timeout(4000) }
        );
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.success) {
            geoData = {
              latitude: clientLat ?? geo.latitude ?? geoData.latitude,
              longitude: clientLon ?? geo.longitude ?? geoData.longitude,
              city: geo.city || geoData.city,
              region: geo.region || geoData.region,
              country: geo.country || geoData.country,
              country_code: geo.country_code || geoData.country_code,
              isp: geo.connection?.isp || '',
              org: geo.connection?.org || '',
              is_vpn: geo.security?.vpn ?? false,
              is_proxy: geo.security?.proxy ?? false,
              is_tor: geo.security?.tor ?? false,
              ip_type: geo.type || '',
            };
          }
        }
      } catch {
        // Geo lookup failed — use client GPS + Vercel headers
      }
    }

    // Reverse Geocode the coordinates to get the actual city/town names (works for both GPS and IP-based coordinates)
    if (geoData.latitude !== 0 && geoData.longitude !== 0) {
      try {
        const revRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoData.latitude}&lon=${geoData.longitude}&zoom=12&addressdetails=1`,
          {
            headers: { 'User-Agent': 'Axiogen-Portfolio-Tracker/1.0' },
            signal: AbortSignal.timeout(3000),
          }
        );
        if (revRes.ok) {
          const revData = await revRes.json();
          if (revData && revData.address) {
            const addr = revData.address;
            geoData.city = addr.city || addr.town || addr.village || addr.municipality || addr.suburb || addr.neighbourhood || addr.hamlet || geoData.city;
            geoData.region = addr.state || geoData.region;
            geoData.country = addr.country || geoData.country;
            geoData.country_code = addr.country_code ? addr.country_code.toUpperCase() : geoData.country_code;
          }
        }
      } catch {
        // Reverse geocoding failed, fall back to the IP-based city name
      }
    }
    
    // Store everything in Supabase
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
        screen_width: screenWidth,
        screen_height: screenHeight,
        language,
        timezone,
        platform,
        connection_type: connectionType,
        gps_accuracy: gpsAccuracy,
        is_vpn: geoData.is_vpn,
        is_proxy: geoData.is_proxy,
        is_tor: geoData.is_tor,
        ip_type: geoData.ip_type,
        location_source: locationSource,
      });
    }
    
    return NextResponse.json(
      { success: true },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch {
    return NextResponse.json({ success: true });
  }
}
