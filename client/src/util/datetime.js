import { DateTime } from 'luxon'

export const isValid = x => DateTime.fromJSDate(x).isValid
export const getDate = x =>
  DateTime.fromJSDate(x)
    .startOf('day')
    .toJSDate()
