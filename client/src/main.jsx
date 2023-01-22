import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { ChatProvider } from './components/ChatContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChatProvider>,
)
