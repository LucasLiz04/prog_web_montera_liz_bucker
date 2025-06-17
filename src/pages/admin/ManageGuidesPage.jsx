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

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/guides?order=id.desc`);
            if (!response.ok) throw new Error('Falha ao buscar os guias.');
            const data = await response.json();
            setGuides(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuides();
    }, []);

    const handleGuideCreated = () => {
        setIsModalOpen(false);
        fetchGuides();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Guias</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
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
                        {!loading && !error && guides.map(guide => (
                            <tr key={guide.id} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 object-cover rounded-md mr-4" src={guide.image_url || 'https://via.placeholder.com/40'} alt={guide.title} />
                                        <div className="text-sm font-medium text-white">{guide.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-300">{guide.author}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{guide.type}</td>
                                <td className="px-6 py-4 text-right text-sm space-x-2">
                                    <button className="text-sky-400 hover:text-sky-300 p-1"><Edit size={18} /></button>
                                    <button className="text-red-500 hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Guia">
                <CreateGuideForm onGuideCreated={handleGuideCreated} />
            </Modal>
        </div>
    );
};

export default ManageGuidesPage;
