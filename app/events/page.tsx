import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, Clock } from "lucide-react"
import { getEvents, isUserOrganizer } from "./actions"
import Link from "next/link"
import { format } from "date-fns"

export default async function EventsPage() {
  const events = await getEvents()
  const isOrganizer = await isUserOrganizer()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        {isOrganizer && (
          <Link href="/events/create">
            <Button>Create New Event</Button>
          </Link>
        )}
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">No Events Found</h2>
          <p className="text-gray-500 mt-2">There are no upcoming events at the moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.event_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.event_type}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    event.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                    event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                  <Link href="/login">
                    <Button>Login to Register</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 