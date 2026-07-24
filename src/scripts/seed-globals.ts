import { getPayload } from 'payload'

import config from '../payload.config'

const seedGlobals = async () => {
  const payload = await getPayload({ config })
  const merch = await payload.findGlobal({ slug: 'merch' })

  if (!Array.isArray(merch.sections)) {
    await payload.updateGlobal({
      slug: 'merch',
      data: { sections: [] },
    })
  }
}

await seedGlobals()
