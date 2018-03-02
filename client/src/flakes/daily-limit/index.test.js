import { assertThat, is, truthy, falsy } from 'hamjest'
import { exceedsLimit } from './index'

describe('Limit', () => {
  it('is exceeded, if value larger', () => {
    assertThat(exceedsLimit(1, 0), is(truthy()))
  })
  it('is not exceeded, if value equal', () => {
    assertThat(exceedsLimit(0, 0), is(falsy()))
  })
})
