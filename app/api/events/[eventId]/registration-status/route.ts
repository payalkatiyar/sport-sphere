import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { user_id: true }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const registration = await prisma.participants.findFirst({
      where: {
        user_id: user.user_id,
        event_id: params.eventId
      }
    })

    return NextResponse.json({
      isRegistered: !!registration,
      status: registration?.status || null
    })
  } catch (error) {
    console.error('Error checking registration status:', error)
    return NextResponse.json(
      { message: 'Failed to check registration status' },
      { status: 500 }
    )
  }
} 