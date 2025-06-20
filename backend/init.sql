-- backend/init.sql

DROP SCHEMA IF EXISTS api CASCADE;
CREATE SCHEMA api;

-- Tabela de Guias e Usuários
CREATE TABLE api.guides ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(100), type VARCHAR(50), image_url TEXT, tags TEXT[], link TEXT, created_at TIMESTAMPTZ DEFAULT now() );
CREATE TABLE api.users ( id SERIAL PRIMARY KEY, username VARCHAR(100) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(50) DEFAULT 'User', avatar_url TEXT, created_at TIMESTAMPTZ DEFAULT now() );

-- Tabela de Jogos (sem a coluna 'rating' estática)
CREATE TABLE api.games (
    id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, description TEXT, cover_url TEXT, release_date DATE, developer VARCHAR(150),
    publisher VARCHAR(150), price NUMERIC(10, 2), sale_price NUMERIC(10, 2), created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Mídia e Categorias
CREATE TABLE api.screenshots ( id SERIAL PRIMARY KEY, game_id INT NOT NULL REFERENCES api.games(id) ON DELETE CASCADE, image_url TEXT NOT NULL );
CREATE TABLE api.videos ( id SERIAL PRIMARY KEY, game_id INT NOT NULL REFERENCES api.games(id) ON DELETE CASCADE, video_url TEXT NOT NULL, title VARCHAR(255) );
CREATE TABLE api.categories ( id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE NOT NULL );
CREATE TABLE api.game_categories ( game_id INT NOT NULL REFERENCES api.games(id) ON DELETE CASCADE, category_id INT NOT NULL REFERENCES api.categories(id) ON DELETE CASCADE, PRIMARY KEY (game_id, category_id) );

-- Tabela para Avaliações (Reviews)
CREATE TABLE api.reviews (
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL REFERENCES api.games(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES api.users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 10), -- Nota de 1 a 10
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(game_id, user_id) -- Um usuário só pode avaliar um jogo uma vez
);

----------------------------------------------------
-- DADOS DE EXEMPLO INICIAIS
----------------------------------------------------
INSERT INTO api.users (id, username, email) VALUES (1, 'Stiicky25', 'stiiicky@gmail.com');
SELECT setval('api.users_id_seq', 1, true);
INSERT INTO api.categories (name) VALUES ('RPG'), ('Ação'), ('Aventura'), ('Mundo Aberto'), ('Estratégia');

----------------------------------------------------
-- FUNÇÃO RPC ATUALIZADA E CORRIGIDA
----------------------------------------------------
CREATE OR REPLACE FUNCTION api.get_top_games_by_category()
RETURNS json AS $$
BEGIN
    RETURN (
        SELECT COALESCE(json_agg(cats), '[]'::json) FROM (
            SELECT
                c.id,
                c.name,
                (
                    SELECT COALESCE(json_agg(top_games), '[]'::json)
                    FROM (
                        SELECT
                            g.id, g.title, g.slug, g.cover_url, g.description, g.price,
                            (SELECT AVG(r.rating) FROM api.reviews r WHERE r.game_id = g.id) as rating
                        FROM api.games g
                        JOIN api.game_categories gc ON g.id = gc.game_id
                        WHERE gc.category_id = c.id
                        ORDER BY rating DESC NULLS LAST, g.title ASC
                        LIMIT 10
                    ) as top_games
                ) as games
            FROM api.categories c
            WHERE EXISTS (SELECT 1 FROM api.game_categories gc WHERE gc.category_id = c.id)
            ORDER BY c.name
        ) as cats
    );
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------
-- PERMISSÕES
----------------------------------------------------
create role web_anon nologin;
grant usage on schema api to web_anon;
grant web_anon to gplatform_user;

grant select, insert, update, delete on all tables in schema api to web_anon;
grant usage, select on all sequences in schema api to web_anon;
grant execute on function api.get_top_games_by_category() to web_anon;

----------------------------------------------------
-- VIEW PARA JOGOS COM NOTA MÉDIA CALCULADA
----------------------------------------------------
CREATE OR REPLACE VIEW api.games_with_ratings AS
SELECT
    g.*,
    (SELECT avg(r.rating) FROM api.reviews r WHERE r.game_id = g.id) as avg_rating
FROM
    api.games g;

-- Permissão para a API acessar a nova view
grant select on table api.games_with_ratings to web_anon;