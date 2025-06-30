// src/pages/admin/SettingsPage.jsx
import React, { useState } from 'react'; // NOVO: Importa useState
import PrototypeAlert from '../../components/PrototypeAlert'; // NOVO: Importa PrototypeAlert

const SettingsPage = () => {
    // NOVO: Estado para controlar a visibilidade do alerta
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div>
            {/* NOVO: Renderiza o componente do alerta */}
            <PrototypeAlert
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
            />

            <h1 className="text-3xl font-bold mb-6">Configurações da Plataforma</h1>

            <div className="space-y-8 max-w-2xl">
                {/* Seção de Configurações Gerais */}
                <section className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Gerais</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="siteName" className="block text-sm font-medium text-slate-300">Nome do Site</label>
                            <input type="text" id="siteName" defaultValue="G-Platform" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Modo Manutenção</span>
                            <label htmlFor="maintenanceMode" className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" id="maintenanceMode" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Seção de Configurações de Aparência */}
                <section className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Aparência</h2>
                    <div>
                        <label htmlFor="logoUpload" className="block text-sm font-medium text-slate-300">Logo do Site</label>
                        <input type="file" id="logoUpload" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600/20 file:text-sky-300 hover:file:bg-sky-600/30" />
                    </div>
                </section>

                <div className="flex justify-end">
                    <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;