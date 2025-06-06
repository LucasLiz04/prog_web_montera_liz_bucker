// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { List as ListIcon } from 'react-feather'; // Ou o SVG puro do hambúrguer

// Importe todas as páginas da pasta src/pages
import HomePage from './pages/HomePage';
import EmAltaPage from './pages/EmAltaPage';
import PromocoesPage from './pages/PromocoesPage';
import JogosPage from './pages/JogosPage';
import GuiasPage from './pages/GuiasPage';
import BatePaposPage from './pages/BatePaposPage';
import PerfilPage from './pages/PerfilPage';
import EmBrevePage from './pages/EmBrevePage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Botão para o menu mobile */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 rounded-md shadow-lg text-white flex items-center"
          onClick={toggleMobileMenu}
        >
          {/* Ícone de três linhas (hamburger) - use ListIcon ou seu SVG */}
          <ListIcon size={24} />
          <span className="ml-2">Menu</span>
        </button>

        {/* Componente Sidebar - passa as props necessárias */}
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

        {/* Overlay para fechar o menu mobile ao clicar fora */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/em-alta" element={<EmAltaPage />} />
            <Route path="/promocoes" element={<PromocoesPage />} />
            <Route path="/jogos" element={<JogosPage />} />
            <Route path="/guias" element={<GuiasPage />} />
            <Route path="/bate-papos" element={<BatePaposPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            {/* A página "Em breve..." agora é uma rota que aponta para um dos componentes de página, ou um novo, se desejar. */}
            {/* Por simplicidade, podemos manter o div inline se for algo bem temporário, ou criar uma EmBrevePage */}
            <Route path="/em-breve" element={<EmBrevePage />} /> {/* <-- Use o componente da página */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;