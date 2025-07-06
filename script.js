// Variáveis globais
let currentPage = 'inicio';
const supporters = [
    { name: 'Maria Silva', amount: 50 }, { name: 'João Santos', amount: 25 },
    { name: 'Ana Costa', amount: 100 }, { name: 'Pedro Lima', amount: 30 },
    { name: 'Carla Souza', amount: 75 }, { name: 'Anônimo', amount: 20 },
    { name: 'Lucas Oliveira', amount: 40 }, { name: 'Fernanda Alves', amount: 60 },
    { name: 'Roberto Dias', amount: 35 }, { name: 'Juliana Rocha', amount: 80 },
    { name: 'Amigo dos Animais', amount: 45 }, { name: 'Família Pereira', amount: 90 },
    { name: 'Anônimo', amount: 15 }, { name: 'Marcos Ferreira', amount: 55 },
	{ name: 'Maria Silva', amount: 50 }, { name: 'João Santos', amount: 25 },
    { name: 'Ana Costa', amount: 100 }, { name: 'Pedro Lima', amount: 30 },
    { name: 'Carla Souza', amount: 75 }, { name: 'Anônimo', amount: 20 },
    { name: 'Lucas Oliveira', amount: 40 }, { name: 'Fernanda Alves', amount: 60 },
    { name: 'Roberto Dias', amount: 35 }, { name: 'Juliana Rocha', amount: 80 },
    { name: 'Amigo dos Animais', amount: 45 }, { name: 'Família Pereira', amount: 90 },
    { name: 'Anônimo', amount: 15 }, { name: 'Marcos Ferreira', amount: 55 },
    { name: 'Lucas Oliveira', amount: 40 }, { name: 'Fernanda Alves', amount: 60 },
    { name: 'Roberto Dias', amount: 35 }, { name: 'Juliana Rocha', amount: 80 },
    { name: 'Amigo dos Animais', amount: 45 }, { name: 'Família Pereira', amount: 90 },
    { name: 'Anônimo', amount: 15 }, { name: 'Marcos Ferreira', amount: 55 },
	{ name: 'Maria Silva', amount: 50 }, { name: 'João Santos', amount: 25 },
    { name: 'Ana Costa', amount: 100 }, { name: 'Pedro Lima', amount: 30 },
    { name: 'Carla Souza', amount: 75 }, { name: 'Anônimo', amount: 20 },
    { name: 'Lucas Oliveira', amount: 40 }, { name: 'Fernanda Alves', amount: 60 },
    { name: 'Roberto Dias', amount: 35 }, { name: 'Juliana Rocha', amount: 80 },
    { name: 'Amigo dos Animais', amount: 45 }, { name: 'Família Pereira', amount: 90 },
    { name: 'Anônimo', amount: 15 }, { name: 'Marcos Ferreira', amount: 55 },
    { name: 'Patrícia Gomes', amount: 70 }
];

// Funções de Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initNavigation();
    initModal();
    initGalleryTabs();
    initScrollEffects();
    initIntersectionObserver();
    
    // Inicia a nuvem de apoiadores após a tela de abertura
    setTimeout(() => {
        initSupportersCloud();
    }, 4000);
});

// Tela de abertura
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const typingText = document.getElementById('typing-text');
    const text = 'Bem-vindo à Anjos Urbanos...';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        }
    }
    setTimeout(typeWriter, 500);

    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        document.getElementById('main-site').classList.remove('hidden');
        // Remove a tela da DOM após a transição para melhorar a performance
        splashScreen.addEventListener('transitionend', () => splashScreen.remove());
    }, 4000);
}

// Navegação principal
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPageId = this.getAttribute('href').substring(1);
            showPage(targetPageId);
            navMenu.classList.remove('active');
        });
    });

    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
}

function showPage(pageId) {
    if (currentPage === pageId) return;

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${pageId}`);
    });

    currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nuvem de apoiadores com animação aprimorada
function initSupportersCloud() {
    const cloud = document.getElementById('supporters-cloud');
    if (!cloud) return;
    
    function createSupporterItem() {
        const supporter = supporters[Math.floor(Math.random() * supporters.length)];
        const item = document.createElement('div');
        item.className = 'supporter-item';
        item.textContent = `${supporter.name} - R$${supporter.amount}`;
        
        const duration = Math.random() * 5 + 10; // Duração entre 10s e 15s
        const startX = Math.random() * 100 - 50; // Inicia em posição X aleatória
        const endX = Math.random() * 100 - 50;   // Termina em posição X aleatória

        item.style.setProperty('--x-start', `${startX}px`);
        item.style.setProperty('--x-end', `${endX}px`);
        item.style.animationDuration = `${duration}s`;
        item.style.left = `${Math.random() * 100}%`;
        
        cloud.appendChild(item);
        
        setTimeout(() => item.remove(), duration * 1000);
    }
    
    setInterval(createSupporterItem, 2500);
}

// Modal de doação
function initModal() {
    const modal = document.getElementById('donation-modal');
    const donationBtn = document.getElementById('donation-btn');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('donation-form');
    const anonymousCheckbox = document.getElementById('anonymous');
    const displayNameGroup = document.getElementById('display-name-group');

    const openModal = () => {
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
        // Resetar o modal para o estado inicial
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            document.getElementById('thank-you-message').classList.add('hidden');
            displayNameGroup.style.display = 'none';
        }, 400); // Aguarda a animação de saída
    };

    donationBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => (e.target === modal) && closeModal());
    document.addEventListener('keydown', (e) => (e.key === 'Escape') && closeModal());

    anonymousCheckbox.addEventListener('change', function() {
        displayNameGroup.style.display = this.checked ? 'block' : 'none';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.style.display = 'none';
        document.getElementById('thank-you-message').classList.remove('hidden');
        setTimeout(closeModal, 4000);
    });
}

// Função para copiar PIX
function copyPix() {
    const pixEmail = document.getElementById('pix-email').textContent;
    navigator.clipboard.writeText(pixEmail).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.backgroundColor = '#25D366';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    });
}

// Tabs da galeria
function initGalleryTabs() {
    const tabsContainer = document.querySelector('.gallery-tabs');
    if(!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.matches('.tab-btn')) {
            const targetTab = e.target.dataset.tab;
            tabsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(targetTab)?.classList.add('active');
        }
    });
}

// Efeitos de scroll no header
function initScrollEffects() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// Animações de entrada para elementos
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.page-title, .page-intro, .action-card, .gallery-item, .contact-item, .card, .about-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.classList.add('animated-element');
        observer.observe(el);
    });
}