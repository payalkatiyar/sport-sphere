import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const currentDate = new Date()
    
    const upcomingEvents = await prisma.events.findMany({
      where: {
        date: {
          gte: currentDate
        },
        status: 'Upcoming'
      },
      select: {
        event_id: true,
        event_name: true,
        event_type: true,
        date: true,
        location: true,
        status: true
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json(upcomingEvents)
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return NextResponse.json(
      { message: 'Failed to fetch upcoming events' },
      { status: 500 }
    )
  }
} 