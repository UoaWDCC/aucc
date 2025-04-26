import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { extractPlainText } from './ExtractPlainText'

/** getPlainText
 *
 * Get a plain-text string from a Lexical-serialized state (i.e RichText).
 * @param data - The Lexical-serialized state to convert.
 * @param maxLength - The maximum length of the string to return.
 * If the string is longer than this, an ellipsis will be added and anything after will be truncated.
 * @returns The plain-text string.
 */

export function getPlainText(
  data: SerializedEditorState,
  maxLength?: number,
): string {
  const fullText = extractPlainText(data)

  const snippet =
    typeof maxLength === 'number'
      ? fullText.length > maxLength
        ? fullText.slice(0, maxLength).replace(/\s+$/, '') + '…'
        : fullText
      : fullText

  return snippet
}
