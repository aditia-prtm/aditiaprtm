import type { Metadata } from 'next';
import Projects from '@/sections/Projects';

export const metadata: Metadata = {
  title: 'Projects | Aditia Pratama',
  description:
    'Explore featured web applications and engineering projects built by Aditia Pratama.',
};

export default function ProjectsPage() {
  return <Projects />;
}
