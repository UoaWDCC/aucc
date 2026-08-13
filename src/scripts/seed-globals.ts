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
