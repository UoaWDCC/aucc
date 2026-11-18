import { Caveat_Brush } from 'next/font/google'

// Only the membership page uses Caveat Brush, so it's loaded here rather
// than in app/fonts.ts, and other pages don't download it.
export const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})
