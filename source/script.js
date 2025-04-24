// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link:not(.disabled)'); // Seleciona links que não estão desabilitados
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Pega o nome do arquivo atual, default para index.html se for raiz "/"

    // Função para definir o link ativo
    function setActiveLink() {
        let foundActive = false;
        const isMobileView = window.innerWidth < 992; // Ponto de quebra lg do Bootstrap

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            const isMobileLink = link.id.startsWith('mobile-');
            const isDesktopLink = link.id.startsWith('desktop-');

            // Remove 'active' de todos primeiro
            link.classList.remove('active');
            // Não precisa resetar estilo aqui, o CSS cuidará disso quando 'active' for removido

            // Verifica se o href do link corresponde à página atual
            if (linkPath === currentPath) {
                 // Aplica 'active' apenas se o link pertence ao menu visível (mobile OU desktop)
                 if ((isMobileLink && isMobileView) || (isDesktopLink && !isMobileView)) {
                    link.classList.add('active');
                    foundActive = true;
                 }
            }
        });

         // Se nenhuma página correspondeu E estamos na página inicial (identificada como index.html)
         // Ativa o link 'Início' apropriado (mobile ou desktop)
         if (!foundActive && currentPath === 'index.html') {
            const inicioLinkId = isMobileView ? 'mobile-inicio' : 'desktop-inicio';
            const inicioLink = document.getElementById(inicioLinkId);
            if (inicioLink) {
                 inicioLink.classList.add('active');
            }
         }
    }

    // Define o link ativo ao carregar a página
    setActiveLink();

    // Reavalia o link ativo se a janela for redimensionada (passando pelo breakpoint)
    // Usa um debounce simples para não disparar a função excessivamente durante o resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setActiveLink, 150); // Espera 150ms após parar de redimensionar
    });

    // Opcional: Adicionar listeners de clique se precisar fazer algo *antes* da navegação
    // ou em um cenário de Single Page Application (SPA). Para navegação normal, não é necessário.
    /*
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Exemplo: poderia adicionar uma animação ou analytics aqui
            // console.log(`Navegando para: ${this.href}`);
            // Não usar event.preventDefault() para permitir a navegação padrão
        });
    });
    */
});