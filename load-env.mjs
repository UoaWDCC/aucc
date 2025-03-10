// import { fileURLToPath } from 'node:url'
// import { createJiti } from 'jiti'

// const jiti = createJiti(fileURLToPath(import.meta.url))
// await jiti.import('./src/lib/env')

console.log("✅ Using Fly.io Secrets - Environment Loaded");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("API_KEY:", process.env.API_KEY); // Add other important variables
