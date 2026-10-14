import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'

import { applyTheme, getStoredTheme } from '@/app/theme'
import type { Theme } from '@/app/theme'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const isDark = theme === 'dark'

  function toggleTheme() {
    const nextTheme: Theme = isDark ? 'light' : 'dark'

    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
