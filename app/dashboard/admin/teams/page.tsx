"use client"
import { useEffect, useState } from "react"

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/teams")
        const data = await res.json()
        setTeams(data)
      } catch {
        setTeams([])
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Teams</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Team Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t: any) => (
              <tr key={t.team_id} className="border-t">
                <td className="p-2">{t.team_name}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 