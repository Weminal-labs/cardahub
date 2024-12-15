import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toast } from './components/shares/Toast'
import './index.css'
import App from './App.tsx'
import { LucidProvider } from './context/LucidProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LucidProvider>
        <BrowserRouter>
          <App />
          <Toast />
        </BrowserRouter>
    </LucidProvider>
  </StrictMode>,
)
