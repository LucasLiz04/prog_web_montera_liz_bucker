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
            setValue('nome', gameToEdit.nome);
            setValue('descricao', gameToEdit.descricao);
            setValue('preco', gameToEdit.preco);
            setValue('requisitos', gameToEdit.requisitos || '');
            setValue('avaliacao', gameToEdit.avaliacao || '');
            setValue('id_categoria', gameToEdit.id_categoria || '');
            setCurrentCover(gameToEdit.imagem_url);
        } else {
            reset();
            setCurrentCover(null);
        }
    }, [isEditMode, gameToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            let imageUrl = gameToEdit?.imagem_url;

            if (data.coverImage && data.coverImage[0]) {
                const formData = new FormData();
                formData.append('image', data.coverImage[0]);
                const uploadResponse = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) throw new Error('Falha no upload da imagem.');
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.filePath;
            }

            const innerJson = {
                nome: data.nome,
                id_categoria: data.id_categoria ? data.id_categoria : null,
                preco: data.preco,
                descricao: data.descricao,
                requisitos: data.requisitos,
                avaliacao: data.avaliacao ? parseInt(data.avaliacao, 10) : null,
                imagem_url: imageUrl
            };

            if (isEditMode) {
                innerJson.id = gameToEdit.id;
            } else {
                innerJson.id = crypto.randomUUID();
            }

            const requestBody = { json_input: innerJson };

            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            const response = await fetch(`${BASE_URL}/rpc/fn_cadastrar_atualizar_jogo`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar o jogo.');
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
            <div><label className="block text-sm font-medium text-slate-300">Nome do Jogo</label><input {...register('nome', { required: 'Nome é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-300">Descrição</label><textarea {...register('descricao')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"></textarea></div>
            <div><label className="block text-sm font-medium text-slate-300">Requisitos</label><textarea {...register('requisitos')} placeholder="Ex: Processador i5, 8GB RAM, GTX 1060" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"></textarea></div>
            <div><label className="block text-sm font-medium text-slate-300">Preço</label><input type="text" {...register('preco')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-300">Avaliação (Nota 0-10)</label><input type="number" min="0" max="10" {...register('avaliacao')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" /></div>

            <div>
                <label htmlFor="id_categoria" className="block text-sm font-medium text-slate-300">Categoria</label>
                <select {...register('id_categoria', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md">
                    <option value="">Selecione uma categoria</option>
                    {/* CORREÇÃO: O 'value' agora é o ID, e o texto exibido é o nome */}
                    {allCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome_categoria}</option>
                    ))}
                </select>
                {errors.id_categoria && <p className="text-red-500 text-xs mt-1">É obrigatório selecionar uma categoria.</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300">Imagem de Capa</label>
                {currentCover && <img src={currentCover} alt="Capa atual" className="w-24 h-32 object-cover rounded my-2" />}
                <input type="file" {...register('coverImage')} className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600/20 file:text-sky-300 hover:file:bg-sky-600/30" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Jogo')}
            </button>
            {message && <p className={`text-center mt-2 ${message.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
    );
};

export default CreateGameForm;