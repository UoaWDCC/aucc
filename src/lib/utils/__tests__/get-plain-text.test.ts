import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { describe, expect, it } from 'vitest'

import { getPlainText } from '@/lib/utils/get-plain-text'

// Loose shape for test data: real Lexical nodes also need version, format, etc.
type MockEditorState = { root: { children: unknown[] } }

const asState = (state: MockEditorState) =>
  state as unknown as SerializedEditorState

describe('getPlainText', () => {
  it('returns plain text for a simple text node', () => {
    const state: MockEditorState = {
      root: { children: [{ type: 'text', text: 'Hello Payload' }] },
    }
    expect(getPlainText(asState(state))).toBe('Hello Payload')
  })

  it('joins multiple paragraph nodes with newlines', () => {
    const state: MockEditorState = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'First line' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Second line' }],
          },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('First line\nSecond line')
  })

  it('recursively extracts text from nested structures', () => {
    const state = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'Nested ' },
                  { type: 'text', text: 'content' },
                ],
              },
            ],
          },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('Nested content')
  })

  it('does not append an ellipsis when under maxLength', () => {
    const state = {
      root: { children: [{ type: 'text', text: 'Short text' }] },
    }
    expect(getPlainText(asState(state), 20)).toBe('Short text')
  })

  it('appends an ellipsis when over maxLength', () => {
    const state = {
      root: {
        children: [{ type: 'text', text: 'abcdefghijklmnopqrstuvwxyz' }],
      },
    }
    expect(getPlainText(asState(state), 20)).toBe('abcdefghijklmnopqrst…')
  })

  it('ignores image nodes and extracts surrounding text', () => {
    const state = {
      root: {
        children: [
          { type: 'text', text: 'Before ' },
          { type: 'image', src: 'cute-rabbit.jpg', altText: 'ignored' },
          { type: 'text', text: ' After' },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('Before  After')
  })

  it('extracts text from link nodes', () => {
    const state = {
      root: {
        children: [
          {
            type: 'link',
            url: 'https://eventpageaucc.com',
            children: [{ type: 'text', text: 'Click here' }],
          },
          { type: 'text', text: ' for more' },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('Click here for more')
  })

  it('extracts nothing if there are photos and links but no text', () => {
    const state = {
      root: {
        children: [
          {
            type: 'link',
            url: 'https://eventpageaucc.com',
            children: [{ type: 'image', src: 'cat.png' }],
          },
          { type: 'image', src: 'bobby.jpg' },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('')
  })

  it('returns nothing if there is an empty rich text object with some structure', () => {
    const state = {
      root: {
        children: [
          {
            type: 'text',
            text: '',
            children: [{ type: 'text', text: '' }],
          },
          { type: 'text', text: '' },
        ],
      },
    }
    expect(getPlainText(asState(state))).toBe('')
  })

  it('returns nothing if there is an empty rich text object containing nothing at all', () => {
    const state = {
      root: {
        children: [],
      },
    }
    expect(getPlainText(asState(state))).toBe('')
  })
  it('returns nothing if maxLength is 0', () => {
    const state = {
      root: {
        children: [{ type: 'text', text: 'among us' }],
      },
    }
    expect(getPlainText(asState(state), 0)).toBe('…')
  })
  it('returns nothing if maxLength is 0 and there is nothing in the rich text object', () => {
    const state = {
      root: {
        children: [],
      },
    }
    expect(getPlainText(asState(state), 0)).toBe('…')
  })
  it('returns nothing if maxLength is negative', () => {
    const state = {
      root: {
        children: [{ type: 'text', text: 'among us' }],
      },
    }
    expect(getPlainText(asState(state), -10)).toBe('')
  })
})
