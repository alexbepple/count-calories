import s from 's-js'
import * as r from 'ramda'

const signals = []
export const getRegisteredSignals = () => signals
export const createRegisteredSignal = r.pipe(
  s.data,
  r.tap($ => signals.push($))
)
