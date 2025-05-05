'use client'

import Link from 'next/link'
import { Trophy, Menu } from 'lucide-react'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SportSphere</span>
        </Link>
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
} 