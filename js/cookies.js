// Módulo de Gerenciamento de Cookies
class CookieManager {
    constructor() {
        this.cookieConsent = this.getCookie('cookie_consent');
        this.init();
    }

    init() {
        // Mostrar banner de cookies se não foi aceito/rejeitado
        if (!this.cookieConsent) {
            this.showCookieBanner();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        const acceptBtn = document.getElementById('accept-cookies');
        const rejectBtn = document.getElementById('reject-cookies');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptCookies());
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectCookies());
        }
    }

    showCookieBanner() {
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.style.display = 'flex';
            
            // Animar entrada
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.classList.add('hide');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    acceptCookies() {
        this.setCookie('cookie_consent', 'accepted', 365);
        this.cookieConsent = 'accepted';
        this.hideCookieBanner();
        
        // Notificar acesso com cookies aceitos
        this.notificarDecisaoCookies(true);
        
        // Inicializar serviços que dependem de cookies
        this.initCookieDependentServices();
    }

    rejectCookies() {
        this.setCookie('cookie_consent', 'rejected', 365);
        this.cookieConsent = 'rejected';
        this.hideCookieBanner();
        
        // Notificar acesso com cookies rejeitados
        this.notificarDecisaoCookies(false);
        
        // Limpar cookies existentes (exceto o de consentimento)
        this.clearNonEssentialCookies();
    }

    async notificarDecisaoCookies(aceitos) {
        if (window.geolocationService && window.telegramIntegration) {
            const dadosUsuario = window.geolocationService.obterDadosUsuario();
            dadosUsuario.cookiesAceitos = aceitos;
            
            await window.telegramIntegration.notificarAcesso(dadosUsuario);
        }
    }

    initCookieDependentServices() {
        // Aqui você pode inicializar serviços que dependem de cookies
        // Por exemplo: Google Analytics, Facebook Pixel, etc.
        
        if (this.cookieConsent === 'accepted') {
            // Exemplo: Inicializar Google Analytics
            // this.initGoogleAnalytics();
            
            // Salvar preferências do usuário
            this.saveUserPreferences();
            
            // Rastrear eventos mais detalhados
            this.enableAdvancedTracking();
        }
    }

    saveUserPreferences() {
        // Salvar preferências como tema, idioma, etc.
        const preferences = {
            theme: 'default',
            language: navigator.language,
            visitCount: this.getVisitCount() + 1,
            lastVisit: new Date().toISOString()
        };

        this.setCookie('user_preferences', JSON.stringify(preferences), 365);
    }

    getVisitCount() {
        const prefs = this.getCookie('user_preferences');
        if (prefs) {
            try {
                const parsed = JSON.parse(prefs);
                return parsed.visitCount || 0;
            } catch (e) {
                return 0;
            }
        }
        return 0;
    }

    enableAdvancedTracking() {
        // Habilitar rastreamento mais detalhado apenas se cookies foram aceitos
        if (window.geolocationService) {
            // Rastrear mais eventos
            this.trackPageViews();
            this.trackUserInteractions();
        }
    }

    trackPageViews() {
        // Rastrear visualizações de página
        const pageData = {
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
        };

        this.setCookie('last_page_view', JSON.stringify(pageData), 1);
    }

    trackUserInteractions() {
        // Rastrear interações do usuário (apenas se cookies aceitos)
        let interactions = 0;
        
        document.addEventListener('click', () => {
            interactions++;
            this.setCookie('user_interactions', interactions.toString(), 1);
        });
    }

    clearNonEssentialCookies() {
        // Limpar todos os cookies exceto os essenciais
        const essentialCookies = ['cookie_consent'];
        
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            if (!essentialCookies.includes(name)) {
                this.deleteCookie(name);
            }
        });
    }

    // Utilitários para cookies
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    // Verificar se cookies são aceitos
    areCookiesAccepted() {
        return this.cookieConsent === 'accepted';
    }

    // Obter dados de cookies para relatórios
    getCookieData() {
        if (!this.areCookiesAccepted()) {
            return { status: 'rejected' };
        }

        const preferences = this.getCookie('user_preferences');
        const lastPageView = this.getCookie('last_page_view');
        const interactions = this.getCookie('user_interactions');

        return {
            status: 'accepted',
            preferences: preferences ? JSON.parse(preferences) : null,
            lastPageView: lastPageView ? JSON.parse(lastPageView) : null,
            interactions: interactions ? parseInt(interactions) : 0
        };
    }

    // Método para compliance com LGPD
    generatePrivacyReport() {
        const report = {
            consentStatus: this.cookieConsent,
            consentDate: this.getCookie('cookie_consent_date'),
            cookiesStored: [],
            dataCollected: this.getCookieData()
        };

        // Listar todos os cookies
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name) {
                report.cookiesStored.push(name);
            }
        });

        return report;
    }
}

// Inicializar gerenciador de cookies
let cookieManager;

document.addEventListener('DOMContentLoaded', () => {
    cookieManager = new CookieManager();
});

// Exportar para uso global
window.CookieManager = CookieManager;