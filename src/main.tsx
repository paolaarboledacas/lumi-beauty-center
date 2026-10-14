import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/mona-sans/wdth.css'
import './index.css'
import { App } from '@/app/app'
import { initTheme } from '@/app/theme'

initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
