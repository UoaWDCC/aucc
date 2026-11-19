import { MAX_SWIM_PHOTO_BYTES, SWIM_PHOTO_TYPES } from '@/lib/utils/swim-photo'

// Small enough to upload quickly, large enough for the site's carousel.
const MAX_EDGE_PX = 2048
const SHRINK_ABOVE_BYTES = 1.5 * 1024 * 1024
const JPEG_QUALITY = 0.85

/**
 * Phone photos are often 3-10 MB (or HEIC), which is over the upload limit.
 * Re-encode large or unsupported images as a JPEG of at most 2048px in the
 * browser. If the browser can't decode the file, return it unchanged and let
 * validation explain the problem.
 */
export async function preparePhoto(file: File): Promise<File> {
  const isSupported = SWIM_PHOTO_TYPES.includes(file.type)
  if (isSupported && file.size <= SHRINK_ABOVE_BYTES) return file

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(
      1,
      MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height),
    )
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas
      .getContext('2d')
      ?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    )
    if (!blob || blob.size > MAX_SWIM_PHOTO_BYTES) return file

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'swim-photo'
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
  } catch {
    return file
  }
}
