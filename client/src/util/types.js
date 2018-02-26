import * as r from 'ramda'
import { argsToArray } from './generic'

const defineProp = x => ({ [x]: x })
export const defineProps = r.pipe(argsToArray, r.map(defineProp), r.mergeAll)

export const defineTypeWithProps = (...props) => {
  const p = r.apply(defineProps, props)
  const l = r.map(r.lensProp, p)
  return { p, l, g: r.map(r.view, l), s: r.map(r.set, l) }
}
