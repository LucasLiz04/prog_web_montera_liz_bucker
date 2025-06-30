// src/pages/admin/ManageGuidesPage.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/admin/Modal';
import CreateGuideForm from '../../components/admin/CreateGuideForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BASE_URL } from '../../services/api';
import { Edit, Trash2 } from 'react-feather';

const ManageGuidesPage = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGuide, setEditingGuide] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };

            // CORREÇÃO: Usando o nome correto da função 'fn_listar_todos_guias'
            const guidesPromise = fetch(`${BASE_URL}/rpc/fn_listar_todos_guias`, { method: 'GET', headers: headers });
            const categoriesPromise = fetch(`${BASE_URL}/rpc/fn_listar_categorias`, { method: 'GET', headers: headers });

            const [guidesResponse, categoriesResponse] = await Promise.all([guidesPromise, categoriesPromise]);

            if (!guidesResponse.ok) throw new Error('A API para listar guias falhou.');
            if (!categoriesResponse.ok) throw new Error('Falha ao buscar as categorias.');

            const guidesData = await guidesResponse.json();
            const categoriesData = await categoriesResponse.json();

            setGuides(guidesData);
            setAllCategories(categoriesData);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = () => {
        setEditingGuide(null);
        setIsModalOpen(true);
    };

    const handleEdit = (guide) => {
        setEditingGuide(guide);
        setIsModalOpen(true);
    };

    const handleGuideSaved = () => {
        setIsModalOpen(false);
        setEditingGuide(null);
        fetchData();
    };

    const handleDelete = async (guideId) => {
        const guideToDelete = guides.find(g => g.id === guideId);
        if (window.confirm(`Tem certeza que deseja excluir o guia "${guideToDelete?.titulo}"?`)) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                };
                const body = { id_guia_input: guideId };

                const response = await fetch(`${BASE_URL}/rpc/fn_excluir_guia`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Falha ao excluir o guia.');
                }

                alert('Guia excluído com sucesso!');
                fetchData();
            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Guias</h1>
                <button
                    onClick={handleCreate}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Adicionar Novo Guia
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Guia</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Autor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Tipo</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading && <tr><td colSpan="4"><LoadingSpinner /></td></tr>}
                        {error && <tr><td colSpan="4" className="text-center text-red-500 py-4">{error}</td></tr>}

                        {!loading && !error && guides.length === 0 && (
                            <tr><td colSpan="4" className="text-center text-slate-400 py-4">Nenhum guia encontrado.</td></tr>
                        )}

                        {!loading && !error && guides.map(guide => (
                            <tr key={guide.id} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 object-cover rounded-md mr-4" src={guide.imagem_url || 'https://via.placeholder.com/40'} alt={guide.titulo} />
                                        <div className="text-sm font-medium text-white">{guide.titulo}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-300">{guide.autor}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{guide.tipo}</td>
                                <td className="px-6 py-4 text-right text-sm space-x-2">
                                    <button onClick={() => handleEdit(guide)} className="text-sky-400 hover:text-sky-300 p-1"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(guide.id)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingGuide(null); }}
                title={editingGuide ? "Editar Guia" : "Adicionar Novo Guia"}
            >
                <CreateGuideForm
                    onGuideSaved={handleGuideSaved}
                    guideToEdit={editingGuide}
                    allCategories={allCategories}
                />
            </Modal>
        </div>
    );
};

export default ManageGuidesPage;