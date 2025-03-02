import { helloRouter } from './hello-router/router';
import { router } from './trpc';

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
