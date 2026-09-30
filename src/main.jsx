import { createRoot } from 'react-dom/client'
import App from './App'
import './page.css'

// No StrictMode: the page script attaches listeners once and must not run twice.
createRoot(document.getElementById('root')).render(<App />)
