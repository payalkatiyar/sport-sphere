"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Calendar, MapPin, Tag, Users, Trash2 } from "lucide-react"

interface Event {
  event_id: string
  event_name: string
  event_type: string
  event_category: string
  date: string
  location: string
  status: string
  organizer_id: string
  participants: number
}

export default function ManageEventsPage() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/events?mine=1")
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error("Invalid data format")
        setEvents(data)
      } catch (error) {
        toast.error("Failed to load events")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleRemove = async (eventId: string) => {
    if (!confirm("Are you sure you want to remove this event? This cannot be undone.")) return
    setRemoving(eventId)
    try {
      const res = await fetch(`/api/events/${eventId}/delete`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to delete event")
      setEvents(events.filter(e => e.event_id !== eventId))
      toast.success("Event removed successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove event")
    } finally {
      setRemoving(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Manage My Events</h1>
      {loading ? (
        <div>Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">No events found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map(event => (
            <Card key={event.event_id} className="h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{event.event_name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{event.status}</span>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <Tag className="mr-2 h-4 w-4" />
                    {event.event_type}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event.event_category} Event
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event.participants} participants
                  </div>
                </div>
                <Button
                  variant="destructive"
                  disabled={removing === event.event_id}
                  onClick={() => handleRemove(event.event_id)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {removing === event.event_id ? "Removing..." : "Remove"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 