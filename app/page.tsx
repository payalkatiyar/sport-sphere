import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">SportSphere</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-primary-600 font-medium">
              Events
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Manage Sports Events with Ease</h1>
              <p className="text-xl opacity-90">
                SportSphere provides a comprehensive platform for organizing, managing, and participating in sports
                events of all types.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" variant="outline" className="border-white text-primary-600 hover:bg-white/10">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="border-white text-primary-600 hover:bg-white/10">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-96">
              <Image
                src="/66185.jpg"
                alt="Sports event"
                fill
                className="object-cover rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Manage Sports Events</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides all the tools necessary for successful sports event management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Calendar className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Event Scheduling</h3>
                <p className="text-gray-600">
                  Create and manage event schedules, matches, and registrations with ease.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600">
                  Organize teams, track participants, and manage registrations all in one place.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <Trophy className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Results & Rankings</h3>
                <p className="text-gray-600">
                  Record results, calculate rankings, and showcase achievements automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Sports Events?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of organizers who trust SportSphere for their event management needs.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold">SportSphere</span>
              </div>
              <p className="text-gray-400">
                Comprehensive sports event management platform for organizers and participants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-400 hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Have questions? Reach out to our support team.</p>
              <Link href="/contact">
                <Button variant="outline" className="mt-4 border-white text-primary-600 hover:bg-white/10 hover:text-white">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SportSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
