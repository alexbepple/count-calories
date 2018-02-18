import { DateTime } from 'luxon'

export const isValid = x => DateTime.fromJSDate(x).isValid
