import { DateTime } from 'luxon'
import { assertThat, is, not } from 'hamjest'

import { getDate } from './datetime'

describe('#getDate', () => {
  it('yields same value for different times on same date', () => {
    const startOfDay = DateTime.local().startOf('day')
    const a = startOfDay.plus({ hours: 1 }).toJSDate()
    const b = startOfDay.plus({ hours: 2 }).toJSDate()
    assertThat(getDate(a), is(getDate(b)))
  })
  it('yields different values for same times on different dates', () => {
    const now = DateTime.local()
    const sameTimeYesterday = now.minus({ days: 1 })
    assertThat(
      getDate(now.toJSDate()),
      not(is(getDate(sameTimeYesterday.toJSDate())))
    )
  })
})
