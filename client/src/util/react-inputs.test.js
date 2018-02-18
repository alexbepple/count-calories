import { assertThat, is, string } from 'hamjest'
import { dtl } from './react-inputs'

describe('datetime-local input', () => {
  it('accepts valid Date objects', () => {
    assertThat(dtl.toValue(new Date()), is(string()))
  })
  it('defaults to null', () => {
    assertThat(dtl.toValue(null), is(''))
  })
})
