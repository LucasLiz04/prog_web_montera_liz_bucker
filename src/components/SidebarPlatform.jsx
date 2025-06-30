// src/components/SidebarPlatform.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'react-feather'; // Importando o ícone Shield para o admin

const navItems = [
    { path: '/platform', text: 'Home', icon: '🏠' },
    { path: '/platform/category', text: 'Catalogo', icon: '🗂️' },
    { path: '/platform/guias', text: 'Guias', icon: '📚' },
    { path: '/platform/library', text: 'Biblioteca', icon: '📚' },
    { path: '/platform/profile/Stiicky25', text: 'Perfil', icon: '👤' },
    { path: '/platform/friends', text: 'Amigos', icon: '👥' },
    { path: '/platform/bate-papos', text: 'Bate-Papos', icon: '💬' },
    { path: '/platform/downloads', text: 'Downloads', icon: '📥' },
    { path: '/platform/buys', text: 'Minhas Compras', icon: '🛒' },
    { path: '/platform/wishlist', text: 'Lista de Desejos', icon: '❤️' },
];

function SidebarPlatform() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ nome_usuario: 'Carregando...', email: '', administrador: false });

    useEffect(() => {
        const userInfo = localStorage.getItem('user_info');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_info');
        navigate('/login', { replace: true });
    };

    return (
        <nav className="hidden lg:flex flex-col w-64 bg-[#1f2128] p-5 shadow-xl border-r border-gray-700/50 overflow-y-auto custom-scrollbar">
            <div className="text-2xl font-bold text-white mb-10 flex-shrink-0">
                Game-Wiki
            </div>

            <ul className="space-y-3 flex-grow">
                {/* Link do Admin - Renderizado condicionalmente */}
                {user.administrador && (
                    <li>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-md transition-colors duration-200 font-semibold ${isActive ? 'bg-amber-500 text-white' : 'text-amber-400 hover:bg-amber-500/20'
                                }`
                            }
                        >
                            <Shield size={18} />
                            <span>Painel Admin</span>
                        </NavLink>
                    </li>
                )}

                {/* Itens de navegação padrão */}
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

            <div className="flex-shrink-0">
                <div className="mt-auto flex items-center gap-3 pt-5 border-t border-gray-700/50">
                    <img src={`https://i.pravatar.cc/40?u=${user.email}`} alt="User Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-white">{user.nome_usuario}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 mt-4 p-2 rounded-md text-red-400 hover:bg-red-500/20 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-semibold">Sair</span>
                </button>
            </div>
        </nav>
    );
}

export default SidebarPlatform;