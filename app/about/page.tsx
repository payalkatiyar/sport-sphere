import { Trophy, Users, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About SportSphere</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            SportSphere is a comprehensive sports event management platform designed to streamline the organization,
            management, and participation in sports events of all types. Our mission is to make sports event
            management accessible, efficient, and enjoyable for everyone involved.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            We envision a world where organizing and participating in sports events is seamless, where technology
            enhances the sports experience rather than complicating it. SportSphere aims to be the go-to platform
            for sports event management, connecting organizers, participants, and fans in one unified ecosystem.
          </p>

          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Trophy className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-gray-600">
                Create, schedule, and manage sports events with our intuitive platform.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Organize teams, track participants, and manage registrations efficiently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scheduling</h3>
              <p className="text-gray-600">
                Plan and coordinate matches, practices, and events with ease.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Results & Rankings</h3>
              <p className="text-gray-600">
                Track results, calculate rankings, and showcase achievements.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            SportSphere is built by a passionate team of sports enthusiasts, developers, and event organizers
            who understand the challenges of managing sports events. We combine our expertise in sports
            management with cutting-edge technology to deliver a platform that meets the needs of modern
            sports organizations.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-gray-600">
            Whether you're an event organizer, participant, or sports enthusiast, SportSphere has something
            for you. Join our growing community and experience the future of sports event management.
          </p>
        </div>
      </div>
    </div>
  )
} 