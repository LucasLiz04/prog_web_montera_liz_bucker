// src/components/admin/CreateGameForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateGameForm = ({ onGameSaved, gameToEdit, allCategories = [] }) => {
    const isEditMode = Boolean(gameToEdit);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [currentCover, setCurrentCover] = useState(null);

    useEffect(() => {
        if (isEditMode && gameToEdit) {
            Object.keys(gameToEdit).forEach(key => {
                if (key !== 'categories' && key !== 'coverImage') {
                    setValue(key, gameToEdit[key]);
                }
            });
            setCurrentCover(gameToEdit.cover_url);

            if (gameToEdit.categories && allCategories.length > 0) {
                const categoryIds = gameToEdit.categories.map(cat => cat.id.toString());
                allCategories.forEach(cat => {
                    setValue(`categories.${cat.id}`, categoryIds.includes(cat.id.toString()));
                });
            }
        } else {
            reset();
            setCurrentCover(null);
        }
    }, [isEditMode, gameToEdit, setValue, reset, allCategories]);

    const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            let imageUrl = gameToEdit?.cover_url;
            if (data.coverImage && data.coverImage[0]) {
                const formData = new FormData();
                formData.append('image', data.coverImage[0]);
                const uploadResponse = await fetch('http://localhost:4000/upload', { method: 'POST', body: formData });
                if (!uploadResponse.ok) throw new Error('Falha no upload da imagem.');
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.filePath;
            }

            const gameDataToSave = {
                title: data.title, description: data.description, cover_url: imageUrl, slug: data.slug || generateSlug(data.title),
                price: data.price, developer: data.developer,
            };

            let gameId = gameToEdit?.id;
            if (isEditMode) {
                await fetch(`${BASE_URL}/games?id=eq.${gameId}`, {
                    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gameDataToSave)
                });
            } else {
                // MODO CRIAÇÃO: Adicionamos o header 'Prefer' aqui
                const response = await fetch(`${BASE_URL}/games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation' // <-- ESTA É A CORREÇÃO
                    },
                    body: JSON.stringify(gameDataToSave)
                });
                if (!response.ok) throw new Error('Falha ao criar o jogo.');
                const newGame = await response.json();
                gameId = newGame[0].id;
            }

            await fetch(`${BASE_URL}/game_categories?game_id=eq.${gameId}`, { method: 'DELETE' });

            const selectedCategoryIds = data.categories ? Object.keys(data.categories).filter(id => data.categories[id]) : [];
            if (selectedCategoryIds.length > 0) {
                const categoryLinks = selectedCategoryIds.map(catId => ({
                    game_id: gameId,
                    category_id: parseInt(catId)
                }));
                await fetch(`${BASE_URL}/game_categories`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(categoryLinks)
                });
            }

            setMessage('Jogo salvo com sucesso!');
            if (onGameSaved) onGameSaved();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-300">Título</label><input {...register('title', { required: 'Título é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-300">Slug</label><input {...register('slug')} placeholder="Deixe em branco para gerar automaticamente" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-300">Descrição</label><textarea {...register('description')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"></textarea></div>
            <div><label className="block text-sm font-medium text-slate-300">Desenvolvedor</label><input {...register('developer')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-300">Preço</label><input type="number" step="0.01" {...register('price')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Categorias</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-800/50 rounded-md max-h-40 overflow-y-auto">
                    {allCategories.map(cat => (
                        <div key={cat.id} className="flex items-center">
                            <input id={`cat-${cat.id}`} type="checkbox" {...register(`categories.${cat.id}`)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                            <label htmlFor={`cat-${cat.id}`} className="ml-2 block text-sm text-slate-300">{cat.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300">Imagem de Capa</label>
                {currentCover && <img src={currentCover} alt="Capa atual" className="w-24 h-32 object-cover rounded my-2" />}
                <input type="file" {...register('coverImage', { required: !isEditMode })} className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600/20 file:text-sky-300 hover:file:bg-sky-600/30" />
                {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Jogo')}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default CreateGameForm;