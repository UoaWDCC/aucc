import { Facebook, Instagram, Link2, Youtube } from 'lucide-react'

import type { SiteSettingsDTO } from '@/queries/site-settings'

export type SocialPlatform = NonNullable<
  SiteSettingsDTO['socials']
>[number]['platform']

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  other: Link2,
} as const

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  const Icon = SOCIAL_ICONS[platform] ?? Link2
  return <Icon aria-hidden="true" className={className} />
}
