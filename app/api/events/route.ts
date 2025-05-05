import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url || '', 'http://localhost')
    const mine = url.searchParams.get('mine')
    let organizerId: string | undefined = undefined

    if (mine === '1') {
      // Only return events for the logged-in organizer
      const session = await getServerSession(authOptions)
      if (!session || !session.user?.email) {
        return NextResponse.json([], { status: 200 })
      }
      const organizer = await prisma.users.findUnique({
        where: { email: session.user.email },
        select: { user_id: true }
      })
      if (!organizer) {
        return NextResponse.json([], { status: 200 })
      }
      organizerId = organizer.user_id
    }

    // Fetch events (all or just for this organizer)
    const events = await prisma.events.findMany({
      where: organizerId ? { organizer_id: organizerId } : undefined,
      select: {
        event_id: true,
        event_name: true,
        event_type: true,
        event_category: true,
        date: true,
        location: true,
        status: true,
        organizer_id: true,
      },
      orderBy: {
        date: 'asc'
      }
    });

    // For each event, count the number of participants
    const eventsWithParticipantCount = await Promise.all(
      events.map(async (event) => {
        const count = await prisma.participants.count({
          where: { event_id: event.event_id }
        });
        return {
          ...event,
          participants: count
        };
      })
    );

    return NextResponse.json(eventsWithParticipantCount);
  } catch (error) {
    console.error('Error in events API route:', error);
    return NextResponse.json(
      { message: 'Failed to fetch events', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
