import { assertThat, allOf, hasProperty, hasProperties, is } from 'hamjest'
import { defineProps, defineTypeWithProps } from './types'

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

describe('#defineTypeWithProps', () => {
  it('defines accessors', () => {
    const t = defineTypeWithProps('x')
    assertThat(t.g.x(t.s.x(0, {})), is(0))
  })
  it('for all props', () => {
    assertThat(
      defineTypeWithProps('x', 'y').p,
      allOf(hasProperty('x'), hasProperty('y'))
    )
  })
})
