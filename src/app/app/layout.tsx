import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import Providers from './providers';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/login');

  return (
    <div className="flex min-h-screen bg-[#202C33] text-[#D1D7DB]">
      <Sidebar />
      <Providers>
        <div className="flex-1 flex flex-col">
          <Header user={session.user as User} />
          <main className="flex-1 px-4 md:px-6 py-6">{children}</main>
        </div>
      </Providers>
    </div>
  );
}
