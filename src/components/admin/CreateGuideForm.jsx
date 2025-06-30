// src/components/admin/CreateGuideForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateGuideForm = ({ onGuideSaved, guideToEdit, allCategories = [] }) => {
    const isEditMode = Boolean(guideToEdit);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isEditMode && guideToEdit) {
            setValue('titulo', guideToEdit.titulo);
            setValue('autor', guideToEdit.autor);
            setValue('link', guideToEdit.link);
            setValue('tipo', guideToEdit.tipo);
            setValue('imagem_url', guideToEdit.imagem_url);
            setValue('id_categoria', guideToEdit.id_categoria);
        } else {
            reset();
        }
    }, [isEditMode, guideToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            const innerJson = {
                titulo: data.titulo,
                autor: data.autor,
                tipo: data.tipo,
                link: data.link,
                imagem_url: data.imagem_url,
                id_categoria: data.id_categoria ? data.id_categoria : null,
            };

            if (isEditMode) {
                innerJson.id = guideToEdit.id;
            } else {
                innerJson.id = crypto.randomUUID();
            }

            const requestBody = { json_input: innerJson };

            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            const response = await fetch(`${BASE_URL}/rpc/fn_cadastrar_atualizar_guia`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar o guia.');
            }

            setMessage(isEditMode ? 'Guia atualizado com sucesso!' : 'Guia criado com sucesso!');
            reset();
            if (onGuideSaved) onGuideSaved();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-slate-300">Título do Guia</label>
                <input type="text" {...register('titulo', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="autor" className="block text-sm font-medium text-slate-300">Autor</label>
                <input type="text" {...register('autor')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="link" className="block text-sm font-medium text-slate-300">Link (URL)</label>
                <input type="url" {...register('link', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="imagem_url" className="block text-sm font-medium text-slate-300">URL da Imagem</label>
                <input type="text" placeholder="http://exemplo.com/imagem.png" {...register('imagem_url')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-slate-300">Tipo de Conteúdo</label>
                <select {...register('tipo')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md">
                    <option value="video">Vídeo</option>
                    <option value="text">Texto</option>
                </select>
            </div>

            <div>
                <label htmlFor="id_categoria" className="block text-sm font-medium text-slate-300">Categoria</label>
                <select {...register('id_categoria', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md">
                    <option value="">Selecione uma categoria</option>
                    {/* CORREÇÃO: O 'value' agora é o ID, e o texto exibido é o nome */}
                    {allCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome_categoria}</option>
                    ))}
                </select>
                {errors.id_categoria && <p className="text-red-500 text-xs mt-1">É necessário selecionar uma categoria.</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Guia')}
            </button>
            {message && <p className={`text-center mt-2 ${message.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
    );
};

export default CreateGuideForm;