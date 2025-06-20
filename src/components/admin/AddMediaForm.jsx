// src/components/admin/AddMediaForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const AddMediaForm = ({ gameId, mediaType, onMediaAdded }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            let response;
            if (mediaType === 'screenshot') {
                // --- Lógica para Screenshot ---
                const imageFile = data.mediaFile[0];
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadResponse = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) throw new Error('Falha no upload da imagem.');
                const uploadResult = await uploadResponse.json();

                const mediaData = {
                    game_id: gameId,
                    image_url: uploadResult.filePath,
                };

                response = await fetch(`${BASE_URL}/screenshots`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mediaData)
                });

            } else if (mediaType === 'video') {
                // --- Lógica para Vídeo ---
                const mediaData = {
                    game_id: gameId,
                    video_url: data.video_url,
                    title: data.title
                };

                response = await fetch(`${BASE_URL}/videos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mediaData)
                });
            }

            // ===========================================================
            // CORREÇÃO: Verifica se a resposta da API do banco de dados foi bem-sucedida
            // ===========================================================
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Falha ao salvar ${mediaType} no banco.`);
            }
            // ===========================================================

            setMessage('Mídia adicionada com sucesso!');
            reset();
            if (onMediaAdded) onMediaAdded();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            {mediaType === 'screenshot' && (
                <div>
                    <label htmlFor="mediaFile" className="block text-sm font-medium text-slate-300">Arquivo de Imagem</label>
                    <input
                        type="file"
                        {...register('mediaFile', { required: 'Arquivo é obrigatório' })}
                        className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600/20 file:text-sky-300 hover:file:bg-sky-600/30"
                    />
                    {errors.mediaFile && <p className="text-red-500 text-xs mt-1">{errors.mediaFile.message}</p>}
                </div>
            )}

            {mediaType === 'video' && (
                <>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300">Título do Vídeo</label>
                        <input type="text" {...register('title', { required: 'Título é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="video_url" className="block text-sm font-medium text-slate-300">URL do Vídeo</label>
                        <input type="url" {...register('video_url', { required: 'URL é obrigatória' })} placeholder="https://www.youtube.com/watch?v=..." className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
                        {errors.video_url && <p className="text-red-500 text-xs mt-1">{errors.video_url.message}</p>}
                    </div>
                </>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                {isSubmitting ? 'Enviando...' : 'Adicionar Mídia'}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default AddMediaForm;