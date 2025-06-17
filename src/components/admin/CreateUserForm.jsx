// src/components/admin/CreateUserForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const CreateUserForm = ({ onUserCreated }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            // O endpoint para criar usuários no PostgREST
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar o usuário. Status: ' + response.status);
            }

            setMessage('Usuário criado com sucesso!');
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
                <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
                <input type="text" {...register('username', { required: 'Username é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm" />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                <input type="email" {...register('email', { required: 'Email é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-300">Cargo (Role)</label>
                <select {...register('role', { required: 'Cargo é obrigatório' })} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm">
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-300">URL do Avatar</label>
                <input type="url" {...register('avatarUrl')} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
                {isSubmitting ? 'Salvando...' : 'Salvar Usuário'}
            </button>
            {message && <p className="text-center mt-2">{message}</p>}
        </form>
    );
};

export default CreateUserForm;