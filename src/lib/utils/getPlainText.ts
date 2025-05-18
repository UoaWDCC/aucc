import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Node = {
  type: string
  text?: string
  children?: Node[]
}

/**
 *Gives you a plain-text string from a Lexical-serialized state (i.e RichText).
 * @param data - The Lexical-serialized state to convert.
 * @param maxLength - Optional maximum length. If provided, truncates and adds an ellipsis.
 */
export function getPlainText(
  data: SerializedEditorState,
  maxLength?: number,
): string {
  // recursive function to walk the node tree.
  function walk(nodes: Node[]): string {
    let out = ''
    for (const n of nodes) {
      if (n.type === 'text' && n.text) {
        out += n.text
      } else if (n.children) {
        out += walk(n.children)
      }
      if (n.type === 'paragraph') {
        out += '\n'
      }
    }
    return out
  }

  // this will recursively retrieve all text from the RichText element.
  const children = (data as any).root.children as Node[]
  const full = walk(children).trim()

  // this if statement will run if a maximum size for the plain text is passed as an arg.
  if (typeof maxLength === 'number' && full.length > maxLength) {
    return full.slice(0, maxLength).replace(/\s+$/, '') + '…'
  }
  return full
}
