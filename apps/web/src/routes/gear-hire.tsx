import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gear-hire')({
  component: GearHire,
});

function GearHire() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gear Hire</h1>
      <p className="mt-4">Rent kayaking and outdoor gear.</p>
    </div>
  );
}
