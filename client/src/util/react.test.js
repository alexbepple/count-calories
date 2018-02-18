import { assertThat, contains, hasProperties, defined } from 'hamjest'
import { autoKey, mapWithKey } from './react'

describe('#autoKey', () => {
  it('adds key prop to object', () => {
    assertThat(
      autoKey([{ foo: null }]),
      contains(hasProperties({ foo: null, key: defined() }))
    )
  })
})

describe('#mapWithKey', () => {
  const keyF = () => 'x'
  const mapF = () => ({})
  it('uses key function to add key prop', () => {
    assertThat(
      mapWithKey(keyF, mapF, [null]),
      contains(hasProperties({ key: 'x' }))
    )
  })
  it('is curryable', () => {
    mapWithKey(keyF)(mapF)([])
  })
})
