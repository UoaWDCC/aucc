import { z } from 'zod';

export const ZGetHelloRequestSchema = z.object({
  name: z.string(),
});
