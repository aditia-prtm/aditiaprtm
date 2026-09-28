import type { Metadata } from 'next';
import Contact from '@/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact | Aditia Pratama',
  description:
    'Get in touch with Aditia Pratama for collaboration, freelance opportunities, or technical inquiries.',
};

export default function ContactPage() {
  return <Contact />;
}
