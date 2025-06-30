// src/pages/GuiasPlatformPage.jsx
import React, { useState, useEffect, useMemo } from 'react'; // Passo 1: Importar useState e useMemo
import GuideCard from '../components/GuideCard';
import { BookOpen, Search } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const GuiasPlatformPage = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Passo 2: Criar o estado para o termo de busca

    useEffect(() => {
        const fetchGuides = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const response = await fetch(`${BASE_URL}/rpc/fn_listar_todos_guias`, { method: 'GET', headers: headers });

                if (!response.ok) {
                    throw new Error(`A API para listar guias falhou.`);
                }

                const data = await response.json();
                setGuides(data);

            } catch (e) {
                setError(e.message);
                console.error("Falha ao buscar guias:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    // Passo 3: Filtrar os guias com base no searchTerm
    const filteredGuides = useMemo(() => {
        if (!searchTerm) {
            return guides; // Se a busca estiver vazia, retorna todos os guias
        }
        return guides.filter(guide =>
            guide.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.autor.toLowerCase().includes(searchTerm.toLowerCase())
            // O campo 'tags' não existe mais, então removemos a busca por ele.
        );
    }, [searchTerm, guides]);


    return (
        <div className="w-full">
            <header className="text-center mb-10">
                <div className="inline-block bg-sky-500/20 p-4 rounded-full mb-4">
                    <BookOpen size={40} className="text-sky-400" />
                </div>
                <h1 className="text-4xl font-bold text-white">Guias e Tutoriais</h1>
                <p className="text-lg text-slate-400 mt-2">Encontre o caminho para suas conquistas e platinas.</p>

                <div className="relative max-w-lg mx-auto mt-6">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Buscar por jogo, conquista, etc..."
                        className="w-full bg-[#062448] border-2 border-slate-700 focus:border-sky-500 text-white rounded-lg py-3 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
                        // Passo 4: Conectar o input ao estado
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading && <LoadingSpinner />}

                {error && <div className="col-span-full text-center text-red-500 font-semibold p-4 bg-red-500/10 rounded-lg">{error}</div>}

                {/* Passo 5: Exibir os guias filtrados */}
                {!loading && !error && filteredGuides.length === 0 && (
                    <div className="col-span-full text-center text-slate-400">
                        {searchTerm ? `Nenhum guia encontrado para "${searchTerm}".` : "Nenhum guia encontrado no momento."}
                    </div>
                )}

                {!loading && !error && filteredGuides.map(guide => (
                    <GuideCard
                        key={guide.id}
                        guide={{
                            id: guide.id,
                            title: guide.titulo,
                            author: guide.autor,
                            type: guide.tipo,
                            link: guide.link,
                            image_url: guide.imagem_url,
                            tags: [] // O campo tags não vem da API
                        }}
                    />
                ))}
            </main>
        </div>
    );
};

export default GuiasPlatformPage;