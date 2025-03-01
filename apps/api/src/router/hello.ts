import { publicProcedure, router } from '@api/trpc';
import { z } from 'zod';

export const schema = z.object({
  name: z.string(),
});

export const helloRouter = router({
  get: publicProcedure.input(schema).query(async ({ input }) => {
    console.log(`Received request with name: ${input.name}`);
    return { success: true, message: `Hello ${input.name}!` };
  }),
});
