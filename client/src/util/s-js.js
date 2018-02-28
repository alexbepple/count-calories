import * as r from 'ramda'
import s from 's-js'

const signalLens = r.lens(s => s(), (val, s) => s(val))
export const evolve = r.over(signalLens)

export const derive = r.curry((predicate, signal$) => value => {
  const lens = r.lensIndex(r.findIndex(predicate, signal$()))
  if (r.isNil(value)) {
    return r.view(lens, signal$())
  }
  return evolve(r.over(lens, () => value), signal$)
})

export const onChanges = (signalOrSignals, computation, seed) =>
  s.on(signalOrSignals, computation, seed, true)
