import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    console.log('Fetching event with ID:', params.eventId)

    // Get event details
    const event = await prisma.events.findUnique({
      where: { event_id: params.eventId },
      select: {
        event_id: true,
        event_name: true,
        event_type: true,
        event_category: true,
        date: true,
        location: true,
        status: true,
        organizer_id: true
      }
    })

    console.log('Found event:', event)

    if (!event) {
      console.log('Event not found')
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Detailed error fetching event:', error)
    return NextResponse.json(
      { message: 'Failed to fetch event', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 