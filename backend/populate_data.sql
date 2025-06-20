-- Inserindo jogos (sem a coluna 'rating')
INSERT INTO api.games (title, slug, description, cover_url, developer, publisher, price, release_date) VALUES
('The Witcher 3: Wild Hunt', 'the-witcher-3-wild-hunt', 'Você é Geralt de Rívia, um mercenário matador de monstros...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg', 'CD PROJEKT RED', 'CD PROJEKT RED', 199.90, '2015-05-19'),
('Cyberpunk 2077', 'cyberpunk-2077', 'Cyberpunk 2077 é uma história de ação e aventura em mundo aberto...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rft.jpg', 'CD PROJEKT RED', 'CD PROJEKT RED', 199.90, '2020-12-10'),
('Red Dead Redemption 2', 'red-dead-redemption-2', 'Estados Unidos, 1899. O fim da era do Velho Oeste começou...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1pxr.jpg', 'Rockstar Games', 'Rockstar Games', 249.50, '2018-10-26'),
('Elden Ring', 'elden-ring', 'Levante-se, Maculado, e seja guiado pela graça para brandir o poder...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg', 'FromSoftware', 'Bandai Namco Entertainment', 299.90, '2022-02-25'),
('Stardew Valley', 'stardew-valley', 'Você herdou a antiga fazenda do seu avô em Stardew Valley...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co28w5.jpg', 'ConcernedApe', 'ConcernedApe', 24.99, '2016-02-26'),
('Hades', 'hades', 'Desafie o deus dos mortos enquanto você batalha para sair do Submundo...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co260d.jpg', 'Supergiant Games', 'Supergiant Games', 47.49, '2020-09-17'),
('God of War Ragnarök', 'god-of-war-ragnarok', 'Junte-se a Kratos e Atreus em uma jornada mítica à procura de respostas...', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg', 'Santa Monica Studio', 'Sony', 349.90, '2022-11-09');

-- Ligando jogos a categorias
INSERT INTO api.game_categories (game_id, category_id) VALUES
((SELECT id FROM api.games WHERE slug = 'the-witcher-3-wild-hunt'), (SELECT id FROM api.categories WHERE name = 'RPG')),
((SELECT id FROM api.games WHERE slug = 'the-witcher-3-wild-hunt'), (SELECT id FROM api.categories WHERE name = 'Mundo Aberto')),
((SELECT id FROM api.games WHERE slug = 'cyberpunk-2077'), (SELECT id FROM api.categories WHERE name = 'RPG')),
((SELECT id FROM api.games WHERE slug = 'cyberpunk-2077'), (SELECT id FROM api.categories WHERE name = 'Ação')),
((SELECT id FROM api.games WHERE slug = 'red-dead-redemption-2'), (SELECT id FROM api.categories WHERE name = 'Ação')),
((SELECT id FROM api.games WHERE slug = 'red-dead-redemption-2'), (SELECT id FROM api.categories WHERE name = 'Aventura')),
((SELECT id FROM api.games WHERE slug = 'elden-ring'), (SELECT id FROM api.categories WHERE name = 'RPG')),
((SELECT id FROM api.games WHERE slug = 'elden-ring'), (SELECT id FROM api.categories WHERE name = 'Ação')),
((SELECT id FROM api.games WHERE slug = 'stardew-valley'), (SELECT id FROM api.categories WHERE name = 'RPG')),
((SELECT id FROM api.games WHERE slug = 'hades'), (SELECT id FROM api.categories WHERE name = 'Ação')),
((SELECT id FROM api.games WHERE slug = 'god-of-war-ragnarok'), (SELECT id FROM api.categories WHERE name = 'Ação')),
((SELECT id FROM api.games WHERE slug = 'god-of-war-ragnarok'), (SELECT id FROM api.categories WHERE name = 'Aventura'));

-- Inserindo avaliações de exemplo para gerar as notas dinâmicas
INSERT INTO api.reviews (game_id, user_id, rating, comment) VALUES
((SELECT id FROM api.games WHERE slug = 'the-witcher-3-wild-hunt'), 1, 10, 'Obra-prima! Um dos melhores jogos que já joguei.'),
((SELECT id FROM api.games WHERE slug = 'elden-ring'), 1, 9, 'Difícil, mas extremamente recompensador.'),
((SELECT id FROM api.games WHERE slug = 'cyberpunk-2077'), 1, 7, 'Melhorou muito depois dos updates, mas o lançamento foi conturbado.'),
((SELECT id FROM api.games WHERE slug = 'red-dead-redemption-2'), 1, 10, 'História e mundo imersivos. Incrível.'),
((SELECT id FROM api.games WHERE slug = 'hades'), 1, 9, 'Jogabilidade viciante e arte fantástica.');