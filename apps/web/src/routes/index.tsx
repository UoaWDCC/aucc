import { trpc } from '@aucc/trpc/client';


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


import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="text-center">
      <header className="relative bg-cover bg-center h-[400px] text-white" style={{ backgroundImage: 'url(/home-banner.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center">
          <h1 className="text-5xl font-bold">Auckland University Canoe Club</h1>
          <p className="text-xl">Whitewater kayaking and rafting in New Zealand’s most beautiful places</p>
        </div>
      </header>
      <section className="p-8">
        <h2 className="text-3xl font-bold">Welcome to AUCC</h2>
        <p className="mt-4 text-lg">
          AUCC offers whitewater kayaking and rafting adventures for all skill levels. Many of our members have never touched a paddle, but our weekly pool training and beginner trips help develop their skills.
        </p>
      </section>
    </div>
  );
}
