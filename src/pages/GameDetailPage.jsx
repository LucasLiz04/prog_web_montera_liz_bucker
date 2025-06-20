// src/pages/GameDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Star, Video, Send } from 'react-feather';

// (O componente MediaGallery permanece o mesmo)
const MediaGallery = ({ screenshots, videos }) => (<div className="mt-8"> <h2 className="text-2xl font-bold text-white mb-4">Galeria</h2> <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {screenshots.map(ss => (<a key={ss.id} href={ss.image_url} target="_blank" rel="noopener noreferrer" className="aspect-video block"> <img src={ss.image_url.replace('t_screenshot_big', 't_screenshot_med')} alt="Screenshot" className="rounded-lg object-cover w-full h-full transition-transform hover:scale-105" /> </a>))} {videos.map(video => (<a key={video.id} href={video.video_url} target="_blank" rel="noopener noreferrer" className="relative flex justify-center items-center bg-black rounded-lg group aspect-video"> <p className="z-10 text-white font-bold text-center px-2">{video.title}</p> <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors"></div> <Video className="absolute text-white/70" size={48} /> </a>))} </div> </div>);

// (O componente ReviewForm permanece o mesmo)
const ReviewForm = ({ gameId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Por favor, selecione uma nota de 1 a 10.');
            return;
        }
        setIsSubmitting(true);
        try {
            const reviewData = { game_id: gameId, user_id: 2, rating: rating, comment: comment };
            const response = await fetch(`${BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) throw new Error('Falha ao enviar avaliação. Você já pode ter avaliado este jogo.');
            onReviewSubmitted();
        } catch (error) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-slate-800 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Deixe sua avaliação</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                    {[...Array(10)].map((_, index) => {
                        const starValue = index + 1;
                        return (<Star key={starValue} className="cursor-pointer transition-colors" color={starValue <= (hoverRating || rating) ? '#facc15' : '#64748b'} fill={starValue <= (hoverRating || rating) ? '#facc15' : 'none'} onMouseEnter={() => setHoverRating(starValue)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(starValue)} />);
                    })}
                    <span className="ml-4 text-xl font-bold text-white">{rating > 0 ? rating : '?'} / 10</span>
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escreva um comentário (opcional)..." className="w-full bg-slate-700 p-2 rounded-md min-h-[80px]"></textarea>
                <button type="submit" disabled={isSubmitting} className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50">
                    <Send size={18} />
                    {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
            </form>
        </div>
    );
};


const GameDetailPage = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGameDetails = async () => {
        if (!slug) return;
        try {
            // =================================================================
            // CORREÇÃO: Consultamos a nova 'view' e simplificamos o 'select'
            // =================================================================
            const response = await fetch(`${BASE_URL}/games_with_ratings?slug=eq.${slug}&select=*,screenshots(*),videos(*)`);

            if (!response.ok) throw new Error('Falha ao buscar detalhes.');
            const data = await response.json();
            if (data.length === 0) throw new Error('Jogo não encontrado.');

            const gameData = data[0];
            // A nota agora vem diretamente como 'avg_rating'
            gameData.rating = gameData.avg_rating || 0;

            setGame(gameData);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchGameDetails();
    }, [slug]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!game) return null;

    const headerImageUrl = game.screenshots[0]?.image_url.replace('t_screenshot_med', 't_1080p') || game.cover_url;
    const ratingColor = game.rating >= 8.0 ? 'text-green-400' : game.rating >= 6.0 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="max-w-6xl mx-auto">
            <header className="relative h-64 md:h-80 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${headerImageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {game.rating > 0 && (
                    <div className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-lg flex items-center gap-2">
                        <Star size={24} className={ratingColor} fill={ratingColor} />
                        <span className="text-3xl font-bold text-white">{game.rating.toFixed(1)}</span>
                    </div>
                )}
            </header>

            <main className="-mt-20 md:-mt-32 relative p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 w-full mx-auto md:mx-0 md:w-64 text-center">
                        <img src={game.cover_url} alt={game.title} className="w-full rounded-lg shadow-xl" />
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                            <span className="text-3xl font-bold text-white">{game.price ? `R$ ${game.price}` : 'Grátis'}</span>
                            <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">Comprar</button>
                            <button className="mt-2 w-full bg-sky-600/50 hover:bg-sky-600 text-white font-bold py-2 rounded-lg transition-colors">Lista de Desejos</button>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white">{game.title}</h1>
                        <p className="mt-6 text-slate-200">{game.description}</p>
                        <MediaGallery screenshots={game.screenshots || []} videos={game.videos || []} />
                        <ReviewForm gameId={game.id} onReviewSubmitted={fetchGameDetails} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GameDetailPage;