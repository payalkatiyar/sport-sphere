"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Calendar, Filter, MapPin, Plus, Search, Tag, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const { data: session } = useSession();
  const [registering, setRegistering] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch events')
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server')
        }
        setEvents(data)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || event.event_type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesType
  })

  const eventTypes = [...new Set(events.map((event) => event.event_type))]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Register handler
  const handleRegister = async (event: Event) => {
    if (event.event_category === "Team") {
      // Redirect to team registration page for team events
      window.location.href = `/dashboard/teams/register?eventId=${event.event_id}`;
      return;
    }
    
    setRegistering(event.event_id);
    try {
      const response = await fetch(`/api/events/${event.event_id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Browse and manage sports events.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-[180px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[180px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.event_id} className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{event.event_name}</h3>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
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
                    <div className="flex items-center text-muted-foreground">
                      <span className="mr-2 font-medium">Organizer ID:</span>
                      {event.organizer_id}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    {session?.user?.userType !== "Admin" && (
                      <Button
                        variant="outline"
                        disabled={registering === event.event_id}
                        onClick={() => handleRegister(event)}
                      >
                        {registering === event.event_id ? "Registering..." : "Register"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
