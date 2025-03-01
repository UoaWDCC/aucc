import { appRouter } from '@api/router';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

async function main() {
  const port = process.env.PORT || 3000;

  const app: ReturnType<typeof express> = express();

  app.use(cors());

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: (ctx) => ({ req: ctx.req, res: ctx.res }),
      onError:
        process.env.NODE_ENV === 'development'
          ? ({ path, error }) => {
              console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
            }
          : undefined,
    })
  );

  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  
  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
