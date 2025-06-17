-- backend/init.sql

-- ... (CREATE SCHEMA e CREATE TABLE de guides e games continuam os mesmos) ...
CREATE SCHEMA api;

CREATE TABLE api.guides ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(100), type VARCHAR(50), image_url TEXT, tags TEXT[], link TEXT, created_at TIMESTAMPTZ DEFAULT now() );
INSERT INTO api.guides (title, author, type, image_url, tags, link) VALUES ('Guia de Platina - Sekiro', 'PowerPyx', 'video', '/images/platina1.png', '{"Sekiro", "Platina", "Souls-like"}', '#');

CREATE TABLE api.games ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, cover_url TEXT, created_at TIMESTAMPTZ DEFAULT now() );
INSERT INTO api.games (title, description, cover_url) VALUES ('Jogo Exemplo', 'Descrição exemplo.', 'https://via.placeholder.com/150');


----------------------------------------------------
-- PERMISSÕES (ATUALIZADO)
----------------------------------------------------
create role web_anon nologin;
grant usage on schema api to web_anon;
grant web_anon to gplatform_user;

-- PERMISSÕES PARA O PAPEL ANÔNIMO (web_anon)
-- Damos permissão para ler, inserir, atualizar e deletar em ambas as tabelas
grant select, insert, update, delete on table api.guides to web_anon;
grant select, insert, update, delete on table api.games to web_anon;

-- IMPORTANTE: Também damos permissão para usar as sequences (que geram os IDs automáticos)
grant usage, select on sequence api.guides_id_seq to web_anon;
grant usage, select on sequence api.games_id_seq to web_anon;

-- (As permissões de admin podem ser removidas por enquanto, ou mantidas para o futuro)
create role admin nologin;
grant admin to gplatform_user;
grant all on table api.guides to admin;
grant all on table api.games to admin;
grant usage, select on all sequences in schema api to admin;