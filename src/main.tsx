import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toast } from './components/shares/Toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <BrowserRouter>
        <App />
        <Toast />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
