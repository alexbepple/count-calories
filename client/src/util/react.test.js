import { assertThat, contains, hasProperties, defined } from 'hamjest'
import { autoKey } from './react'

describe('#autoKey', () => {
  it('adds key prop to object', () => {
    assertThat(
      autoKey([{ foo: null }]),
      contains(hasProperties({ foo: null, key: defined() }))
    )
  })
})
