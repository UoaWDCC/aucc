import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Node = {
  type: string
  text?: string
  children?: Node[]
}

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

/**
 *Gives you a plain-text string from a Lexical-serialized state (i.e RichText).
 * @param data - The Lexical-serialized state to convert.
 * @param maxLength - Optional maximum length. If provided, truncates and adds an ellipsis.
 */
export function getPlainText(
  data: SerializedEditorState,
  maxLength?: number,
): string {
  // this will recursively retrieve all text from the RichText element.
  const children = (data as any).root.children as Node[]
  const full = walk(children).trim()

  if (maxLength === undefined || full.length < maxLength) {
    return full
  } else if (maxLength < 0) {
    return ''
  }
  return full.slice(0, maxLength) + '…'
}
