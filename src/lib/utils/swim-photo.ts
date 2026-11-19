/**
 * Rules for the photo a member can attach to a public swim submission.
 * Shared by the form (browser) and the /api/swims/submit route (server).
 */

// Vercel rejects function request bodies over 4.5 MB, so keep the photo
// under 4 MB to leave room for the other form fields. The form shrinks
// large photos before upload.
export const MAX_SWIM_PHOTO_BYTES = 4 * 1024 * 1024

export const SWIM_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const SWIM_PHOTO_CONSENT_LABEL =
  "I'm happy for this photo to be shown on the AUCC website once an admin approves it."

/** Returns an error message, or null if the photo is acceptable. */
export function validateSwimPhoto(
  photo: { type: string; size: number },
  consent: boolean,
): string | null {
  if (!SWIM_PHOTO_TYPES.includes(photo.type)) {
    return 'Please choose a JPG, PNG or WebP photo'
  }
  if (photo.size > MAX_SWIM_PHOTO_BYTES) {
    return 'Please choose a photo under 4 MB'
  }
  if (!consent) {
    return 'Please confirm the photo can be shown on the website'
  }
  return null
}
