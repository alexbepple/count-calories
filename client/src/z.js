import * as r from 'ramda'

const signalLens = r.lens(s => s(), (val, s) => s(val))
export const over = r.over(signalLens)
