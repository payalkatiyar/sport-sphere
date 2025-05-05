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
    const { name, image } = await req.json()
    if (!name) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }
    const user = await prisma.users.update({
      where: { email: session.user.email },
      data: { name, image },
    })
    return NextResponse.json({ message: 'Profile updated!', user })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json({ message: 'Failed to update profile.' }, { status: 500 })
  }
} 