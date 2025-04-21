'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Smartphone, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function ConnectionPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // 👈 Novo estado
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // 🔎 Verifica se já há conexão salva no backend
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/app/connection');
        if (res.ok) {
          setIsConnected(true);
        } else if (res.status === 404) {
          setIsConnected(false);
        } else {
          console.error('Erro inesperado ao buscar conexão:', res.status);
        }
      } catch (err) {
        console.error('Erro ao verificar conexão:', err);
      } finally {
        setInitialLoading(false); // ✅ fim da checagem
      }
    };

    checkConnection();
  }, []);

  // 📡 Estabelece conexão via websocket para escanear QRCode
  useEffect(() => {
    if (!open) return;

    const session_id = uuidv4();
    setSessionId(session_id);
    setLoading(true);

    const socketInstance = io('ws://201.54.12.58:3001/sessions', {
      transports: ['websocket'],
      rejectUnauthorized: false,
    });

    socketInstance.on('connect', () => {
      console.log('✅ Conectado no WS');
      socketInstance.emit('load-session', {
        session_id,
        notify_webhooks: [`${process.env.NEXT_PUBLIC_BASE_NEXT_URL}/api/app/connection/webhook`],
      });
    });

    socketInstance.on('whatsapp.qrcode', ({ qr }) => {
      setQrCode(qr);
      setLoading(false);
    });

    socketInstance.on('whatsapp.connected', async ({ phone_number }) => {
      console.log('📱 Conectado no WhatsApp com o número', phone_number);

      try {
        const res = await fetch('/api/app/connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: session_id, phone: phone_number }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error('❌ Erro ao criar conexão:', err);
          return;
        }

        setIsConnected(true);
        setOpen(false);
        socketInstance.disconnect();
      } catch (err) {
        console.error('❌ Erro ao salvar conexão:', err);
      }
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ connect_error', err);
    });

    socketInstance.on('disconnect', () => {
      console.log('🔌 Socket desconectado');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [open]);

  // ⏳ Carregando enquanto verifica conexão
  if (initialLoading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-full text-center">
        <Loader2 className="animate-spin text-[#25D366] mb-4" />
        <p className="text-[#AEBAC1]">Verificando conexão com o WhatsApp...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-full text-center">
      {isConnected ? (
        <>
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">WhatsApp conectado ✅</h1>
          <p className="text-[#AEBAC1]">Sua conta já está ativa e integrada à Zapwise.</p>
        </>
      ) : (
        <>
          <Smartphone className="w-12 h-12 text-[#25D366] mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Você ainda não conectou seu WhatsApp</h1>
          <p className="text-[#AEBAC1] mb-6">
            Para começar a usar a Zapwise, conecte sua conta de WhatsApp ao sistema.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#25D366] hover:bg-[#20bd59] text-white font-medium cursor-pointer">
                Conectar agora
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111B21] border-[#2A3942] text-white">
              <DialogHeader>
                <DialogTitle>Leia o QR Code com seu WhatsApp</DialogTitle>
                <DialogDescription className="text-[#AEBAC1]">
                  Use a câmera do seu WhatsApp para escanear o código e conectar sua conta à Zapwise.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center justify-center mt-4 min-h-[200px]">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-[#25D366]" />
                    <span className="text-sm text-[#AEBAC1]">Gerando QR Code...</span>
                  </div>
                ) : qrCode ? (
                  <QRCodeSVG value={qrCode} size={200} />
                ) : (
                  <div className="text-sm text-[#AEBAC1]">Aguardando QR Code...</div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
