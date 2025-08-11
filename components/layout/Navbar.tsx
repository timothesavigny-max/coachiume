'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const links = [
  { href: '/', label: 'Accueil' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/programme', label: 'Programme' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/suivi', label: 'Suivi' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
];
export default function Navbar(){
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Coachium" width={120} height={40} className="drop-shadow-logo-red" />
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`text-sm ${pathname===l.href? 'text-white' : 'text-white/70 hover:text-white'} transition`}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
