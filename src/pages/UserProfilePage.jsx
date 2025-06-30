// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [gamesOwnedCount, setGamesOwnedCount] = useState(0); // NOVO: Estado para contagem de jogos possuídos
    const [wishlistCount, setWishlistCount] = useState(0);     // NOVO: Estado para contagem de itens na lista de desejos
    const [isAdmin, setIsAdmin] = useState(false);             // NOVO: Estado para status de administrador
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfileData = async () => { // Renomeado para ser mais abrangente
            setLoading(true);
            setError(null);
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const userId = userInfo?.id;

            if (!userId) {
                setError('Usuário não logado ou ID do usuário não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };

                // Busca paralela para dados do perfil, jogos possuídos e lista de desejos
                const [
                    profileResponse,
                    gamesOwnedResponse,
                    wishlistResponse
                ] = await Promise.all([
                    fetch(`${BASE_URL}/rpc/fn_buscar_usuario?id_usuario_input=${userId}`, { headers }),
                    fetch(`${BASE_URL}/rpc/fn_listar_vendas_usuario?id_usuario_input=${userId}`, { headers }),
                    fetch(`${BASE_URL}/rpc/fn_listar_lista_desejos_usuario?id_usuario_input=${userId}`, { headers })
                ]);

                if (!profileResponse.ok) throw new Error('Falha ao buscar detalhes do usuário.');
                if (!gamesOwnedResponse.ok) console.error('Falha ao buscar jogos possuídos.'); // Logar, mas não bloquear
                if (!wishlistResponse.ok) console.error('Falha ao buscar lista de desejos.'); // Logar, mas não bloquear

                const profileData = await profileResponse.json();
                const gamesOwnedData = gamesOwnedResponse.ok ? await gamesOwnedResponse.json() : [];
                const wishlistData = wishlistResponse.ok ? await wishlistResponse.json() : [];

                if (profileData && profileData.length > 0) {
                    const fetchedUser = profileData[0];
                    setUserProfile({
                        username: fetchedUser.nome_usuario,
                        avatarUrl: fetchedUser.avatar_url || `https://avatar.iran.liara.run/public/boy?username=${fetchedUser.nome_usuario}`,
                        email: fetchedUser.email,
                        level: null, // Não fornecido pela API
                        about: null, // Não fornecido pela API
                    });
                    setIsAdmin(fetchedUser.administrador); // Define o status de administrador
                } else {
                    setError('Usuário não encontrado na API.');
                }

                // Contagens dinâmicas
                setGamesOwnedCount(gamesOwnedData.length);
                setWishlistCount(wishlistData.length);

            } catch (e) {
                setError(e.message);
                console.error("Erro ao buscar dados do perfil:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfileData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
    if (!userProfile) return null;

    return (
        <div className="w-full flex flex-col items-center p-4"> {/* Centralizando o card principal */}
            <div className="w-full max-w-md"> {/* Limitar largura para centralizar melhor */}
                <ProfileCard user={userProfile} />

                {/* NOVO: Bloco de Informações Dinâmicas Adicionais */}
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-6 border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">Informações Adicionais</h3>
                    <div className="space-y-3 text-slate-300">
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Cargo:</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isAdmin ? 'bg-red-500/20 text-red-400' : 'bg-sky-500/20 text-sky-300'}`}>
                                {isAdmin ? 'Administrador' : 'Usuário Padrão'}
                            </span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Jogos na Biblioteca:</span>
                            <span className="text-white font-medium">{gamesOwnedCount}</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Jogos na Lista de Desejos:</span>
                            <span className="text-white font-medium">{wishlistCount}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;