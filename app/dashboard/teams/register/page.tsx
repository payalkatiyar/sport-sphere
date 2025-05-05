"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Event {
  event_id: string;
  event_name: string;
  event_type: string;
  event_category: string;
  date: string;
  location: string;
  status: string;
}

export default function TeamRegistrationPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [registering, setRegistering] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        toast.error("No event selected");
        router.push("/dashboard/events");
        return;
      }

      try {
        console.log('Fetching event with ID:', eventId);
        const response = await fetch(`/api/events/${eventId}`);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (!response.ok) {
          throw new Error(data.message || `Failed to fetch event details (Status: ${response.status})`);
        }

        if (data.event_category !== "Team") {
          toast.error("This is not a team event");
          router.push("/dashboard/events");
          return;
        }

        setEvent(data);
      } catch (error) {
        console.error("Detailed error fetching event:", error);
        toast.error(error instanceof Error ? error.message : "Failed to load event");
        router.push("/dashboard/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, router]);

  const handleRegister = async () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ team_name: teamName.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Team registered successfully!");
      router.push("/dashboard/events");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Team Registration</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Event Details</h2>
              <p className="text-muted-foreground">Event: {event.event_name}</p>
              <p className="text-muted-foreground">Type: {event.event_type}</p>
              <p className="text-muted-foreground">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-muted-foreground">Location: {event.location}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="teamName" className="text-sm font-medium">
                Team Name
              </label>
              <Input
                id="teamName"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/events")}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRegister}
                disabled={registering || !teamName.trim()}
              >
                {registering ? "Registering..." : "Register Team"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}