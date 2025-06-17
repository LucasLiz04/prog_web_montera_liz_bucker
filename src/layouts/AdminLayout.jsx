// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-800 text-white">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {/* As páginas de admin serão renderizadas aqui */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;