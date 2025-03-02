import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/trip-reports')({
  component: TripReports,
});

function TripReports() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Trip Reports</h1>
      <p className="mt-4">Stories and experiences from past trips.</p>
    </div>
  );
}
