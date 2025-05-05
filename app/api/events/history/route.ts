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

    const eventHistory = await prisma.results.findMany({
      where: {
        participant_id: user.user_id
      },
      include: {
        events: {
          select: {
            event_id: true,
            event_name: true,
            event_type: true,
            date: true
          }
        }
      }
    })

    const formattedHistory = eventHistory.map(result => ({
      event_id: result.events.event_id,
      event_name: result.events.event_name,
      event_type: result.events.event_type,
      date: result.events.date,
      score: result.score,
      rank: result.rank,
      winner_status: result.winner_status
    }))

    return NextResponse.json(formattedHistory)
  } catch (error) {
    console.error('Error fetching event history:', error)
    return NextResponse.json(
      { message: 'Failed to fetch event history' },
      { status: 500 }
    )
  }
} 