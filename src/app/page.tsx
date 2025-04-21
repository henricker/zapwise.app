'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, MessageCircleCode, Zap, Smartphone } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-[#111B21] text-[#D1D7DB] min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Transforme seu WhatsApp em uma máquina de vendas com IA
        </h1>
        <p className="text-lg md:text-xl text-[#AEBAC1] max-w-2xl mb-8">
          A Zapwise ajuda pequenos vendedores a não perderem mais vendas por falta de follow-up ou respostas lentas. Inteligência que entende e classifica cada conversa.
        </p>
        <Button className="bg-[#25D366] hover:bg-[#20bd59] text-white text-lg px-6 py-4 rounded-md font-semibold">
          Comece agora, é grátis
        </Button>
      </section>

      {/* Features */}
      <section className="bg-[#1E2A32] py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Smartphone className="mx-auto h-10 w-10 text-[#25D366]" />
            <h3 className="text-xl font-semibold mt-4 text-white">Conecte seu WhatsApp</h3>
            <p className="text-[#AEBAC1] mt-2">A Zapwise se integra ao seu número e começa a escutar as conversas com seus clientes.</p>
          </div>
          <div>
            <MessageCircleCode className="mx-auto h-10 w-10 text-[#25D366]" />
            <h3 className="text-xl font-semibold mt-4 text-white">Classificação com IA</h3>
            <p className="text-[#AEBAC1] mt-2">Entendemos o contexto da conversa e categorizamos automaticamente: ativo, pendente, perdido...</p>
          </div>
          <div>
            <Zap className="mx-auto h-10 w-10 text-[#25D366]" />
            <h3 className="text-xl font-semibold mt-4 text-white">Ações inteligentes</h3>
            <p className="text-[#AEBAC1] mt-2">Sugestões de follow-up, lembretes de pagamento e muito mais — com um clique.</p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Como funciona?</h2>
          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4 justify-center">
              <CheckCircle className="text-[#25D366]" />
              <span className="text-lg text-[#AEBAC1]">1. Escaneie o QR Code e conecte seu WhatsApp</span>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <CheckCircle className="text-[#25D366]" />
              <span className="text-lg text-[#AEBAC1]">2. Deixe a IA acompanhar e classificar cada conversa</span>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <CheckCircle className="text-[#25D366]" />
              <span className="text-lg text-[#AEBAC1]">3. Aja com agilidade e feche mais vendas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2A32] py-6 text-center text-sm text-[#AEBAC1]">
        Zapwise © {new Date().getFullYear()} – Todos os direitos reservados
      </footer>
    </div>
  )
}
