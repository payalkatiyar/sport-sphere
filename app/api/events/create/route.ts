import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { event_id, event_name, event_type, event_category, date, location, status } = await req.json()
    if (!event_id || !event_name || !event_type || !event_category || !date || !location || !status) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 })
    }

    // Find organizer's user_id
    const organizer = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { user_id: true }
    })
    if (!organizer) {
      return NextResponse.json({ message: 'Organizer not found.' }, { status: 404 })
    }

    
    const event = await prisma.events.create({
      data: {
        event_id,
        event_name,
        event_type,
        event_category,
        date: new Date(date),
        location,
        status,
        organizer_id: organizer.user_id,
      },
    })

    return NextResponse.json({ message: 'Event created successfully!', event })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json({ message: 'Failed to create event.' }, { status: 500 })
  }
} 