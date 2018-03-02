import * as r from 'ramda'

import { input } from 'util/react-inputs'

import { createRegisteredValueSignal } from 'flakes/signals'

const dailyLimit$ = createRegisteredValueSignal(1000)

export const exceedsLimit = (value, limit = dailyLimit$()) => r.lt(limit, value)

export const DailyLimitEditor = () =>
  input({
    style: { width: '5em' },
    type: 'number',
    value: dailyLimit$(),
    onChange: e => dailyLimit$(r.defaultTo(0, e.target.valueAsNumber))
  })
