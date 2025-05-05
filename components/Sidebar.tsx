'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trophy, Calendar, Users, Award, Settings, LogOut, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userType: string
}

export function Sidebar({ isOpen, onClose, userType }: SidebarProps) {
  const { data: session } = useSession()

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transform lg:transform-none lg:opacity-100 lg:relative lg:inset-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
        }`}
      >
        <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SportSphere</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
            >
              <Calendar className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            {userType !== 'Organizer' && (
              <Link
                href="/dashboard/events"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
              >
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
            )}

            {userType === 'Organizer' && (
              <>
                <Link
                  href="/dashboard/create-event"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Create Event</span>
                </Link>
                <Link
                  href="/dashboard/manage-events"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Manage Events</span>
                </Link>
              </>
            )}

            {userType === 'Admin' && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Admin</div>
                <Link href="/dashboard/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
                <Link href="/dashboard/admin/events" className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary">
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </Link>
                <Link href="/dashboard/admin/participants" className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary">
                  <Users className="h-5 w-5" />
                  <span>Participants</span>
                </Link>
                <Link href="/dashboard/admin/teams" className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary">
                  <Users className="h-5 w-5" />
                  <span>Teams</span>
                </Link>
                <Link href="/dashboard/admin/results" className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary">
                  <Calendar className="h-5 w-5" />
                  <span>Results</span>
                </Link>
              </>
            )}

            {userType !== 'Admin' && (
              <>
                <Link
                  href="/dashboard/teams"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  <Users className="h-5 w-5" />
                  <span>Teams</span>
                </Link>
                <Link
                  href="/dashboard/results"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  <Award className="h-5 w-5" />
                  <span>Results</span>
                </Link>
              </>
            )}

            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">{session?.user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email || ''}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>
        </div>

        {/* Backdrop for mobile */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden" onClick={onClose}></div>
      </div>
    </>
  )
} 