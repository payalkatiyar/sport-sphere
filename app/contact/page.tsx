"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { MapPin, Users } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to send message")
      toast.success("Message sent! We'll get back to you soon.")
      setForm({ name: "", email: "", message: "" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-center flex-1">Contact Us</h1>
            <a href="/contact" className="text-blue-600 hover:underline ml-4 text-sm font-medium">Help Centre</a>
          </div>
          <p className="mb-8 text-muted-foreground text-center">Have a question or need support? Fill out the form below and we'll get back to you.</p>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Widget Section */}
            <div className="md:w-1/2 bg-gray-50 rounded-lg p-6 flex flex-col gap-6 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground text-sm">221B Baker Street<br />London, UK</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Owners</div>
                  <div className="text-muted-foreground text-sm">Payal Katiyar<br />Saahithi B</div>
                </div>
              </div>
            </div>
            {/* Contact Form Section */}
            <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto pb-4 flex justify-center gap-6 text-sm text-gray-500">
        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
      </div>
    </div>
  )
} 