import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources')({
  component: Resources,
});

function Resources() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Resources & Links</h1>
      <p className="mt-4">Find useful kayaking guides and club policies.</p>
    </div>
  );
}
