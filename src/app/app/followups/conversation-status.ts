export type ConversationStatus = 'active' | 'pending' | 'lost' | 'done';

export type Substatus =
  | 'awaiting_payment'
  | 'negotiating'
  | 'waiting_response_from_seller'
  | 'follow_up_required'
  | 'inactive_7d'
  | 'ghosted'
  | 'delivered_and_satisfied';

export const ConversationStatusMap: Record<ConversationStatus, {
  label: string;
  substatuses: {
    key: Substatus;
    label: string;
    description: string;
    action_hint: string;
  }[];
}> = {
  active: {
    label: 'Ativo',
    substatuses: [
      {
        key: 'awaiting_payment',
        label: 'Aguardando pagamento',
        description: 'Cliente demonstrou intenção de compra, mas ainda não pagou.',
        action_hint: 'Acompanhar confirmação ou enviar lembrete.',
      },
      {
        key: 'negotiating',
        label: 'Negociação em andamento',
        description: 'Conversas com trocas recentes entre cliente e vendedor.',
        action_hint: 'Continuar o atendimento e tentar converter.',
      },
    ],
  },

  pending: {
    label: 'Pendente',
    substatuses: [
      {
        key: 'waiting_response_from_seller',
        label: 'Aguardando resposta do vendedor',
        description: 'Cliente enviou mensagem e está esperando retorno.',
        action_hint: 'Responder o cliente o quanto antes.',
      },
      {
        key: 'follow_up_required',
        label: 'Acompanhamento necessário',
        description: 'Vendedor já respondeu, mas o cliente não voltou.',
        action_hint: 'Enviar mensagem de follow-up para tentar reativar.',
      },
    ],
  },

  lost: {
    label: 'Perdido',
    substatuses: [
      {
        key: 'inactive_7d',
        label: 'Inativo há 7+ dias',
        description: 'Conversa parada sem interação recente.',
        action_hint: 'Considerar como lead frio.',
      },
      {
        key: 'ghosted',
        label: 'Cliente não respondeu',
        description: 'Cliente parou de responder após interesse inicial.',
        action_hint: 'Avaliar se vale nova tentativa ou marcar como perdido.',
      },
    ],
  },

  done: {
    label: 'Finalizado',
    substatuses: [
      {
        key: 'delivered_and_satisfied',
        label: 'Entregue e satisfeito',
        description: 'Cliente recebeu o produto e não há mais ações pendentes.',
        action_hint: 'Registrar como venda concluída com sucesso.',
      },
    ],
  },
};
