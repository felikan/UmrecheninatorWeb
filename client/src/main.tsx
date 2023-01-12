import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import "bulma/css/bulma.min.css"
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
