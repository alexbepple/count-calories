import { assertThat, hasProperties } from 'hamjest'
import { defineProps } from './types'

describe('#defineProps', () => {
  it('defines one prop', () => {
    assertThat(defineProps('foo'), hasProperties({ foo: 'foo' }))
  })
  it('defines two props', () => {
    assertThat(
      defineProps('foo', 'bar'),
      hasProperties({ foo: 'foo', bar: 'bar' })
    )
  })
})
