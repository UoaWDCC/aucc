import { initTRPC } from '@trpc/server';
import { Request, Response } from 'express';
import superjson from 'superjson';

type TRPCContext = {
  req: Request;
  res: Response;
};

const trpc = initTRPC.context<TRPCContext>().create({
  // Allows us to serialise Date/Map/Set etc between client/server
  // https://trpc.io/docs/server/data-transformers
  transformer: superjson,
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
