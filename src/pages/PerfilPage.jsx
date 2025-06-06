// src/pages/PerfilPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';

function PerfilPage() {
    // Função simples para o alerta de redefinir senha
    const redefinirSenha = () => {
        alert('Um link para redefinir sua senha foi enviado para o seu e-mail.');
    };

    return (
        <>
            <HeroSection
                title="Seu Perfil"
                description="Gerencie suas informações pessoais e configurações."
            />
            <div className="flex justify-center mt-8"> {/* Centraliza o card de perfil */}
                <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 text-center max-w-md w-full">
                    {/* Imagem do avatar - certifique-se que avatar.png está em src/images/ */}
                    <img
                        src="./src/images/avatar.png" // <-- Caminho da imagem, ajuste se necessário para seu setup
                        alt="Avatar do Usuário"
                        className="rounded-full w-36 h-36 object-cover mx-auto mb-4" // w-36 h-36 para 150x150px
                    />
                    <h3 className="text-2xl font-bold mb-2">Joao da Silva</h3>
                    <p className="text-gray-400 mb-1">Email: joao_gamer@gmail.com</p>
                    <p className="text-gray-400 mb-4">Membro desde: Janeiro de 2025</p>
                    <button
                        onClick={redefinirSenha}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Redefinir Senha
                    </button>
                </div>
            </div>
        </>
    );
}
export default PerfilPage;