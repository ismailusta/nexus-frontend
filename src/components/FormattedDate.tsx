
'use client'

import { useEffect, useState } from 'react'

type Props = {
  dateString: string
}

export const FormattedDate = ({ dateString }: Props) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {

    const date = new Date(dateString)
    setFormattedDate(date.toLocaleDateString('tr-TR'))
  }, [dateString])

  return <span>{formattedDate}</span>
}