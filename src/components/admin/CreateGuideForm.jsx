// src/components/admin/CreateGuideForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateGuideForm = ({ onGuideCreated }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            // Converte a string de tags (separada por vírgula) em um array de texto para o PostgreSQL
            const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const guideDataToSave = {
                title: data.title,
                author: data.author,
                type: data.type,
                link: data.link,
                image_url: `/images/${data.imageFilename}`, // Usando o método da pasta /public
                tags: `{${tagsArray.join(',')}}`, // Formato de array do PostgreSQL
            };

            const response = await fetch(`${BASE_URL}/guides`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guideDataToSave),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar o guia. Status: ' + response.status);
            }

            setMessage('Guia criado com sucesso!');
            reset();
            if (onGuideCreated) onGuideCreated();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300">Título do Guia</label>
                <input type="text" {...register('title', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-slate-300">Autor</label>
                <input type="text" {...register('author')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="link" className="block text-sm font-medium text-slate-300">Link (URL)</label>
                <input type="url" {...register('link', { required: true })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-300">Tipo de Conteúdo</label>
                <select {...register('type')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md">
                    <option value="video">Vídeo</option>
                    <option value="text">Texto</option>
                </select>
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-300">Tags (separadas por vírgula)</label>
                <input type="text" placeholder="Sekiro, Platina, Souls-like" {...register('tags')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <div>
                <label htmlFor="imageFilename" className="block text-sm font-medium text-slate-300">Nome do Arquivo da Imagem</label>
                <input type="text" placeholder="ex: platina1.png" {...register('imageFilename')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">
                {isSubmitting ? 'Salvando...' : 'Salvar Guia'}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default CreateGuideForm;