import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery')({
  component: Gallery,
});

function Gallery() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="mt-4">Photos from past events.</p>
      {/* Add images in a grid */}
    </div>
  );
}
