import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('user_token');

    // Se existe um token, permite o acesso à rota filha (usando <Outlet />).
    // Caso contrário, redireciona para a página de login.
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;