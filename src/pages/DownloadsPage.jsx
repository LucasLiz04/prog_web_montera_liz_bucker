// src/pages/DownloadsPage.jsx
import React, { useState } from 'react';
import ActiveDownload from '../components/ActiveDowload';
import DownloadListItem from '../components/DowloadListItem';
import PrototypeAlert from '../components/PrototypeAlert';

// Dados Fictícios (IMAGENS ATUALIZADAS)
const mockActiveDownload = {
    id: 1,
    name: 'Dark Souls II',
    coverUrl: 'https://imgs.search.brave.com/OKtyG52NxvoBFoh7DFV51cK_UolqwPQfDpDAWztROSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpETmxORGxs/WlRVdE1tWTBNaTAw/TlRnNUxUZ3hOVEl0/TWpBellqa3daalpp/TkdObFhrRXlYa0Zx/Y0djQC5qcGc', // Imagem de The Last of Us
    progress: 75,
    speed: '15.8 MB/s',
    timeLeft: '12 min',
    // Adicionando propriedades que ActiveDownload pode usar
    headerUrl: 'https://imgs.search.brave.com/OKtyG52NxvoBFoh7DFV51cK_UolqwPQfDpDAWztROSc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpETmxORGxs/WlRVdE1tWTBNaTAw/TlRnNUxUZ3hOVEl0/TWpBellqa3daalpp/TkdObFhrRXlYa0Zx/Y0djQC5qcGc', // Reutilizando a mesma imagem ou substitua por uma de cabeçalho
    title: 'Dark Souls II', // Título para o ActiveDownload
    downloaded: '25.6 GB', // Exemplo
    totalSize: '34.0 GB', // Exemplo
    timeRemaining: '12 min' // Exemplo
};

const mockUnscheduled = [
    { id: 2, name: 'Red Dead Redemption 2', coverUrl: 'https://imgs.search.brave.com/9GFvJb1qtM0VQYUA0NhWJj31LIO4bwGqh01-A0G6uZM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZWxkZW4tcmlu/Zy1waWN0dXJlcy02/cjg1dGgwZ25oaWZz/cWQwLmpwZw', size: '100 GB' }, // Imagem de Elden Ring (usada para RDR2)
    { id: 3, name: 'Stray', coverUrl: 'https://imgs.search.brave.com/9NH7fK1aUfEkdZYEtjpCQBvWoZhPsW3tKeranxY-1K0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM5LmthYnVtLmNv/bS5ici9wcm9kdXRv/cy9mb3Rvcy9zeW5j/X21pcmFrbC8yNjA4/OTkveGxhcmdlL0pv/Z28tSGFkZXMtUHM1/LVNPTllfMTczODY5/MDI2Ny5qcGc', size: '12 GB' }, // Imagem de Hades (usada para Stray)
];

const DownloadsPage = () => {
    const activeDownload = mockActiveDownload;
    const unscheduled = mockUnscheduled;
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="w-full">
            <PrototypeAlert
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
            />
            <div className="w-full">
                {activeDownload ? <ActiveDownload game={activeDownload} /> : <div className="text-center p-6 bg-slate-800 rounded-lg text-slate-400">Nenhum download ativo no momento.</div>}

                <div className="border-b border-slate-700 my-8"></div>

                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Não agendados <span className="text-base text-slate-400 font-normal">({unscheduled.length})</span>
                    </h3>
                    <div className="space-y-2">
                        {unscheduled.map(game => (
                            <DownloadListItem key={game.id} game={game} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadsPage;