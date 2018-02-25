import * as r from 'ramda'
import { DateTime } from 'luxon'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'

const { input, button } = hh(h)

export { input, button }

export const dtl = {
  toValue: r.pipe(
    x => DateTime.fromJSDate(x),
    r.ifElse(x => x.isValid, x => x.toFormat("yyyy-MM-dd'T'HH:mm"), x => '')
  )
}

export const dtlInput = r.pipe(
  r.evolve({
    value: dtl.toValue,
    onChange: f => e => f(DateTime.fromISO(e.target.value).toJSDate())
  }),
  r.merge({ type: 'datetime-local' }),
  input
)
