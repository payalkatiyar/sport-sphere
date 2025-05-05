import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Only protect create event route
  if (request.nextUrl.pathname === '/events/create') {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    const user = await prisma.users.findUnique({
      where: {
        email: session.user?.email
      },
      select: {
        user_type: true
      }
    })
    
    if (user?.user_type !== 'Organizer') {
      return NextResponse.redirect(new URL('/events', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/events/create']
} 