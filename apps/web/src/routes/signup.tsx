import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Sign Up / Fees</h1>
      <p className="mt-4">Interested in becoming a member? Click below to sign up.</p>
      <a href="https://form.jotform.com/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded">Sign Up Here</a>
    </div>
  );
}
