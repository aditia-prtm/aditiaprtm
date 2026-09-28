import type { Metadata } from 'next';
import Experience from '@/sections/Experience';

export const metadata: Metadata = {
  title: 'Experience & Education | Aditia Pratama',
  description:
    'Career milestones, academic background, and organizational experience of Aditia Pratama.',
};

export default function ExperiencePage() {
  return <Experience />;
}
