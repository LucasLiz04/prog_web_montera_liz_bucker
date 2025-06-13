// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import meuIcone from '../assets/gameWikiLogoBlackNoBg.png';
import { Eye, EyeOff, ArrowLeft } from 'react-feather';

const LoginPage = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('initial');
    const [isLoginTab, setIsLoginTab] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleInitialLoginClick = () => {
        setIsLoginTab(true);
        setViewMode('form');
        setErrors({});
    };

    const handleInitialSignUpClick = () => {
        setIsLoginTab(false);
        setViewMode('form');
        setErrors({});
    };

    // **FUNÇÃO DE VALIDAÇÃO ATUALIZADA**
    const validateForm = () => {
        const newErrors = {};
        // Expressão regular para validar o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validação para a aba de Registro
        if (!isLoginTab) {
            if (!fullName) newErrors.fullName = "O nome completo é obrigatório.";
            if (password !== confirmPassword) {
                newErrors.confirmPassword = "As senhas não coincidem. Tente novamente.";
            }
        }

        // Validação de E-mail
        if (!email) {
            newErrors.email = "O email é obrigatório.";
        } else if (!emailRegex.test(email)) {
            // AQUI VOCÊ EDITA A MENSAGEM DE E-MAIL INVÁLIDO
            newErrors.email = "Por favor, insira um formato de email válido.";
        }

        // Validação de Senha
        if (!password) newErrors.password = "A senha é obrigatória.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isFormValid = validateForm();

        if (isFormValid) {
            console.log("Formulário válido, enviando...");
            navigate('/platform');
        } else {
            console.log("Formulário inválido, verifique os erros.");
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#50A6D9] via-[#0653AF] to-[#020F55] min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md text-center glow-border">

                {viewMode === 'initial' && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Bem-vindo ao</h1>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <img src={meuIcone} alt="Logo GameWiki" className="h-24" />
                        </div>
                        <p className="text-gray-600 mb-8">
                            Sua central de jogos definitiva
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleInitialLoginClick}
                                className="bg-[#020F55] shadow-xl text-white font-medium py-2.5 px-4 rounded-md transition-transform duration-200 ease-in-out hover:scale-105"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleInitialSignUpClick}
                                className="bg-[#0653AF] shadow-xl text-white font-medium py-2.5 px-4 rounded-md transition-transform duration-200 ease-in-out hover:scale-105"
                            >
                                Sign-up
                            </button>
                            <button
                                onClick={() => navigate('/about-us')}
                                className="bg-[#50A6D9] shadow-xl text-white font-medium py-2.5 px-4 rounded-md transition-transform duration-200 ease-in-out hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Sobre nós
                            </button>
                        </div>
                    </>
                )}

                {viewMode === 'form' && (
                    <>
                        <button
                            onClick={() => {
                                setViewMode('initial');
                                setErrors({});
                            }}
                            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Voltar"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div className="flex mt-8 mb-5 rounded-lg overflow-hidden border border-gray-300">
                            <button
                                onClick={() => { setIsLoginTab(false); setErrors({}); }}
                                className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${!isLoginTab ? 'bg-[#0653AF] text-white focus:ring-[#0653AF]' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400'
                                    }`}
                            >
                                Registrar
                            </button>
                            <button
                                onClick={() => { setIsLoginTab(true); setErrors({}); }}
                                className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${isLoginTab ? 'bg-[#0653AF] text-white focus:ring-[#0653AF]' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400'
                                    }`}
                            >
                                Logar
                            </button>
                        </div>

                        <h2 className="text-xl font-semibold text-center text-gray-700 mb-5">
                            {isLoginTab ? 'Fazer o login' : 'Fazer registro'}
                        </h2>

                        {/* O atributo 'required' foi removido dos inputs */}
                        <form onSubmit={handleFormSubmit} className="space-y-4 text-left" noValidate>
                            {!isLoginTab && (
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">
                                        Nome Completo: <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}
                                        className={`w-full p-2.5 rounded-md border text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0653AF] focus:border-[#0653AF]'}`}
                                        placeholder="Seu nome completo"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                                    Email: {!isLoginTab && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full p-2.5 rounded-md border text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0653AF] focus:border-[#0653AF]'}`}
                                    placeholder="seuemail@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                                    Senha: {!isLoginTab && <span className="text-red-500">*</span>}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full p-2.5 pr-10 rounded-md border text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0653AF] focus:border-[#0653AF]'}`}
                                        placeholder="Sua senha"
                                    />
                                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            {!isLoginTab && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                                        Confirme sua senha: <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full p-2.5 pr-10 rounded-md border text-gray-700 placeholder-gray-400 focus:ring-2 focus:outline-none ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0653AF] focus:border-[#0653AF]'}`}
                                            placeholder="Confirme sua senha"
                                        />
                                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-[#0653AF] text-white font-semibold py-2.5 px-4 rounded-md transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#0653AF]"
                            >
                                {isLoginTab ? 'Logar' : 'Registrar'}
                            </button>
                        </form>
                        {isLoginTab && (
                            <div className="text-center mt-5">
                                <a href="#" className="text-sm text-[#0653AF] hover:underline">Esqueceu sua senha?</a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;