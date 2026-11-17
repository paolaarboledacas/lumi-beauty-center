import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// letras de Lumi: Playfair Display para titulos y DM Sans para el texto //
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/dm-sans'
import './index.css'
import { App } from '@/app/app'
import { initTheme } from '@/app/theme'

initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
