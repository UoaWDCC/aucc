import { helloRouter } from '@api/router/hello';
import { router } from '@api/trpc';

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
