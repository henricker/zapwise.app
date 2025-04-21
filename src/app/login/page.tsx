'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      toast.success('Login realizado com sucesso!');
      router.push('/app/dashboard'); // Redireciona para o dashboard (ou página inicial)
    } else {
      toast.error('Email ou senha incorretos');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>

        <div className="space-y-4">
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

        <Button className="mt-6 w-full" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4 mx-auto" />
          ) : (
            'Entrar'
          )}
        </Button>
      </div>
    </div>
  );
}
