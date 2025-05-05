"use client"
import { useSession } from "next-auth/react"
import { UserCircle } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user
  const userImage = (user as any)?.image // fallback for missing type

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {userImage ? (
        <img
          src={userImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4 border"
        />
      ) : (
        <UserCircle className="w-24 h-24 text-gray-400 mb-4" />
      )}
      <h2 className="text-2xl font-bold mb-2">{user?.name || "User"}</h2>
      <div className="text-gray-600 text-lg">{user?.userType || "User"}</div>
    </div>
  )
}
