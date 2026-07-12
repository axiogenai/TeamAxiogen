import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    // Query all settings in one go
    const { data: settingsRows, error } = await supabase
      .from('settings')
      .select('key, value');

    if (error || !settingsRows) {
      return NextResponse.json({ activeBg: '' });
    }

    const settingsMap = new Map(settingsRows.map((r) => [r.key, r.value]));
    const activeBg = settingsMap.get('active_bg') || '';
    const rotation = settingsMap.get('bg_rotation') || 'off';

    if (rotation === 'hourly' || rotation === 'half-hourly') {
      // List backgrounds from storage bucket
      const { data: files } = await supabase.storage.from('backgrounds').list('');
      const validFiles = (files || [])
        .filter((f) => f.name && f.name !== '.emptyFolderPlaceholder')
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort to ensure index stability

      if (validFiles.length > 0) {
        // Calculate timestamp block
        const blockMs = rotation === 'hourly' ? 60 * 60 * 1000 : 30 * 60 * 1000;
        const blockCount = Math.floor(Date.now() / blockMs);
        const index = blockCount % validFiles.length;
        const selectedFile = validFiles[index];

        const { data: urlData } = supabase.storage
          .from('backgrounds')
          .getPublicUrl(selectedFile.name);

        return NextResponse.json(
          { activeBg: urlData.publicUrl || '' },
          {
            headers: {
              'Cache-Control': 'public, max-age=10, stale-while-revalidate=20',
            },
          }
        );
      }
    }

    return NextResponse.json(
      { activeBg },
      {
        headers: {
          'Cache-Control': 'public, max-age=10, stale-while-revalidate=20',
        },
      }
    );
  } catch {
    return NextResponse.json({ activeBg: '' });
  }
}
