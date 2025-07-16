import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { PhotoProvider } from './contexts/PhotoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhotoProvider>
      <App />
    </PhotoProvider>
  </StrictMode>,
)
                                               