import { getPayload } from 'payload'

import config from '@/payload.config'

export async function GetTripReports(
  pageSize = 1,
  limitSize = 20,
  sortType = '-createdAt',
) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const tripReports = await payload.find({
    collection: 'trip-reports',
    limit: limitSize,
    page: pageSize,
    sort: sortType,
  })
  return tripReports
}
