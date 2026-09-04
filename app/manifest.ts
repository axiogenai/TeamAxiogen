import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Team Axiogen — Systems Engineering & AI Studio',
    short_name: 'Team Axiogen',
    description: 'Bespoke Full-Stack Web Applications, Autonomous AI Models, ClinicOS Healthcare Platforms, and Resilient Cloud Infrastructure. Founded by Aditya Patil & Aditya Minchekar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07070c',
    theme_color: '#07070c',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
