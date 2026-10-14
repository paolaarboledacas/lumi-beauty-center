// Light is the default theme. The user can switch to dark with the
// ThemeToggle button, and the choice is remembered in localStorage.
// The dark palette in `index.css` applies when <html> has the `dark` class.

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'lumi-theme'

export function getStoredTheme(): Theme {
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(STORAGE_KEY, theme)
}

export function initTheme(): void {
  applyTheme(getStoredTheme())
}
