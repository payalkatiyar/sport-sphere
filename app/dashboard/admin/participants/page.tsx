"use client"
import { useEffect, useState } from "react"

export default function AdminParticipantsPage() {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/participants")
        const data = await res.json()
        setParticipants(data)
      } catch {
        setParticipants([])
      } finally {
        setLoading(false)
      }
    }
    fetchParticipants()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Participants</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Participant ID</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Event ID</th>
              <th className="p-2">Age</th>
              <th className="p-2">Team Name</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p: any) => (
              <tr key={p.participant_id} className="border-t">
                <td className="p-2">{p.participant_id}</td>
                <td className="p-2">{p.user_id}</td>
                <td className="p-2">{p.event_id}</td>
                <td className="p-2">{p.age}</td>
                <td className="p-2">{p.team_name}</td>
                <td className="p-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 