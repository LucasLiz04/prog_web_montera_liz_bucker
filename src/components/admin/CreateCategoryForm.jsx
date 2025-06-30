// src/components/admin/CreateCategoryForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateCategoryForm = ({ onCategorySaved, categoryToEdit }) => {
    const isEditMode = Boolean(categoryToEdit);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isEditMode && categoryToEdit) {
            setValue('nome_categoria', categoryToEdit.nome_categoria);
            // Preenche o campo de descrição se estiver editando
            setValue('descricao', categoryToEdit.descricao || '');
        } else {
            reset();
        }
    }, [isEditMode, categoryToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            // CORREÇÃO: Adicionado o campo 'descricao' ao objeto
            const innerJson = {
                nome_categoria: data.nome_categoria,
                descricao: data.descricao
            };

            if (isEditMode) {
                innerJson.id = categoryToEdit.id;
            } else {
                innerJson.id = crypto.randomUUID();
            }

            const requestBody = { json_input: innerJson };

            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            const response = await fetch(`${BASE_URL}/rpc/fn_cadastrar_atualizar_categoria`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar a categoria.');
            }

            setMessage('Categoria salva com sucesso!');
            reset();
            if (onCategorySaved) onCategorySaved();

        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="nome_categoria" className="block text-sm font-medium text-slate-300">Nome da Categoria</label>
                <input
                    type="text"
                    {...register('nome_categoria', { required: 'O nome é obrigatório' })}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"
                />
                {errors.nome_categoria && <p className="text-red-500 text-xs mt-1">{errors.nome_categoria.message}</p>}
            </div>

            {/* CAMPO DE DESCRIÇÃO ADICIONADO */}
            <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-slate-300">Descrição</label>
                <textarea
                    {...register('descricao', { required: 'A descrição é obrigatória' })}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md"
                    rows="3"
                ></textarea>
                {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">
                {isSubmitting ? 'Salvando...' : 'Salvar Categoria'}
            </button>
            {message && <p className={`text-center mt-2 ${message.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
    );
};

export default CreateCategoryForm;