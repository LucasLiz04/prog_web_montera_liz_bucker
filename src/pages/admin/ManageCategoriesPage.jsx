// src/pages/admin/ManageCategoriesPage.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/admin/Modal';
import CreateCategoryForm from '../../components/admin/CreateCategoryForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BASE_URL } from '../../services/api';
import { Edit, Trash2 } from 'react-feather';

const ManageCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };
            const response = await fetch(`${BASE_URL}/rpc/fn_listar_categorias`, { method: 'GET', headers: headers });
            if (!response.ok) throw new Error('Falha ao buscar as categorias.');
            const data = await response.json();
            setCategories(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = (category = null) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingCategory(null);
        setIsModalOpen(false);
    };

    const handleCategorySaved = () => {
        handleCloseModal();
        fetchCategories();
    };

    // CORREÇÃO: Implementando a função de deletar
    const handleDelete = async (categoryId) => {
        const categoryToDelete = categories.find(c => c.id === categoryId);
        if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryToDelete?.nome_categoria}"?`)) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                };
                const body = { id_categoria_input: categoryId };

                const response = await fetch(`${BASE_URL}/rpc/fn_excluir_categoria`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Falha ao excluir a categoria.');
                }

                alert('Categoria excluída com sucesso!');
                fetchCategories();
            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Adicionar Nova Categoria
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Nome da Categoria</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">ID</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading && <tr><td colSpan="3"><LoadingSpinner /></td></tr>}
                        {error && <tr><td colSpan="3" className="text-center text-red-500 py-4">{error}</td></tr>}
                        {!loading && !error && categories.map(category => (
                            <tr key={category.id} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 text-sm font-medium text-white">{category.nome_categoria}</td>
                                <td className="px-6 py-4 text-sm text-slate-300 font-mono">{category.id}</td>
                                <td className="px-6 py-4 text-right text-sm space-x-2">
                                    <button onClick={() => handleOpenModal(category)} className="text-sky-400 hover:text-sky-300 p-1"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCategory ? "Editar Categoria" : "Adicionar Nova Categoria"}
            >
                <CreateCategoryForm
                    onCategorySaved={handleCategorySaved}
                    categoryToEdit={editingCategory}
                />
            </Modal>
        </div>
    );
};

export default ManageCategoriesPage;