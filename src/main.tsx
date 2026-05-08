import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tree.css'
import './styles/chat.css'   // ✅ dùng file này
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)