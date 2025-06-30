// src/components/admin/CreateUserForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateUserForm = ({ onUserCreated, userToEdit }) => {
    const isEditMode = Boolean(userToEdit);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isEditMode && userToEdit) {
            setValue('username', userToEdit.nome_usuario);
            setValue('email', userToEdit.email);
            setValue('role', userToEdit.administrador ? 'Admin' : 'User');
            setValue('avatarUrl', userToEdit.avatar_url || '');
            // NOTA: Senha não é pré-preenchida por segurança. O usuário precisará digitá-la.
        } else {
            reset();
        }
    }, [isEditMode, userToEdit, setValue, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            const innerJson = {
                nome_usuario: data.username,
                email: data.email,
                senha: data.password,
                administrador: data.role === 'Admin',
                avatar_url: data.avatarUrl || null
            };

            if (isEditMode) {
                innerJson.id = userToEdit.id;
            } else {
                innerJson.id = crypto.randomUUID();
            }

            const requestBody = { json_input: innerJson };

            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            const response = await fetch(`${BASE_URL}/rpc/fn_cadastrar_atualizar_usuario`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Falha ao salvar o usuário. Status: ${response.status}`);
            }

            setMessage(isEditMode ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
            reset();
            if (onUserCreated) onUserCreated();
        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300">Nome do Usuário</label>
                <input
                    type="text"
                    {...register('username', { required: 'Nome de usuário é obrigatório' })}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm"
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                <input
                    type="email"
                    {...register('email', { required: 'Email é obrigatório' })}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">Senha</label>
                <input
                    type="password"
                    {...register('password', { required: true })} // Senha SEMPRE obrigatória
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm"
                />
                {isEditMode && <p className="text-xs text-slate-400 mt-1">Para salvar alterações, digite a senha atual ou uma nova.</p>}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-300">Cargo (Role)</label>
                <select
                    {...register('role', { required: 'Cargo é obrigatório' })}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-300">URL do Avatar</label>
                <input
                    type="url"
                    {...register('avatarUrl')}
                    className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm"
                    placeholder="https://exemplo.com/imagem.png"
                />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Usuário')}
            </button>
            {message && <p className={`text-center mt-2 ${message.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
    );
};

export default CreateUserForm;