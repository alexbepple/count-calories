import * as r from 'ramda'

export const autoKey = r.addIndex(r.map)((val, idx) => r.assoc('key', idx, val))

export const mapWithKey = r.curry((keyF, mapF, list) =>
  r.map(r.converge(r.merge, [mapF, r.pipe(keyF, r.objOf('key'))]))(list)
)
