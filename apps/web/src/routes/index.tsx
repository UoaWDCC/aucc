import { trpc } from '@aucc/trpc/client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const query = trpc.hello.get.useQuery({
    name: 'world',
  });

  if (query.error) {
    return <p className="text-xl text-red-500">Error: {query.error.message}</p>;
  }

  if (query.isLoading) {
    return <p className="text-xl">Loading...</p>;
  }

  return (
    <div>
      <p className="text-xl">Message: {query.data?.message}</p>
    </div>
  );
}
