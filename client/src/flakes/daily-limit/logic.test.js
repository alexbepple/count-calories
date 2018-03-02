import { assertThat, is, truthy, falsy } from 'hamjest'
import { exceeds } from './logic'

describe('Limit', () => {
  it('is exceeded, if value larger', () => {
    assertThat(exceeds(1, 0), is(truthy()))
  })
  it('is not exceeded, if value equal', () => {
    assertThat(exceeds(0, 0), is(falsy()))
  })
})
