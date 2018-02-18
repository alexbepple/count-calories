import { assertThat, is, string } from 'hamjest'
import { dateTimeLocal } from './react-inputs'

describe('datetime-local input', () => {
  it('accepts valid Date objects', () => {
    assertThat(dateTimeLocal.toValue(new Date()), is(string()))
  })
  it('defaults to null', () => {
    assertThat(dateTimeLocal.toValue(null), is(null))
  })
})
