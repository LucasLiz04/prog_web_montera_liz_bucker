// src/components/admin/CreateGameForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateGameForm = ({ onGameCreated }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            // --- PASSO 1: ENVIAR A IMAGEM PARA O NOSSO SERVIDOR DE UPLOAD ---
            const imageFile = data.coverImage[0];
            const formData = new FormData();
            formData.append('image', imageFile);

            // A requisição agora vai para o nosso servidor na porta 4000
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) throw new Error('Falha no upload da imagem.');

            const uploadResult = await uploadResponse.json();
            const imageUrlFromServer = uploadResult.filePath; // A URL que nosso servidor nos deu

            // --- PASSO 2: SALVAR A URL E OS OUTROS DADOS NO BANCO VIA POSTGREST ---
            const gameDataToSave = {
                title: data.title,
                description: data.description,
                coverUrl: imageUrlFromServer,
            };

            const apiResponse = await fetch(`${BASE_URL}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameDataToSave),
            });

            if (!apiResponse.ok) throw new Error('Falha ao salvar o jogo no banco de dados.');

            setMessage('Jogo e imagem salvos com sucesso!');
            reset();
            if (onGameCreated) onGameCreated();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // O JSX do formulário é o mesmo da versão do Cloudinary
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300">Título do Jogo</label>
                <input type="text" {...register('title', { required: 'Título é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300">Descrição</label>
                <textarea {...register('description')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"></textarea>
            </div>
            <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-slate-300">Imagem de Capa</label>
                <input type="file" {...register('coverImage', { required: 'Imagem é obrigatória' })} className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600/20 file:text-sky-300 hover:file:bg-sky-600/30" />
                {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
                {isSubmitting ? 'Enviando...' : 'Salvar Jogo'}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default CreateGameForm;