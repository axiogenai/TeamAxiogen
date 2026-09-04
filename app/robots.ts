import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/private/', '/_next/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Googlebot',
          'Bingbot',
          'Applebot',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://team.axiogen.in/sitemap.xml',
    host: 'https://team.axiogen.in',
  };
}
