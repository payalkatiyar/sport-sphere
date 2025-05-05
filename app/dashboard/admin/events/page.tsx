"use client"
import { useEffect, useState } from "react"

export default function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/events")
        const data = await res.json()
        setEvents(data)
      } catch {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Events</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Event ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Organizer ID</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e: any) => (
              <tr key={e.event_id} className="border-t">
                <td className="p-2">{e.event_id}</td>
                <td className="p-2">{e.event_name}</td>
                <td className="p-2">{e.event_type}</td>
                <td className="p-2">{new Date(e.date).toLocaleDateString()}</td>
                <td className="p-2">{e.location}</td>
                <td className="p-2">{e.status}</td>
                <td className="p-2">{e.organizer_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 