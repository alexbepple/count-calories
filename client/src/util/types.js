import * as r from 'ramda'

const defineProp = x => ({[x]: x})
export const defineProps = (...args) => r.mergeAll(r.map(defineProp, args))
