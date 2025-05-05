'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function getEvents() {
  try {
    console.log('Fetching events...')
    const events = await prisma.events.findMany({
      select: {
        event_id: true,
        event_name: true,
        event_type: true,
        event_category: true,
        date: true,
        location: true,
        status: true
      }
    })
    
    if (!events || events.length === 0) {
      console.log('No events found in the database')
    } else {
      console.log(`Found ${events.length} events:`, events)
    }
    
    return events
  } catch (error) {
    console.error('Detailed error fetching events:', error)
    throw error
  }
}

export async function isUserOrganizer() {
  const session = await getServerSession()
  if (!session?.user?.email) return false

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        user_type: true
      }
    })
    return user?.user_type === 'Organizer'
  } catch (error) {
    console.error('Error checking user type:', error)
    return false
  }
} 