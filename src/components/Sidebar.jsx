// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// Se você instalou react-feather ou react-icons, pode importar os ícones aqui
// Exemplo com react-feather (se usar):
// import { Home, Fire, DollarSign, Gaming, Book, MessageSquare, User, Clock } from 'react-feather';
// Ou com react-icons (se usar, precisaria de imports específicos, e.g. import { FaHome } from 'react-icons/fa';)

const navItems = [
    { path: '/', text: 'Início', icon: '🏠' }, // Use o ícone de sua preferência (SVG, react-icons, etc.)
    { path: '/em-alta', text: 'Em alta', icon: '🔥' },
    { path: '/promocoes', text: 'Promoções', icon: '💰' },
    { path: '/jogos', text: 'Jogos', icon: '🎮' },
    { path: '/guias', text: 'Guias', icon: '📚' },
    { path: '/bate-papos', text: 'Bate-Papos', icon: '💬' },
    { path: '/perfil', text: 'Perfil', icon: '👤' },
    { path: '/em-breve', text: 'Em breve...', icon: '⏳' },
];

function Sidebar({ isMobileMenuOpen, toggleMobileMenu }) {
    return (
        <>
            {/* Sidebar para Desktop */}
            <nav className="hidden lg:block w-64 bg-gray-800 p-4 shadow-xl">
                <h5 className="text-xl font-semibold mb-6 text-gray-300">Game Wiki</h5>
                <ul className="space-y-3">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-md transition duration-200 ${item.disabled
                                        ? 'text-gray-500 cursor-not-allowed'
                                        : isActive
                                            ? 'bg-blue-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                                aria-disabled={item.disabled}
                                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                                {/* Renderize seu ícone aqui. Ex: <Home size={20} /> ou o emoji do navItems. */}
                                <span>{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Offcanvas Sidebar para Mobile */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 shadow-xl z-40 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:hidden`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h5 className="text-xl font-semibold text-gray-300">Game Wiki</h5>
                    <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white text-2xl leading-none">
                        &times; {/* Ícone de fechar */}
                    </button>
                </div>
                <ul className="space-y-3">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={item.disabled ? (e) => e.preventDefault() : toggleMobileMenu}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-md transition duration-200 ${item.disabled
                                        ? 'text-gray-500 cursor-not-allowed'
                                        : isActive
                                            ? 'bg-blue-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                                aria-disabled={item.disabled}
                            >
                                <span>{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Sidebar;