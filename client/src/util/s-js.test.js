import s from 's-js'
import * as r from 'ramda'
import { assertThat, is } from 'hamjest'

import { derive } from './s-js'

describe('Signal derivation', () => {
  it('is curryable', () => {
    derive(r.T)(s.data())
  })
})
describe('Signal derived from list signal', () => {
  const s$ = s.data([0, 1])
  const ds$ = derive(r.gt(r.__, 0), s$)
  it('reads first element of signal that matches predicate', () => {
    assertThat(ds$(), is(1))
  })
  it('replaces that element when setting', () => {
    ds$(2)
    assertThat(ds$(), is(2))
  })
})
