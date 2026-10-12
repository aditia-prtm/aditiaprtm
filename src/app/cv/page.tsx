import type { Metadata } from 'next';
import CvSection from '@/features/cv/CvSection';

export const metadata: Metadata = {
  title: 'Curriculum Vitae | Aditia Pratama',
  description:
    'Curriculum Vitae and professional summary of M. Aditia Putra Pratama – Informatics Engineering student & Developer.',
  openGraph: {
    title: 'Curriculum Vitae | Aditia Pratama',
    description:
      'Curriculum Vitae and professional summary of M. Aditia Putra Pratama – Informatics Engineering student & Developer.',
    type: 'website',
  },
};

export default function CvPage() {
  return <CvSection />;
}
