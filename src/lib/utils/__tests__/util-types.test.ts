import { describe, expectTypeOf, it } from 'vitest'

import type { NoNumber } from '../util-types'

describe('NoNumber type', () => {
  it('removes number from union types', () => {
    type Input = {
      numStr: number | string
      numOnly: number
      strOnly: string
      numNull: number | null
      numUndef: number | undefined
      mixed: number | string | boolean
    }

    type Result = NoNumber<Input>

    expectTypeOf<Result['numStr']>().toEqualTypeOf<string>()
    expectTypeOf<Result['numOnly']>().toEqualTypeOf<number>()
    expectTypeOf<Result['strOnly']>().toEqualTypeOf<string>()
    expectTypeOf<Result['numNull']>().toEqualTypeOf<number | null>()
    expectTypeOf<Result['numUndef']>().toEqualTypeOf<number | undefined>()
    expectTypeOf<Result['mixed']>().toEqualTypeOf<string | boolean>()
  })

  it('handles arrays correctly', () => {
    type Input = {
      numArray: number[]
      mixedArray: (number | string)[]
      numNullArray: (number | null)[]
      numUndefArray: (number | undefined)[]
      fuckedUp: number[] | null[]
    }

    type Result = NoNumber<Input>

    expectTypeOf<Result['numArray']>().toEqualTypeOf<number[]>()
    expectTypeOf<Result['mixedArray']>().toEqualTypeOf<string[]>()
    expectTypeOf<Result['numNullArray']>().toEqualTypeOf<(number | null)[]>()
    expectTypeOf<Result['numUndefArray']>().toEqualTypeOf<
      (number | undefined)[]
    >()
  })
})
