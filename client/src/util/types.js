import * as r from 'ramda'
import { argsToArray } from './generic'

const defineProp = x => ({ [x]: x })
export const defineProps = r.pipe(argsToArray, r.map(defineProp), r.mergeAll)
