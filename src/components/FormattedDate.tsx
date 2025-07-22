// src/components/FormattedDate.tsx
'use client'

import { useEffect, useState } from 'react'

type Props = {
  dateString: string
}

export const FormattedDate = ({ dateString }: Props) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    // Bu kod sadece tarayıcıda çalışır, böylece sunucu ile fark oluşmaz.
    const date = new Date(dateString)
    setFormattedDate(date.toLocaleDateString('tr-TR'))
  }, [dateString])

  return <span>{formattedDate}</span>
}