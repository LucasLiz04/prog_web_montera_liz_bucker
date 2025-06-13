// src/App.jsx
import React from 'react';
// 1. BrowserRouter foi renomeado para Router para clareza
//    Outlet e useState foram removidos pois não são mais necessários aqui
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 2. Remova as importações de todas as páginas e componentes do layout antigo
//    Ex: import Sidebar from './components/Sidebar';
//    Ex: import HomePage from './pages/HomePage';
//    etc...

// Importe apenas as páginas que não fazem parte do layout antigo
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import PlatformPage from './pages/PlatformPage';

/**
 * O componente de Layout Principal (MainLayout) foi completamente removido.
 */

/**
 * Componente Principal da Aplicação (simplificado)
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal agora redireciona para a plataforma */}
        <Route path="/" element={<Navigate to="/platform" replace />} />

        {/* Rotas autônomas que não usam o layout da plataforma */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* A rota da plataforma agora é a principal da aplicação */}
        {/* O '*' indica que qualquer sub-rota de /platform será gerenciada pelo PlatformPage */}
        <Route path="/platform/*" element={<PlatformPage />} />

        {/* Todas as rotas do layout antigo foram removidas daqui */}
      </Routes>
    </Router>
  );
}

export default App;