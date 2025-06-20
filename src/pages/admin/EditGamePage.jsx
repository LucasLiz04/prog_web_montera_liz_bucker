// src/pages/admin/EditGamePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import CreateGameForm from '../../components/admin/CreateGameForm';
import AddMediaForm from '../../components/admin/AddMediaForm';
import Modal from '../../components/admin/Modal';
import { Video, XCircle, Plus, ArrowLeft } from 'react-feather';

const MediaGallery = ({ screenshots, videos, onDeleteScreenshot, onDeleteVideo, onAddMedia }) => (<div className="mt-8 bg-slate-900 border border-slate-700 p-4 rounded-lg"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-bold text-white">Gerenciar Mídia</h2> <div className="flex gap-2"> <button onClick={() => onAddMedia('screenshot')} className="bg-sky-600/50 hover:bg-sky-600 text-white text-xs font-semibold py-1 px-3 rounded-md flex items-center gap-1"> <Plus size={14} /> Screenshot </button> <button onClick={() => onAddMedia('video')} className="bg-sky-600/50 hover:bg-sky-600 text-white text-xs font-semibold py-1 px-3 rounded-md flex items-center gap-1"> <Plus size={14} /> Vídeo </button> </div> </div> <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"> {screenshots.map(ss => (<div key={ss.id} className="relative group"> <img src={ss.image_url.replace('t_screenshot_big', 't_screenshot_med')} alt="Screenshot" className="rounded-lg object-cover w-full h-full aspect-video" /> <button onClick={() => onDeleteScreenshot(ss.id)} className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"> <XCircle size={20} /> </button> </div>))} {videos.map(video => (<div key={video.id} className="relative group flex justify-center items-center bg-black rounded-lg aspect-video"> <p className="z-10 text-white font-bold text-center px-2">{video.title}</p> <Video className="absolute text-white/70" size={48} /> <button onClick={() => onDeleteVideo(video.id)} className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"> <XCircle size={20} /> </button> </div>))} </div> {screenshots.length === 0 && videos.length === 0 && (<p className="text-center text-slate-400 py-4">Nenhuma mídia adicionada.</p>)} </div>);

const EditGamePage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [mediaTypeToAdd, setMediaTypeToAdd] = useState(null);

    // =================================================================
    // CORREÇÃO PRINCIPAL: Simplificamos a declaração da função
    // e a forma como ela é chamada, removendo o useCallback.
    // =================================================================
    const fetchData = async () => {
        // Não definimos como useCallback para garantir que ela seja sempre "nova"
        setLoading(true);
        try {
            const gamePromise = fetch(`${BASE_URL}/games?id=eq.${id}&select=*,categories(*),screenshots(*),videos(*)`);
            const categoriesPromise = fetch(`${BASE_URL}/categories?order=name.asc`);

            const [gameResponse, categoriesResponse] = await Promise.all([gamePromise, categoriesPromise]);

            if (!gameResponse.ok) throw new Error('Falha ao buscar detalhes do jogo.');
            if (!categoriesResponse.ok) throw new Error('Falha ao buscar categorias.');

            const gameData = await gameResponse.json();
            const categoriesData = await categoriesResponse.json();

            if (gameData.length === 0) throw new Error('Jogo não encontrado.');

            setGame(gameData[0]);
            setAllCategories(categoriesData);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // O useEffect agora só depende do 'id'. Ele chamará a função fetchData
    // sempre que a página for carregada pela primeira vez ou o ID mudar.
    useEffect(() => {
        fetchData();
    }, [id]);

    const handleAddMedia = (type) => {
        setMediaTypeToAdd(type);
        setIsMediaModalOpen(true);
    };

    const handleMediaAdded = () => {
        setIsMediaModalOpen(false);
        setMediaTypeToAdd(null);
        fetchData(); // Chama a função para re-buscar TODOS os dados e atualizar a tela.
    };

    const deleteMedia = async (endpoint, mediaId, confirmationMessage) => {
        if (window.confirm(confirmationMessage)) {
            try {
                const response = await fetch(`${BASE_URL}/${endpoint}?id=eq.${mediaId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Falha ao deletar mídia.');
                fetchData(); // Re-busca os dados para atualizar a tela.
            } catch (e) {
                alert(`Erro: ${e.message}`);
            }
        }
    };

    const handleDeleteScreenshot = (screenshotId) => deleteMedia('screenshots', screenshotId, 'Deletar este screenshot?');
    const handleDeleteVideo = (videoId) => deleteMedia('videos', videoId, 'Deletar este vídeo?');

    const handleGameSaved = () => {
        alert('Detalhes do jogo salvos com sucesso!');
        fetchData(); // Re-busca os dados para atualizar a tela.
    };

    if (loading && !game) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
    // Evita erro se o jogo ainda não carregou
    if (!game) return null;

    return (
        <div>
            <Link to="/admin/manage-games" className="flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6">
                <ArrowLeft size={20} />
                Voltar para a lista de jogos
            </Link>

            <h1 className="text-3xl font-bold mb-6">Editando: {game.title}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Detalhes Principais</h2>
                    <CreateGameForm
                        onGameSaved={handleGameSaved}
                        gameToEdit={game}
                        allCategories={allCategories}
                    />
                </div>
                <div>
                    <MediaGallery
                        screenshots={game.screenshots || []}
                        videos={game.videos || []}
                        onDeleteScreenshot={handleDeleteScreenshot}
                        onDeleteVideo={handleDeleteVideo}
                        onAddMedia={handleAddMedia}
                    />
                </div>
            </div>

            <Modal isOpen={isMediaModalOpen} onClose={() => setIsMediaModalOpen(false)} title={`Adicionar ${mediaTypeToAdd}`}>
                <AddMediaForm gameId={game.id} mediaType={mediaTypeToAdd} onMediaAdded={handleMediaAdded} />
            </Modal>
        </div>
    );
};

export default EditGamePage;