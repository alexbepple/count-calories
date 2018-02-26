import * as r from 'ramda'

const signalLens = r.lens(s => s(), (val, s) => s(val))
export const evolve = r.over(signalLens)

export const derive = r.curry((predicate, signal$) => value => {
  const lens = r.lensIndex(r.findIndex(predicate, signal$()))
  if (r.isNil(value)) {
    return r.view(lens, signal$())
  }
  return evolve(r.over(lens, () => value), signal$)
})
