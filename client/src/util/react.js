import * as r from 'ramda'

export const autoKey = r.addIndex(r.map)((val, idx) => r.assoc('key', idx, val))
