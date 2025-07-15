import { ThemeProvider } from './context/ThemeContext.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';;
import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ThemeProvider>,
)
