import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const eventId = params.eventId
    // Find the organizer's user_id
    const organizer = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { user_id: true }
    })
    if (!organizer) {
      return NextResponse.json({ message: 'Organizer not found' }, { status: 404 })
    }

    // Check if the event belongs to this organizer
    const event = await prisma.events.findUnique({
      where: { event_id: eventId },
      select: { organizer_id: true }
    })
    if (!event || event.organizer_id !== organizer.user_id) {
      return NextResponse.json({ message: 'You can only delete your own events.' }, { status: 403 })
    }

    // Delete related participants
    await prisma.participants.deleteMany({ where: { event_id: eventId } })
    // TODO: Delete from other related tables if needed (e.g., results)
    // Delete the event
    await prisma.events.delete({ where: { event_id: eventId } })

    return NextResponse.json({ message: 'Event deleted successfully.' })
  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json({ message: 'Failed to delete event.' }, { status: 500 })
  }
} 