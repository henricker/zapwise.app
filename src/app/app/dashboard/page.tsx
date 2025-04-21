import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, MessageSquare, Zap, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect('/login');

  const today = format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{getGreeting()}, {session.user.name?.split(' ')[0] || 'usuário'} 👋</h1>
            <p className="text-sm mt-1 text-[#AEBAC1]">Hoje é {today}</p>
          </div>
          <CalendarDays className="h-6 w-6 text-[#AEBAC1]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Conversas totais" value="128" icon={<MessageSquare className="h-5 w-5 text-[#25D366]" />} />
          <MetricCard title="Pendentes" value="12" icon={<Zap className="h-5 w-5 text-yellow-500" />} />
          <MetricCard title="Taxa de resposta" value="87%" icon={<MessageSquare className="h-5 w-5 text-green-400" />} />
          <MetricCard title="Clientes perdidos" value="5" icon={<UserX className="h-5 w-5 text-red-500" />} />
        </div>

        {/* Placeholder gráfico */}
        <div className="bg-[#1E2A32] p-6 rounded border border-[#2A3942] flex items-center justify-center min-h-[200px] text-[#AEBAC1] text-sm">
          📈 Evolução semanal será exibida aqui em breve.
        </div>

        {/* Ação principal */}
        <div className="flex justify-end">
          <Button
            className="bg-[#25D366] hover:bg-[#20bd59] text-white font-medium"
          >
            + Nova conversa manual
          </Button>
        </div>
      </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#1E2A32] p-4 rounded border border-[#2A3942] text-[#D1D7DB]">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm text-[#AEBAC1]">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
