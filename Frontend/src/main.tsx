import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  BrowserRouter} from 'react-router-dom'
import "./services/i18";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  
)
