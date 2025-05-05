import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 });
    }
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { user_id: true }
    });
    if (!user) {
      return NextResponse.json([], { status: 200 });
    }
    const participations = await prisma.participants.findMany({
  where: {
    user_id: user.user_id,
    AND: [
      { team_name: { not: null } },
      { team_name: { not: "" } }
    ]
  },
  include: {
    events: {
      select: {
        event_name: true,
        location: true,
        date: true,
      },
    },
  },
});

    const result = participations.map(p => ({
      event_name: p.events.event_name,
      location: p.events.location,
      date: p.events.date,
      team_name: p.team_name,
    }));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
} 