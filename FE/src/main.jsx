import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
