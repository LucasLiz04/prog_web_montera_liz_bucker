// src/components/SidebarPlatform.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { path: '/platform', text: 'Home', icon: '🏠' },
    { path: '/platform/em-alta', text: 'Em Alta', icon: '🔥' },
    { path: '/platform/category', text: 'Catalogo', icon: '🗂️' },
    { path: '/platform/guias', text: 'Guias', icon: '📚' }, // <-- ADICIONADO AQUI
    { path: '/platform/library', text: 'Biblioteca', icon: '📚' },
    { path: '/platform/profile/Stiicky25', text: 'Perfil', icon: '👤' },
    { path: '/platform/friends', text: 'Amigos', icon: '👥' },
    { path: '/platform/bate-papos', text: 'Bate-Papos', icon: '💬' },
    { path: '/platform/downloads', text: 'Downloads', icon: '📥' },
    { path: '/platform/buys', text: 'Minhas Compras', icon: '🛒' },
    { path: '/platform/wishlist', text: 'Lista de Desejos', icon: '❤️' },
];

// O resto do arquivo permanece o mesmo...
function SidebarPlatform() {
    return (
        <nav className="hidden lg:flex flex-col w-64 bg-[#1f2128] p-5 shadow-xl border-r border-gray-700/50">
            <div className="text-2xl font-bold text-white mb-10">
                Game-Wiki
            </div>

            <ul className="space-y-3 flex-grow">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-md transition-colors duration-200 text-slate-300 ${isActive ? 'bg-sky-500 text-white font-semibold' : 'hover:bg-gray-700'
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="mt-auto flex items-center gap-3 pt-5 border-t border-gray-700/50">
                <img src="https://i.pravatar.cc/40?u=stiiicky25" alt="User Avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold text-white">Stiicky25</p>
                    <p className="text-xs text-slate-400">stiiicky@gmail.com</p>
                </div>
            </div>
        </nav>
    );
}

export default SidebarPlatform;