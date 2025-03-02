import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/trips-events')({
  component: TripsEvents,
});

function TripsEvents() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Trips & Events</h1>
      <p className="mt-4">Check out our upcoming events and kayaking trips.</p>
      {/* You can add dynamic content for trips */}
    </div>
  );
}
