'use client';

import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header({
  user,
}: {
  user: User;
}) {

const path_name = usePathname()
  return (
    <header className="w-full h-16 bg-[#202C33] border-b border-[#2A3942] text-[#D1D7DB] flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">{getTitle(path_name)}</h2>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-2 text-sm hover:bg-[#2A3942] px-3 py-1.5 rounded transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </header>
  );
}


const pathTitleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/followups': 'Follow-ups',
    '/connection': 'Conexão',
  };
  
function getTitle(path: string) {
    const key = Object.keys(pathTitleMap).find((k) => path.includes(k));
    return pathTitleMap[key ?? ''] || 'Zapwise';
}