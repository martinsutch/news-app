import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StatusContext, StatusProvider } from './contexts/StatusContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StatusProvider>
            <App />
        </StatusProvider>
    </BrowserRouter>
)
