import { fontVariablesCss } from '@/app/fonts'

// Sets the --font-face-* variables used by (frontend)/styles.css and
// (payload)/custom.scss. Each root layout renders this once.
export function FontVariables() {
  return (
    // href + precedence make React hoist this into <head>
    <style href="aucc-font-variables" precedence="default">
      {fontVariablesCss}
    </style>
  )
}
