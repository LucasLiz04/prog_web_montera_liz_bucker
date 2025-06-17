// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// CORREÇÃO: Adicione 'BookOpen' à lista de importação.
import { Home, Grid, Users, Settings, BookOpen } from 'react-feather';

const navLinks = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/admin' },
    { icon: <Grid size={20} />, text: 'Gerenciar Jogos', path: '/admin/manage-games' },
    { icon: <BookOpen size={20} />, text: 'Gerenciar Guias', path: '/admin/manage-guides' },
    { icon: <Users size={20} />, text: 'Gerenciar Usuários', path: '/admin/manage-users' },
    { icon: <Settings size={20} />, text: 'Configurações', path: '/admin/settings' },
];

const AdminSidebar = () => {
    return (
        <nav className="w-64 bg-slate-900 text-slate-200 p-4 flex flex-col border-r border-slate-700">
            <h1 className="text-2xl font-bold text-white mb-10 text-center">Admin Panel</h1>
            <ul className="space-y-2 flex-grow">
                {navLinks.map(link => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            end={link.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-sky-600 text-white' : 'hover:bg-slate-700'
                                }`
                            }
                        >
                            {link.icon}
                            <span>{link.text}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminSidebar;