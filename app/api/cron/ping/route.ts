import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request: Request) {
  // Verify Vercel Cron header if CRON_SECRET is configured
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Supabase client not initialized' },
      { status: 500 }
    );
  }

  try {
    // 1. Fetch all projects from Supabase (this keeps the database active)
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !projects) {
      return NextResponse.json(
        { success: false, error: error?.message || 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // 2. Sync the fetched projects to GitHub if GITHUB_TOKEN is available
    const token = process.env.GITHUB_TOKEN;
    let gitSyncStatus = 'skipped (no token)';

    if (token) {
      const formattedProjects = projects.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        year: p.year,
        desc: p.desc,
        tech: Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || '[]'),
        link: p.link || undefined,
        display_order: p.display_order,
        hidden: p.hidden || false
      }));

      const content = JSON.stringify(formattedProjects, null, 2);
      const contentBuffer = Buffer.from(content).toString('base64');

      const owner = 'axiogenai';
      const repo = 'TeamAxiogen';
      const path = 'public/projects.json';

      let sha = '';
      const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      
      const getRes = await fetch(getFileUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'Axiogen-Portfolio-Sync'
        }
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      const updateRes = await fetch(getFileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'Axiogen-Portfolio-Sync',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'sync: daily update projects.json from database cron',
          content: contentBuffer,
          sha: sha || undefined,
          branch: 'main'
        })
      });

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        console.error('Failed to update projects.json on GitHub:', errData);
        gitSyncStatus = `failed: ${JSON.stringify(errData)}`;
      } else {
        gitSyncStatus = 'success';
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase ping and GitHub sync complete',
      count: projects.length,
      gitSync: gitSyncStatus
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
