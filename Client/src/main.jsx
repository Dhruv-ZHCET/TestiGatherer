import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThankYouProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThankYouProvider>
      <App />
    </ThankYouProvider>
  </StrictMode>,

)
