import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Node = {
  type: string
  text?: string
  children?: Node[]
}

/**
 * Recursively convert a RichText node into a string.
 * @param nodes - The RichText nodes to convert. They could be text or media or links.
 * The text nodes are converted to strings, while the others are ignored.
 * @returns The plain text string.
 */

function stringFromRichText(nodes: Node[]): string {
  let out = ''
  for (const n of nodes) {
    if (n.type === 'text' && n.text) {
      out += n.text
    } else if (n.children) {
      out += stringFromRichText(n.children)
    }
    if (n.type === 'paragraph') {
      out += '\n'
    }
  }
  return out
}

/**
 * Turn a Lexical-serialized state (i.e RichText) into one plain-text string.
 */
export function extractPlainText(data: SerializedEditorState): string {
  const children = (data as any).root.children as Node[]
  return stringFromRichText(children).trim()
}
