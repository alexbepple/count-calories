import * as r from 'ramda'
import { input } from 'util/react-inputs'
import { createRegisteredValueSignal } from 'flakes/signals'
import * as logic from './logic'

const dailyLimit$ = createRegisteredValueSignal(1000)

export const exceedsLimit = x => logic.exceeds(x, dailyLimit$())

export const DailyLimitEditor = () =>
  input({
    style: { width: '5em' },
    type: 'number',
    value: dailyLimit$(),
    onChange: e => dailyLimit$(r.defaultTo(0, e.target.valueAsNumber))
  })
