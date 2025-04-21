import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const connection = await prisma.connection.findFirst({
    where: { userId: session.user.id },
  })

  if (!connection) {
    return NextResponse.json({ message: 'Sem conexão com whatsapp' }, { status: 404 })
  }

  return NextResponse.json({ connection })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const body = await req.json()
  const { sessionId, phone } = body

  if (!sessionId || !phone) {
    return NextResponse.json(
      { error: 'sessionId e phone são obrigatórios' },
      { status: 400 }
    )
  }

  const created = await prisma.connection.create({
    data: {
      userId: session.user.id,
      sessionId,
      phone,
    },
  })

  return NextResponse.json({ connection: created }, { status: 201 })
}
