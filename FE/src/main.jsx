import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Fonts are self-hosted (same families as Arogya Rx) rather than pulled from
// Google Fonts: one less third-party round trip, and the page still renders
// correctly on networks that block fonts.googleapis.com.
import '@fontsource/hind/devanagari-400.css'
import '@fontsource/hind/devanagari-600.css'
import '@fontsource/hind/latin-300.css'
import '@fontsource/hind/latin-400.css'
import '@fontsource/hind/latin-500.css'
import '@fontsource/hind/latin-600.css'
import '@fontsource/hind/latin-700.css'
import '@fontsource/martel/devanagari-700.css'
import '@fontsource/martel/devanagari-800.css'
import '@fontsource/martel/400.css'
import '@fontsource/martel/700.css'
import '@fontsource/martel/800.css'
import '@fontsource/martel/900.css'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App Router={BrowserRouter} />
  </StrictMode>
)

// Production pages arrive pre-rendered (scripts/prerender.mjs): attach to that
// HTML instead of replacing it. The dev server serves an empty #root.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
