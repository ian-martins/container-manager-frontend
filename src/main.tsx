import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module import for bundler side effects
import './index.css'

import React from 'react'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
