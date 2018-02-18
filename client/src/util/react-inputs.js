import * as r from 'ramda'
import { DateTime } from 'luxon'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'

const { input } = hh(h)

export const dtl = {
  toValue: r.pipe(
    x => DateTime.fromJSDate(x),
    r.ifElse(x => x.isValid, x => x.toFormat("yyyy-MM-dd'T'HH:mm"), x => null)
  )
}

export const dtlInput = r.pipe(
  r.evolve({
    defaultValue: dtl.toValue,
    onChange: f => e => f(new Date(e.target.valueAsNumber))
  }),
  r.merge({ type: 'datetime-local' }),
  input
)
