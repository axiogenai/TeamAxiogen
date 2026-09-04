import { NextResponse } from 'next/server';

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
	<user>621B3825D10663EF47942F6661B27080</user>
</users>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
