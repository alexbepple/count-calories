import * as r from 'ramda'
import { DateTime } from 'luxon'
import h from 'react-hyperscript'
import hh from 'hyperscript-helpers'

const { input } = hh(h)

export const dateTimeLocal = {
  toValue: r.pipe(
    x => DateTime.fromJSDate(x),
    r.ifElse(x => x.isValid, x => x.toFormat("yyyy-MM-dd'T'HH:mm"), x => null)
  ),
  getDateFromChangeEvent: e => new Date(e.target.valueAsNumber)
}

export const dtlInput = r.pipe(
  r.evolve({
    defaultValue: dateTimeLocal.toValue,
    onChange: f => e => f(dateTimeLocal.getDateFromChangeEvent(e))
  }),
  r.merge({ type: 'datetime-local' }),
  input
)
