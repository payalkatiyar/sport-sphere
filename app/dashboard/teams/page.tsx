 "use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface TeamEvent {
  event_name: string;
  location: string;
  date: string;
  team_name: string;
}

export default function TeamsPage() {
  const [teamEvents, setTeamEvents] = useState<TeamEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/teams/participated");
        const data = await res.json();
        if (Array.isArray(data)) setTeamEvents(data);
      } catch {
        setTeamEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamEvents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">My Team Events</h1>
      {loading ? (
        <div>Loading...</div>
      ) : teamEvents.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">No team event participations found.</div>
      ) : (
        <Card className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamEvents.map((te, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{te.event_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{te.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(te.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{te.team_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}