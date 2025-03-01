import { publicProcedure, router } from '../trpc';
import { ZGetHelloRequestSchema } from './schema';

export const helloRouter = router({
  get: publicProcedure.input(ZGetHelloRequestSchema).query(async ({ input }) => {
    console.log(`Received request with name: ${input.name}`);

    return { success: true, message: `Hello ${input.name}!` };
  }),
});
