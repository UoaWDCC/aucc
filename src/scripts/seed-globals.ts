import { getPayload } from 'payload'

import config from '../payload.config'

const seedGlobals = async () => {
  const payload = await getPayload({ config })

  try {
    const merch = await payload.findGlobal({ slug: 'merch-global' })

    if (!Array.isArray(merch.items)) {
      await payload.updateGlobal({
        slug: 'merch-global',
        data: { items: [] },
      })
    }
  } catch (error) {
    console.error('Error seeding merch global (continuing build):', error)
  }
}

await seedGlobals()

// The database pool keeps the process alive, so exit explicitly.
// Errors are logged above and deliberately don't fail the build.
process.exit(0)
