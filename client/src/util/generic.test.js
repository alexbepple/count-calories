import { assertThat, is } from 'hamjest'
import { argsToArray } from './generic'

describe('#argsToArray', () => {
  it('returns all args as array', () => {
    assertThat(argsToArray(null), is([null]))
    assertThat(argsToArray(null, null), is([null, null]))
  })
})
