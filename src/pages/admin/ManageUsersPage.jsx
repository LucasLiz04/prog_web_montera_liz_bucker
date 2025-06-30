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
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };
            const response = await fetch(`${BASE_URL}/rpc/fn_listar_usuarios`, { method: 'GET', headers: headers });
            if (!response.ok) throw new Error('Falha ao buscar os usuários.');
            const data = await response.json();
            setUsers(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserSaved = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        fetchUsers();
    };

    const handleOpenCreateModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
        const userToDelete = users.find(u => u.id === userId);
        if (window.confirm(`Tem certeza que deseja excluir o usuário "${userToDelete?.nome_usuario}"?`)) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                };
                const body = { id_usuario_input: userId };

                const response = await fetch(`${BASE_URL}/rpc/fn_excluir_usuario`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Falha ao excluir o usuário.');
                }

                alert('Usuário excluído com sucesso!');
                fetchUsers();
            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
                <button
                    onClick={handleOpenCreateModal}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Adicionar Usuário
                </button>
            </div>

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
                                        {/* CORREÇÃO AQUI: Usar i.pravatar.cc para avatar padrão */}
                                        <img className="h-10 w-10 rounded-full mr-4" src={user.avatar_url || `https://i.pravatar.cc/40?u=${user.email}`} alt={`Avatar de ${user.nome_usuario}`} />
                                        <div className="text-sm font-medium text-white">{user.nome_usuario}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-300">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.administrador ? 'bg-red-500/20 text-red-400' : 'bg-sky-500/20 text-sky-300'}`}>
                                        {user.administrador ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(user)} className="text-sky-400 hover:text-sky-300 p-1"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
                title={editingUser ? "Editar Usuário" : "Adicionar Novo Usuário"}
            >
                <CreateUserForm
                    onUserCreated={handleUserSaved}
                    userToEdit={editingUser}
                />
            </Modal>
        </div>
    );
};

export default ManageUsersPage;