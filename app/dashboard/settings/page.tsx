"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const user = session?.user
  const [name, setName] = useState(user?.name || "")
  const [image, setImage] = useState((user as any)?.image || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, image }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to update profile")
      toast.success("Profile updated!")
      await update({ name, image })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">Profile Picture URL</label>
          <Input
            name="image"
            placeholder="Paste image URL or leave blank for default"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <Input
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
} 