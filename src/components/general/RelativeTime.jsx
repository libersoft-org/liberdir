import React from 'react'
import { DateTime } from 'luxon'

const RelativeTime = ({ time }) => {
  const dt = DateTime.fromISO(time)
  const relTime = dt.toRelative();
  return (
    <>
      {relTime}
    </>
  )
}

export default RelativeTime
