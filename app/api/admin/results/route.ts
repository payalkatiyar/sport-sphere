import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const results = await prisma.results.findMany({
      include: {
        events: { select: { event_name: true, date: true, location: true } },
        participants: { select: { user_id: true, team_name: true } }
      }
    })
    const formatted = results.map(r => ({
      event_name: r.events.event_name,
      date: r.events.date,
      location: r.events.location,
      user_id: r.participants.user_id,
      team_name: r.participants.team_name,
      score: r.score,
      rank: r.rank,
      winner_status: r.winner_status
    }))
    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
} 