import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/merchandise')({
  component: Merchandise,
});

function Merchandise() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Merchandise</h1>
      <p className="mt-4">Order AUCC branded merchandise here.</p>
    </div>
  );
}
