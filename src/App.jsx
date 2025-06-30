// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute'; // Importa o novo componente

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
import EditGamePage from './pages/admin/EditGamePage';
import ManageCategoriesPage from './pages/admin/ManageCategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Rota padrão agora é /login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Rotas Protegidas pela autenticação */}
        <Route element={<ProtectedRoute />}>
          <Route path="/platform/*" element={<PlatformPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="manage-games" element={<ManageGamesPage />} />
            <Route path="edit-game/:id" element={<EditGamePage />} />
            <Route path="manage-guides" element={<ManageGuidesPage />} />
            <Route path="manage-categories" element={<ManageCategoriesPage />} />
            <Route path="manage-users" element={<ManageUsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;