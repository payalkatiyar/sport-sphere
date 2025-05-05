import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 200 });

  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
    select: { user_id: true }
  });
  if (!user) return NextResponse.json([], { status: 200 });

  const results = await prisma.results.findMany({
    where: { participants: { user_id: user.user_id } },
    include: {
      events: { select: { event_name: true, date: true, location: true } },
      participants: { select: { team_name: true } }
    }
  });

  const formatted = results.map(r => ({
    event_name: r.events.event_name,
    date: r.events.date,
    location: r.events.location,
    team_name: r.participants.team_name,
    score: r.score,
    rank: r.rank,
    winner_status: r.winner_status
  }));

  return NextResponse.json(formatted);
} 