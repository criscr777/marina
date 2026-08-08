document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TELA INICIAL ---
    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    startBtn.addEventListener('click', () => {
        // Fade out suave na intro
        introScreen.style.transition = "opacity 0.6s ease";
        introScreen.style.opacity = "0";
        
        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Tocar som de fundo aqui se desejar
        }, 600);
    });


    // --- 2. MOMENTOS (EFEITO LIVRO COM SWIPE) ---
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageCounter = document.getElementById('page-counter');
    const bookContainer = document.getElementById('book-container');
    let currentPage = 0;

    function updateBook() {
        pages.forEach((page, index) => {
            page.classList.remove('active', 'flipped');
            if (index === currentPage) {
                page.classList.add('active');
            } else if (index < currentPage) {
                page.classList.add('flipped');
            }
        });
        pageCounter.innerText = `${currentPage + 1} / ${pages.length}`;
    }

    function nextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateBook();
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updateBook();
        }
    }

    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);

    // Lógica de Swipe para Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    bookContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    bookContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 40; // Distância mínima para validar o swipe
        if (touchStartX - touchEndX > threshold) nextPage(); // Swipe esquerda
        if (touchEndX - touchStartX > threshold) prevPage(); // Swipe direita
    }


    // --- 3. FUGA DO BOTÃO "NÃO" ---
    const btnNo = document.getElementById('btn-no');
    const container = document.getElementById('action-buttons');

    function moveButton(e) {
        e.preventDefault(); // Previne o clique em telas touch
        
        // Pega as dimensões do container pai para limitar a fuga
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();

        // Calcula posições aleatórias dentro do container
        const maxX = containerRect.width - btnRect.width;
        // Permite que o botão fuja um pouco mais para cima/baixo dentro da section
        const maxY = 100; 
        const minY = -100;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        btnNo.style.position = 'absolute';
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    }

    // Funciona no mouse (Desktop) e no toque (Mobile)
    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton, {passive: false});


    // --- 4. BOTÃO "SIM" (COMEMORAÇÃO) ---
    const btnYes = document.getElementById('btn-yes');
    const proposalText = document.getElementById('proposal-text');
    const successMessage = document.getElementById('success-message');

    btnYes.addEventListener('click', () => {
        // Esconde os botões e texto original
        container.style.display = 'none';
        proposalText.style.display = 'none';
        
        // Mostra a mensagem romântica
        successMessage.classList.remove('hidden');

        // Dispara a chuva de corações e confetes
        fireConfetti();
    });

    function fireConfetti() {
        // Confetes normais
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#c9184a', '#ffffff']
        });

        // Chuva de corações (Formato customizado pelo canvas-confetti)
        const defaults = { spread: 360, ticks: 100, gravity: 0, decay: 0.94, startVelocity: 30, shapes: ['heart'], colors: ['#ff4d6d', '#ff758f', '#c9184a'] };
        
        setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { x: 0.5, y: 0.5 } }), 200);
        setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { x: 0.2, y: 0.4 } }), 400);
        setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { x: 0.8, y: 0.4 } }), 600);
    }
});