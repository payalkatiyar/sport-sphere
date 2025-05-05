import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user details
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

    // Check if event exists
    const event = await prisma.events.findUnique({
      where: { event_id: params.eventId },
      select: { status: true, event_category: true }
    })

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      )
    }

    if (event.status !== 'Upcoming') {
      return NextResponse.json(
        { message: 'Registration is only available for upcoming events' },
        { status: 400 }
      )
    }

    // Check if user is already registered
    const existingRegistration = await prisma.participants.findFirst({
      where: {
        user_id: user.user_id,
        event_id: params.eventId
      }
    })

    if (existingRegistration) {
      return NextResponse.json(
        { message: 'You are already registered for this event' },
        { status: 400 }
      )
    }

    // For team events, require team_name
    let team_name = null;
    if (event.event_category === 'Team') {
      const body = await request.json();
      team_name = body.team_name;
      if (!team_name) {
        return NextResponse.json(
          { message: 'Team name is required for team events' },
          { status: 400 }
        );
      }
    }

    // Generate participant_id
    const participant_id = `p${Date.now().toString().slice(-9)}`

    // Register user for the event
    await prisma.participants.create({
      data: {
        participant_id,
        user_id: user.user_id,
        event_id: params.eventId,
        status: 'Registered',
        team_name: team_name
      }
    })

    return NextResponse.json(
      { message: 'Successfully registered for the event' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering for event:', error)
    return NextResponse.json(
      { message: 'Failed to register for event' },
      { status: 500 }
    )
  }
} 