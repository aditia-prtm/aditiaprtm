import type { Metadata } from 'next';
import Certifications from '@/sections/Certifications';

export const metadata: Metadata = {
  title: 'Certifications & Awards | Aditia Pratama',
  description:
    'Verified certifications, awards, and competitive programming achievements by Aditia Pratama.',
};

export default function CertificationsPage() {
  return <Certifications />;
}
