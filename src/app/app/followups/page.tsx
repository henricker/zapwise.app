'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CalendarClock,
  CheckCircle,
  CircleOff,
  ChevronLeft,
  ChevronRight,
  Info,
  User
} from 'lucide-react';
import { faker } from '@faker-js/faker';

const PER_PAGE = 4;

const generateFakeFollowups = (page: number, perPage = 10) => {
  const total = 35;
  const all = Array.from({ length: total }).map((_, i) => {
    const status = i % 4 === 0
      ? 'pending'
      : i % 4 === 1
      ? 'active'
      : i % 4 === 2
      ? 'lost'
      : 'done';

    const substatus =
      status === 'active'
        ? i % 2 === 0
          ? 'awaiting_payment'
          : 'negotiating'
        : status === 'pending'
        ? i % 2 === 0
          ? 'waiting_response_from_seller'
          : 'follow_up_required'
        : status === 'lost'
        ? i % 2 === 0
          ? 'inactive_7d'
          : 'ghosted'
        : 'delivered_and_satisfied';

    const last_message =
      substatus === 'awaiting_payment'
        ? 'Segue o link do Pix...'
        : substatus === 'negotiating'
        ? 'E se eu levar dois, tem desconto?'
        : substatus === 'waiting_response_from_seller'
        ? 'Tem na cor azul?'
        : substatus === 'follow_up_required'
        ? '...'
        : substatus === 'inactive_7d'
        ? 'A pessoa parou de responder 😞'
        : substatus === 'ghosted'
        ? 'Acho que não vou querer mais...'
        : 'Produto chegou certinho, obrigado!';

    const last_message_from_me = substatus === 'follow_up_required' || substatus === 'awaiting_payment';

    return {
      id: `${i + 1}`,
      name: faker.person.fullName(),
      last_message,
      last_interaction_minutes_ago: Math.floor(Math.random() * 10000),
      status,
      substatus,
      last_message_from_me,
      avatar: Math.random() > 0.5 ? faker.image.avatar() : null,
    };
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    data: all.slice(start, end),
    metadata: {
      page,
      total,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
    },
  };
};


const statusMap = {
  active: {
    label: 'Ativo',
    color: 'bg-green-600',
    icon: <CheckCircle className="h-4 w-4 text-green-300" />,
  },
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-600',
    icon: <CalendarClock className="h-4 w-4 text-yellow-300" />,
  },
  lost: {
    label: 'Perdido',
    color: 'bg-red-600',
    icon: <CircleOff className="h-4 w-4 text-red-300" />,
  },
  done: {
    label: 'Finalizado',
    color: 'bg-blue-600',
    icon: <CheckCircle className="h-4 w-4 text-blue-300" />,
  },
};


const substatusMap: Record<string, { label: string; description: string }> = {
  awaiting_payment: {
    label: 'Aguardando pagamento',
    description: 'Cliente confirmou interesse mas ainda não pagou.',
  },
  negotiating: {
    label: 'Negociação',
    description: 'Cliente está conversando sobre condições, preços ou produtos.',
  },
  waiting_response_from_seller: {
    label: 'Esperando sua resposta',
    description: 'Cliente enviou a última mensagem. Aguarda sua resposta.',
  },
  follow_up_required: {
    label: 'Aguardando retorno do cliente',
    description: 'Você respondeu, mas o cliente não voltou.',
  },
  inactive_7d: {
    label: 'Inativo há dias',
    description: 'A conversa está parada há mais de uma semana.',
  },
  ghosted: {
    label: 'Cliente sumiu',
    description: 'Cliente não respondeu depois de mostrar interesse.',
  },
  delivered_and_satisfied: {
    label: 'Entregue e satisfeito',
    description: 'Cliente recebeu o produto e está satisfeito.',
  },
};


export default function FollowupsPage() {
  const [page, setPage] = useState(1);
  const [followups, setFollowups] = useState<any[]>([]);
  const [metadata, setMetadata] = useState({
    page: 1,
    total: 0,
    per_page: PER_PAGE,
    total_pages: 1,
  });

  useEffect(() => {
    const { data, metadata } = generateFakeFollowups(page, PER_PAGE);
    setFollowups(data);
    setMetadata(metadata);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-3">
      {followups.map((conv) => {
        const status = statusMap[conv.status as keyof typeof statusMap];
        const sub = substatusMap[conv.substatus];

        return (
<div
  key={conv.id}
  className="bg-[#1E2A32] border border-[#2A3942] rounded-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
>
  <div className="flex items-start gap-4">
    {conv.avatar ? (
      <img
        src={conv.avatar}
        alt={conv.name}
        className="w-10 h-10 rounded-full border border-[#2A3942] object-cover"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-[#2A3942] text-[#AEBAC1] flex items-center justify-center border border-[#2A3942]">
        <User className="w-5 h-5" />
      </div>
    )}

    <div>
      <p className="text-lg font-medium text-white">{conv.name}</p>
      <p className="text-sm text-[#AEBAC1] mt-0.5">
        {conv.last_message_from_me ? 'Você: ' : ''}
        {conv.last_message}
      </p>
      <p className="text-xs text-[#AEBAC1] mt-1">
        Última interação há {formatMinutesAgo(conv.last_interaction_minutes_ago)}
      </p>

      {sub && (
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-[#2A3942] text-[#D1D7DB] text-xs font-normal">
            <Info className="w-3 h-3 mr-1" />
            {sub.label}
          </Badge>
          <span className="text-xs text-[#AEBAC1]">{sub.description}</span>
        </div>
      )}
    </div>
  </div>

  <div className="flex items-center gap-3 mt-4 md:mt-0">
    <Badge className={`${status.color} text-white flex items-center gap-1`}>
      {status.icon}
      {status.label}
    </Badge>
    <Button
      size="sm"
      className="bg-[#2A3942] hover:bg-[#32444d] text-[#D1D7DB] border border-[#2A3942]"
    >
      Marcar como resolvido
    </Button>
  </div>
</div>

        );
      })}

      {/* Paginação */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        <p className="text-sm text-[#AEBAC1]">
          Página {metadata.page} de {metadata.total_pages}
        </p>

        <Button
          variant="ghost"
          size="sm"
          disabled={page === metadata.total_pages}
          onClick={() => setPage((prev) => Math.min(prev + 1, metadata.total_pages))}
        >
          Próxima
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

function formatMinutesAgo(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
