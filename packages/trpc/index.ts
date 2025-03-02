import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from './server';

export { appRouter, type AppRouter } from './server';

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
