"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

const EVENT_TYPES = ["Football", "Basketball", "Cricket", "Tennis", "Other"];
const STATUS_OPTIONS = ["Upcoming", "Ongoing", "Completed"];
const EVENT_CATEGORIES = ["Team", "Individual"];

export default function CreateEventPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    event_id: "",
    event_name: "",
    event_type: EVENT_TYPES[0],
    event_category: EVENT_CATEGORIES[0],
    date: "",
    location: "",
    status: STATUS_OPTIONS[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create event");
      toast.success("Event created successfully!");
      setForm({ event_id: "", event_name: "", event_type: EVENT_TYPES[0], event_category: EVENT_CATEGORIES[0], date: "", location: "", status: STATUS_OPTIONS[0] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <Input
          name="event_id"
          placeholder="Event ID"
          value={form.event_id}
          onChange={handleChange}
          required
        />
        <Input
          name="event_name"
          placeholder="Event Name"
          value={form.event_name}
          onChange={handleChange}
          required
        />
        <select
          name="event_type"
          value={form.event_type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          name="event_category"
          value={form.event_category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          {EVENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <Input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
} 