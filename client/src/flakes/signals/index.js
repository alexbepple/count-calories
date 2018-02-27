import s from 's-js'
import * as r from 'ramda'

const signals = []
export const getRegisteredSignals = () => signals
export const createRegisteredValueSignal = r.pipe(
  s.value,
  r.tap($ => signals.push($))
)
