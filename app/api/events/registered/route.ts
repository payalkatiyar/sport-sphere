import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET() {
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

    const registeredEvents = await prisma.participants.findMany({
      where: {
        user_id: user.user_id
      },
      include: {
        events: {
          select: {
            event_id: true,
            event_name: true,
            event_type: true,
            date: true,
            status: true
          }
        }
      }
    })

    const formattedEvents = registeredEvents.map(participant => ({
      event_id: participant.events.event_id,
      event_name: participant.events.event_name,
      event_type: participant.events.event_type,
      date: participant.events.date,
      status: participant.status
    }))

    return NextResponse.json(formattedEvents)
  } catch (error) {
    console.error('Error fetching registered events:', error)
    return NextResponse.json(
      { message: 'Failed to fetch registered events' },
      { status: 500 }
    )
  }
} 