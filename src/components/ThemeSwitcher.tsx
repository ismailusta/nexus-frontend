'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  )
}