// src/components/admin/CreateGuideForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

// 1. O componente agora aceita as props onGuideSaved e guideToEdit
const CreateGuideForm = ({ onGuideSaved, guideToEdit }) => {
    // 2. Determina se o formulário está em modo de edição
    const isEditMode = Boolean(guideToEdit);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // 3. useEffect para preencher o formulário quando estiver em modo de edição
    useEffect(() => {
        if (isEditMode && guideToEdit) {
            // Preenche cada campo do formulário com os dados do guia
            setValue('title', guideToEdit.title);
            setValue('author', guideToEdit.author);
            setValue('link', guideToEdit.link);
            setValue('type', guideToEdit.type);
            // Converte o array de tags em uma string separada por vírgula
            setValue('tags', guideToEdit.tags.join(', '));
            // Extrai apenas o nome do arquivo da URL da imagem
            setValue('imageFilename', guideToEdit.image_url.split('/').pop());
        } else {
            // Limpa o formulário se não estiver em modo de edição
            reset();
        }
    }, [isEditMode, guideToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            // Converte a string de tags em um array de texto para o PostgreSQL
            const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const guideDataToSave = {
                title: data.title,
                author: data.author,
                type: data.type,
                link: data.link,
                image_url: `/images/${data.imageFilename}`,
                tags: `{${tagsArray.join(',')}}`, // Formato de array do PostgreSQL
            };

            let response;
            // 4. Lógica de envio diferente para criar e editar
            if (isEditMode) {
                // MODO EDIÇÃO: Usa o método PATCH e a URL com o ID do guia
                response = await fetch(`${BASE_URL}/guides?id=eq.${guideToEdit.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(guideDataToSave),
                });
                if (!response.ok) throw new Error('Falha ao atualizar o guia.');

            } else {
                // MODO CRIAÇÃO: Usa o método POST
                response = await fetch(`${BASE_URL}/guides`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(guideDataToSave),
                });
                if (!response.ok) throw new Error('Falha ao criar o guia.');
            }

            setMessage(isEditMode ? 'Guia atualizado com sucesso!' : 'Guia criado com sucesso!');
            reset();
            // A props agora se chama onGuideSaved
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

            {/* O texto do botão muda de acordo com o modo */}
            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Guia')}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default CreateGuideForm;