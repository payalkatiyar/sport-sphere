"use client"
import { useEffect, useState } from "react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/users")
        const data = await res.json()
        setUsers(data)
      } catch {
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">User Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.user_id} className="border-t">
                <td className="p-2">{u.user_id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.user_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 