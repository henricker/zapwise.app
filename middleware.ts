import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Se não estiver logado, redireciona pro login
  if (!token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/app/dashboard/:path*',
      '/app/followups/:path*',
      '/app/connection/:path*',
      // adicione mais rotas privadas aqui
    ],
};