// import { fileURLToPath } from 'node:url'
// import { createJiti } from 'jiti'

// const jiti = createJiti(fileURLToPath(import.meta.url))
// await jiti.import('./src/lib/env')

// Load .env file for local development
if (process.env.NODE_ENV !== 'production') {
    import('dotenv').then((dotenv) => dotenv.config());    
}

// load-env.mjs
console.log("Loading environment variables...");

// Read environment variables from process.env
const DATABASE_URL = process.env.DATABASE_URL;
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;
const SERVER_URL = process.env.SERVER_URL;

// Log the variables for debugging
console.log("DATABASE_URL:", DATABASE_URL);
console.log("PAYLOAD_SECRET:", PAYLOAD_SECRET ? "*** (hidden) ***" : "Not set");
console.log("SERVER_URL:", SERVER_URL);

// Validate required variables
if (process.env.NODE_ENV === 'production') {
    if (!DATABASE_URL || !PAYLOAD_SECRET || !SERVER_URL) {
    console.error("Error: Missing required environment variables.");
    process.exit(1);
    }
}

console.log("Environment variables loaded successfully.");