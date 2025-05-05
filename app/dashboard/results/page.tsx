"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Result {
  event_name: string;
  date: string;
  location: string;
  team_name: string;
  score: number | null;
  rank: number | null;
  winner_status: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/results/personal");
        const data = await res.json();
        if (Array.isArray(data)) setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">My Event Results</h1>
      {loading ? (
        <div>Loading...</div>
      ) : results.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">No results found.</div>
      ) : (
        <Card className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((r, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{r.event_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.team_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.score ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.rank ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.winner_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
} 