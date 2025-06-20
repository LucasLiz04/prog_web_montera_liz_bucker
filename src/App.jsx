// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Páginas Públicas
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import PlatformPage from './pages/PlatformPage';

// Páginas de Admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageGamesPage from './pages/admin/ManageGamesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageGuidesPage from './pages/admin/ManageGuidesPage';
import SettingsPage from './pages/admin/SettingsPage';
import EditGamePage from './pages/admin/EditGamePage'; // Importe a nova página


function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas e da Plataforma */}
        <Route path="/" element={<Navigate to="/platform" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/platform/*" element={<PlatformPage />} />

        {/* Rotas da Seção de Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="manage-games" element={<ManageGamesPage />} />
          {/* Nova rota para editar um jogo específico */}
          <Route path="edit-game/:id" element={<EditGamePage />} />
          <Route path="manage-guides" element={<ManageGuidesPage />} />
          <Route path="manage-users" element={<ManageUsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;