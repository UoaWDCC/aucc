import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-4">For inquiries, reach out to our executive team.</p>
    </div>
  );
}
