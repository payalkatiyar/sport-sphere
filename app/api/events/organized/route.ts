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

    const organizedEvents = await prisma.events.findMany({
      where: {
        organizer_id: user.user_id
      },
      select: {
        event_id: true,
        event_name: true,
        event_type: true,
        date: true,
        location: true,
        status: true,
        _count: {
          select: {
            participants: true,
            results: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    const formattedEvents = organizedEvents.map(event => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_type: event.event_type,
      date: event.date,
      location: event.location,
      status: event.status,
      participant_count: event._count.participants,
      results_count: event._count.results
    }))

    return NextResponse.json(formattedEvents)
  } catch (error) {
    console.error('Error fetching organized events:', error)
    return NextResponse.json(
      { message: 'Failed to fetch organized events' },
      { status: 500 }
    )
  }
} 