"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, Clock, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Event {
  event_id: string
  event_name: string
  event_type: string
  event_category: string
  date: string
  location: string
  status: string
  description?: string
  organizer: {
    name: string
    email: string
  }
  participant_count: number
  time: string
}

export default function EventDetailsPage({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Check authentication
        const authResponse = await fetch("/api/auth/session")
        const authData = await authResponse.json()
        setIsAuthenticated(authResponse.ok)

        // Fetch event details
        const [eventResponse, registrationResponse] = await Promise.all([
          fetch(`/api/events/${params.eventId}`),
          fetch(`/api/events/${params.eventId}/registration-status`)
        ])

        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event details")
        }

        const eventData = await eventResponse.json()
        setEvent(eventData)

        // Check if user is registered
        if (authResponse.ok) {
          if (registrationResponse.ok) {
            const registrationData = await registrationResponse.json()
            setIsRegistered(registrationData.isRegistered)
          }
        }
      } catch (error) {
        console.error('Error fetching event details:', error)
        toast.error('Failed to load event details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventDetails()
  }, [params.eventId, toast])

  const handleRegister = async () => {
    setIsRegistering(true)
    if (!isAuthenticated) {
      toast.error("Authentication Required: Please log in to register for this event")
      router.push("/login")
      return
    }

    try {
      const response = await fetch(`/api/events/${params.eventId}/register`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to register for event")
      }

      toast.success("Successfully registered for the event!")
      setIsRegistered(true)
    } catch (error) {
      console.error('Error registering for event:', error)
      toast.error(error instanceof Error ? error.message : "Failed to register for event")
    } finally {
      setIsRegistering(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-lg">Event not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{event.event_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Type: {event.event_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">Category: {event.event_category} Event</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Date: {new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Time: {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Location: {event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">Participants: {event.participant_count}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
            {event.status === 'Upcoming' && !isRegistered && (
              <div className="mt-6">
                <Button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="w-full"
                >
                  {isRegistering ? 'Registering...' : 'Register for Event'}
                </Button>
              </div>
            )}
            {isRegistered && (
              <div className="mt-6">
                <Button variant="outline" className="w-full" disabled>
                  Already Registered
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 