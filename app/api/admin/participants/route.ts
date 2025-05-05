import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const participants = await prisma.participants.findMany()
    return NextResponse.json(participants)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
} 