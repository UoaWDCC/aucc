import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@aucc/api';

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>();

