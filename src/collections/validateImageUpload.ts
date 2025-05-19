import { PayloadRequest } from 'payload'

type HookArgs = {
  value?: unknown
  req: PayloadRequest
}

export const createImageValidationHook = (
  allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
) => {
  return async ({ value, req }: HookArgs) => {
    const mediaDoc = await req.payload.findByID({
      collection: 'media',
      id: value as string,
    })

    const mimeType = mediaDoc?.mimeType as string | undefined

    if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
      return `File type not allowed. Must be one of: ${allowedMimeTypes.join(', ')}`
    }

    return value
  }
}
