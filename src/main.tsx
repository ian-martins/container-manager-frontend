import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module import for bundler side effects
import './index.css'

import React from 'react'
import App from './App'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
