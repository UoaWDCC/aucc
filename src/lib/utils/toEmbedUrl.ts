export function toEmbedUrl(url: string): string | undefined {
  if (!url) return undefined
  try {
    const u = new URL(url)

    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`
    }
    if (u.hostname === 'vimeo.com' || u.hostname === 'www.vimeo.com') {
      return `https://player.vimeo.com/video${u.pathname}`
    }
    return url
  } catch {
    return undefined
  }
}
