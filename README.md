# Plataforma GameWiki

GameWiki é uma plataforma web abrangente desenvolvida para gamers, oferecendo funcionalidades para gerenciar bibliotecas de jogos, explorar um catálogo de jogos, acessar guias, conectar-se com amigos e gerenciar dados de usuários e jogos através de um painel de administração.

## Funcionalidades

- **Autenticação de Usuário**: Login e registro seguros.
- **Catálogo de Jogos**: Navegue por jogos por categoria com carregamento dinâmico.
- **Biblioteca do Usuário**: Visualize jogos comprados com chaves de ativação.
- **Lista de Desejos**: Gerencie uma lista de jogos desejados.
- **Guias e Tutoriais**: Acesse guias para vários jogos, com funcionalidade de busca.
- **Sistema de Amigos**: Visualize o status online e as atividades dos amigos.
- **Fóruns da Comunidade (Bate-Papos)**: Participe de discussões (protótipo).
- **Gerenciador de Downloads**: Acompanhe downloads de jogos ativos e não agendados (protótipo).
- **Histórico de Compras**: Revise compras de jogos anteriores.
- **Painel de Administração**:
  - Dashboard
  - Gerenciar Jogos (Criar, Editar, Excluir, Adicionar Mídia como capturas de tela e vídeos)
  - Gerenciar Guias (Criar, Editar, Excluir)
  - Gerenciar Categorias (Criar, Editar, Excluir)
  - Gerenciar Usuários (Criar, Editar, Excluir)
  - Configurações da Plataforma (protótipo)
- **Design Responsivo**: Construído com Tailwind CSS para uma aparência consistente em todos os dispositivos.

## Tecnologias Utilizadas

- **Frontend**:
  - React.js
  - React Router DOM (para navegação)
  - Tailwind CSS (para estilização)
  - React Hook Form (para gerenciamento de formulários)
  - React Feather (para ícones)
  - React Responsive Carousel (para seções de destaque)
- **Backend (Servidor de Upload)**:
  - Node.js
  - Express.js (framework web)
  - Multer (para manipulação de upload de arquivos)
  - CORS (para requisições de origem cruzada)
- **Banco de Dados**:
  - PostgreSQL (implícito pelas chamadas RPC na `BASE_URL`, provavelmente interagindo via PostgREST).

## Configuração e Execução da Aplicação

Este projeto consiste em um frontend React, um servidor de upload Node.js e interage com um banco de dados PostgreSQL (presumivelmente via PostgREST).

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm (Node Package Manager) ou Yarn
- Uma instância de banco de dados PostgreSQL em execução com as funções e tabelas necessárias expostas pelo PostgREST.
- Um túnel ngrok (ou similar) se sua instância PostgreSQL/PostgREST não for publicamente acessível, como indicado pela `BASE_URL` em `src/services/api.js`.

### 1. Configuração do Backend (Servidor de Upload)

Primeiro, configure e execute o servidor Node.js responsável pelos uploads de imagem.

1.  **Crie a pasta do servidor**:
    Se você não a tiver, crie a estrutura de diretórios: `backend/upload-server/`.
2.  **Salve o código do backend**:
    Salve o código Node.js fornecido em um arquivo chamado `server.js` dentro da pasta `backend/upload-server/`.
3.  **Instale as dependências**:
    Navegue até a pasta `backend/upload-server/` no seu terminal e instale os pacotes Node.js necessários:
    ```bash
    cd backend/upload-server/
    npm install express multer cors
    ```
4.  **Crie uma pasta `uploads`**:
    Crie uma pasta chamada `uploads` dentro da pasta `backend/upload-server/`. É aqui que as imagens carregadas serão armazenadas.
    ```bash
    mkdir uploads
    ```
5.  **Execute o servidor de upload**:
    Na pasta `backend/upload-server/`, execute o servidor:
    ```bash
    node server.js
    ```
    Você deverá ver `Servidor de upload rodando na porta 4000`.

### 2. Configuração do Frontend

Em seguida, configure e execute a aplicação frontend React.

1.  **Navegue até a raiz do projeto**:
    Certifique-se de estar na pasta raiz do seu projeto React (onde estão `package.json` e a pasta `src`).
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Configure a URL Base da API**:
    Abra `src/services/api.js`. A `BASE_URL` deve apontar para o endpoint da sua API PostgREST. Conforme o código fornecido, é:
    ```javascript
    export const BASE_URL =
      "[https://a324-200-129-210-194.ngrok-free.app](https://a324-200-129-210-194.ngrok-free.app)";
    ```
    **Importante**: Certifique-se de que esta URL está correta e que seu servidor PostgREST está acessível através dela (por exemplo, via ngrok). As chamadas `fetch` da aplicação também incluem `'ngrok-skip-browser-warning': 'true'` nos cabeçalhos, o que é relevante se você estiver usando ngrok.
4.  **Execute o servidor de desenvolvimento React**:
    ```bash
    npm start
    ```
    Isso geralmente abrirá a aplicação em seu navegador em `http://localhost:3000` (ou outra porta disponível).

## Estrutura do Projeto
