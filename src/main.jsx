// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importe BrowserRouter foi removido daqui
import App from './App'; // Assume que App.jsx está em src/App.jsx
import './index.css';   // Assume que index.css está em src/index.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Adicionei React.StrictMode como boa prática */}
    <App /> {/* Renderize seu App diretamente, pois ele já contém o Router */}
  </React.StrictMode>
);