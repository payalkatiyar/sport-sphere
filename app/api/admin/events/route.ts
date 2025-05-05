import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.events.findMany()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
} 