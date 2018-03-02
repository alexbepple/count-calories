import * as r from 'ramda'

export const formatKcal = r.pipe(r.toString, r.concat(r.__, ' kcal'))
