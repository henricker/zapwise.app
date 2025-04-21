// /app/api/app/connection/webhook/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()

  if (body.event !== 'new_message') {
    return NextResponse.json({ error: 'Evento não suportado' }, { status: 400 })
  }

  const {
    my_phone,
    message,
    contact,
    phone,
    from_me
  } = body.data

  const connection = await prisma.connection.findFirst({
    where: { phone: my_phone }
  })

  if (!connection) {
    return NextResponse.json({ error: 'Conexão não encontrada' }, { status: 404 })
  }

  // 2. Buscar ou criar conversa
  let conversation = await prisma.conversation.findFirst({
    where: {
      phone: phone,
      myPhone: my_phone,
      userId: connection.userId
    }
  })

  if (conversation) {
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date(message.timestamp) }
    })
  }
  else {
    conversation = await prisma.conversation.create({
      data: {
        phone: phone,
        myPhone: my_phone,
        updatedAt: new Date(message.timestamp),
        userId: connection.userId,
        contactName: contact.name
      }
    })
  }

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      fromMe: from_me,
      text: message.value,
      type: message.type,
      timestamp: new Date(message.timestamp),
    }
  })

  // Agendar analise de followup por IA

  return NextResponse.json({ success: true })
}
