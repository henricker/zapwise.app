'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Link as LinkIcon
} from 'lucide-react';

const navItems = [
  { href: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/app/followups', label: 'Follow-Ups', icon: <MessageSquare className="h-4 w-4" /> },
  { href: '/app/connection', label: 'Conexão', icon: <LinkIcon className="h-4 w-4" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#111B21] text-[#D1D7DB] border-r border-[#2A3942] hidden md:flex flex-col px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold px-2 mb-6">Zapwise</h1>
      <nav className="space-y-1">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-[#2A3942] text-[#25D366]'
                : 'hover:bg-[#2A3942] hover:text-white'
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
