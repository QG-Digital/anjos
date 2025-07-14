// Script Principal - Orquestrador de todos os módulos
class MainApp {
    constructor() {
        this.currentPage = 'manifesto';
        this.dashboardData = {};
        this.init();
    }

    async init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    async initializeApp() {
        try {
            // 1. Inicializar tela de abertura
            this.initSplashScreen();
            
            // 2. Aguardar um pouco para os outros módulos carregarem
            await this.delay(1000);
            
            // 3. Carregar textos
            if (window.carregarTextos) {
                window.carregarTextos();
            }
            
            // 4. Inicializar navegação
            this.initNavigation();
            
            // 5. Inicializar dashboard
            this.initDashboard();
            
            // 6. Configurar observers e efeitos
            this.initScrollEffects();
            this.initIntersectionObserver();
            
            // 7. Configurar event listeners globais
            this.setupGlobalEventListeners();
            
            console.log('✅ Aplicação inicializada com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
        }
    }

    initSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        const typingText = document.getElementById('typing-text');
        const text = window.TEXTOS?.splash?.message || 'Construindo um império... na raça.';
        
        if (!splashScreen || !typingText) return;
        
        // Animação de digitação
        typingText.style.width = '0';
        setTimeout(() => {
            typingText.style.animation = 'typing 2s steps(30, end) forwards, blink-caret 0.75s step-end infinite';
            typingText.textContent = text;
        }, 500);

        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            document.getElementById('main-site').classList.remove('hidden');
            splashScreen.addEventListener('transitionend', () => splashScreen.remove());
        }, 4000);
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Links de navegação
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPageId = link.getAttribute('href').substring(1);
                this.showPage(targetPageId);
                
                // Fechar menu mobile se estiver aberto
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Menu hamburger
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            }
        });
    }

    showPage(pageId) {
        if (this.currentPage === pageId) return;

        // Remover classe active de todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Ativar nova página
        const newPage = document.getElementById(pageId);
        if (newPage) {
            newPage.classList.add('active');
        }
        
        // Atualizar navegação
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${pageId}`);
        });

        this.currentPage = pageId;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Rastrear mudança de página
        if (window.geolocationService) {
            window.geolocationService.rastrearEvento('mudanca_pagina', {
                paginaAnterior: this.currentPage,
                paginaNova: pageId
            });
        }

        // Inicializar funcionalidades específicas da página
        this.initPageSpecificFeatures(pageId);
    }

    initPageSpecificFeatures(pageId) {
        switch (pageId) {
            case 'dados-abertos':
                // Dados abertos já são inicializados automaticamente
                break;
            case 'projetos':
                // Projetos já são inicializados automaticamente
                break;
            case 'manifesto':
                this.updateDashboard();
                break;
        }
    }

    initDashboard() {
        this.updateDashboard();
        
        // Atualizar dashboard periodicamente
        setInterval(() => {
            this.updateDashboard();
        }, CONFIG.dashboard.updateInterval);
    }

    updateDashboard() {
        if (!window.dadosAbertos) return;

        try {
            const dados = window.dadosAbertos.obterDadosDashboard();
            
            // Atualizar valores na interface
            this.updateDashboardValue('saldo-atual', dados.saldoAtual);
            this.updateDashboardValue('ganhos-mes', dados.ganhosMes);
            this.updateDashboardValue('gastos-mes', dados.gastosMes);
            this.updateDashboardValue('pessoas-projeto', dados.pessoasProjeto, false);

            this.dashboardData = dados;
        } catch (error) {
            console.warn('Erro ao atualizar dashboard:', error);
        }
    }

    updateDashboardValue(elementId, value, isCurrency = true) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const formattedValue = isCurrency ? this.formatCurrency(value) : value.toString();
        
        // Animação de contagem
        this.animateValue(element, formattedValue);
    }

    animateValue(element, newValue) {
        const currentValue = element.textContent;
        if (currentValue === newValue) return;

        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 150);
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    initScrollEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Efeito de header
            header.classList.toggle('scrolled', currentScrollY > 50);
            
            // Esconder/mostrar header baseado na direção do scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    initIntersectionObserver() {
        const animatedElements = document.querySelectorAll(
            '.page-title, .page-intro, .action-card, .contact-item, .card, ' +
            '.summary-card, .table-container, .exit-container, .project-card, ' +
            '.dashboard-card, .chart-container'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animar barras de progresso
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.classList.add('animated-element');
            observer.observe(el);
        });
    }

    setupGlobalEventListeners() {
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            // ESC para fechar modais
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Ctrl/Cmd + K para busca rápida (futuro)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Implementar busca rápida no futuro
            }
        });

        // Detectar mudanças de conectividade
        window.addEventListener('online', () => {
            this.showNotification('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Sem conexão com a internet', 'warning');
        });

        // Detectar mudanças de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Página ficou oculta
                if (window.geolocationService) {
                    window.geolocationService.rastrearEvento('pagina_oculta');
                }
            } else {
                // Página ficou visível
                if (window.geolocationService) {
                    window.geolocationService.rastrearEvento('pagina_visivel');
                }
                
                // Atualizar dashboard quando voltar à página
                this.updateDashboard();
            }
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal.visible');
        modals.forEach(modal => {
            modal.classList.remove('visible');
        });
        document.body.style.overflow = 'auto';
    }

    showNotification(message, type = 'info') {
        // Remover notificação existente
        const existing = document.querySelector('.app-notification');
        if (existing) existing.remove();

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `app-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Event listeners
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-remover
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Animar entrada
        setTimeout(() => notification.classList.add('show'), 100);
    }

    // Método utilitário para delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Método para obter status da aplicação
    getAppStatus() {
        return {
            currentPage: this.currentPage,
            dashboardData: this.dashboardData,
            modulesLoaded: {
                textos: !!window.TEXTOS,
                dadosAbertos: !!window.dadosAbertos,
                projetos: !!window.gerenciadorProjetos,
                telegram: !!window.telegramIntegration,
                geolocation: !!window.geolocationService,
                forms: !!window.formsManager,
                cookies: !!window.cookieManager,
                chart: !!window.chartManager
            },
            timestamp: new Date().toISOString()
        };
    }

    // Método para debug
    debug() {
        console.table(this.getAppStatus());
    }
}

// Inicializar aplicação principal
const app = new MainApp();

// Exportar para uso global e debug
window.app = app;

// Função global para debug
window.debugApp = () => app.debug();