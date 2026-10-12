import { Caveat, Rubik, Rubik_Mono_One, Unbounded } from 'next/font/google'

// Self-hosted by next/font. The generated family names are exposed as
// --font-face-* variables, which (frontend)/styles.css and
// (payload)/custom.scss map onto the site's --font-* tokens.
const rubik = Rubik({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const rubikMonoOne = Rubik_Mono_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
})

// Set on :root from a stylesheet rather than with next/font's `variable`
// class on <html>: the Payload admin renders its own <html>, which would
// drop the class.
export const fontVariablesCss = `:root {
  --font-face-rubik: ${rubik.style.fontFamily};
  --font-face-rubik-mono-one: ${rubikMonoOne.style.fontFamily};
  --font-face-caveat: ${caveat.style.fontFamily};
  --font-face-unbounded: ${unbounded.style.fontFamily};
}`
