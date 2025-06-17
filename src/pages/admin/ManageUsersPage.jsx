// src/pages/admin/ManageUsersPage.jsx
import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import CreateUserForm from '../../components/admin/CreateUserForm';
import Modal from '../../components/admin/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BASE_URL } from '../../services/api';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para buscar os usuários da API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/users?order=id.asc`);
            if (!response.ok) throw new Error('Falha ao buscar os usuários.');
            const data = await response.json();
            setUsers(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para buscar os usuários quando a página carrega
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = () => {
        setIsModalOpen(false); // Fecha o modal
        fetchUsers(); // Atualiza a lista de usuários
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Adicionar Usuário
                </button>
            </div>

            {/* Tabela de Usuários */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nome</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Cargo</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading && (
                            <tr><td colSpan="4"><LoadingSpinner /></td></tr>
                        )}
                        {error && (
                            <tr><td colSpan="4" className="text-center text-red-500 py-4">{error}</td></tr>
                        )}
                        {!loading && !error && users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full mr-4" src={user.avatarUrl || 'https://via.placeholder.com/40'} alt="" />
                                        <div className="text-sm font-medium text-white">{user.username}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-300">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-500/20 text-red-400' :
                                        user.role === 'Moderator' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-sky-500/20 text-sky-300'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button className="text-sky-400 hover:text-sky-300 p-1"><Edit size={18} /></button>
                                    <button className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para criar um novo usuário */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Usuário">
                <CreateUserForm onUserCreated={handleUserCreated} />
            </Modal>
        </div>
    );
};

export default ManageUsersPage;