import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const teams = await prisma.teams.findMany()
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
} 