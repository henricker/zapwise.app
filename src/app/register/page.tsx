'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { Loader2 } from 'lucide-react';
import { PasswordInput } from '@/components/ui/password-input';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao registrar');
      }

      toast.success('Conta criada com sucesso!');

      setTimeout(() => router.push('/login'), 1000);
    } catch (err: any) {
        toast.error('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
                id="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
            />
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4 mx-auto" />
          ) : (
            'Criar Conta'
          )}
        </Button>
      </div>
    </div>
  );
}
