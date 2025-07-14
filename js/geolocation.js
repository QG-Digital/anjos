// Módulo de Geolocalização
class GeolocationService {
    constructor() {
        this.dadosUsuario = {};
        this.init();
    }

    async init() {
        await this.obterDadosBasicos();
        await this.obterGeolocalizacao();
        this.notificarAcesso();
    }

    // Obter dados básicos do navegador
    obterDadosBasicos() {
        this.dadosUsuario = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            navegador: this.detectarNavegador(),
            sistema: this.detectarSistema(),
            dispositivo: this.detectarDispositivo(),
            idioma: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            resolucao: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            cookiesHabilitados: navigator.cookieEnabled,
            referrer: document.referrer || 'Acesso direto',
            pagina: window.location.pathname,
            url: window.location.href
        };
    }

    // Obter geolocalização via IP
    async obterGeolocalizacao() {
        try {
            // Primeiro, tentar obter IP
            const ip = await this.obterIP();
            this.dadosUsuario.ip = ip;

            // Depois, obter dados de geolocalização
            const geoData = await this.obterDadosGeo(ip);
            this.dadosUsuario = { ...this.dadosUsuario, ...geoData };

        } catch (error) {
            console.warn('Erro ao obter geolocalização:', error);
            this.dadosUsuario.erro_geolocalizacao = error.message;
        }
    }

    // Obter IP do usuário
    async obterIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            // Fallback para outro serviço
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                return data.ip;
            } catch (fallbackError) {
                throw new Error('Não foi possível obter o IP');
            }
        }
    }

    // Obter dados de geolocalização
    async obterDadosGeo(ip) {
        try {
            // Usar serviço gratuito ipapi.co
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await response.json();

            return {
                pais: data.country_name,
                codigoPais: data.country_code,
                estado: data.region,
                cidade: data.city,
                cep: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                provedor: data.org,
                timezone: data.timezone
            };
        } catch (error) {
            // Fallback para outro serviço
            try {
                const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=YOUR_API_KEY&ip_address=${ip}`);
                const data = await response.json();
                
                return {
                    pais: data.country,
                    codigoPais: data.country_code,
                    estado: data.region,
                    cidade: data.city,
                    cep: data.postal_code,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    provedor: data.connection.isp_name,
                    timezone: data.timezone.name
                };
            } catch (fallbackError) {
                return {
                    pais: 'Não identificado',
                    estado: 'Não identificado',
                    cidade: 'Não identificado'
                };
            }
        }
    }

    // Detectar navegador
    detectarNavegador() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        if (userAgent.includes('Edg')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        
        return 'Outro';
    }

    // Detectar sistema operacional
    detectarSistema() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes('Windows')) return 'Windows';
        if (userAgent.includes('Mac')) return 'macOS';
        if (userAgent.includes('Linux')) return 'Linux';
        if (userAgent.includes('Android')) return 'Android';
        if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
        
        return 'Outro';
    }

    // Detectar tipo de dispositivo
    detectarDispositivo() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes('Mobile') || userAgent.includes('Android')) return 'Mobile';
        if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'Tablet';
        
        return 'Desktop';
    }

    // Notificar acesso via Telegram
    async notificarAcesso() {
        if (window.telegramIntegration) {
            await window.telegramIntegration.notificarAcesso(this.dadosUsuario);
        }
    }

    // Obter dados do usuário
    obterDadosUsuario() {
        return this.dadosUsuario;
    }

    // Obter localização formatada
    obterLocalizacaoFormatada() {
        const { cidade, estado, pais } = this.dadosUsuario;
        return `${cidade || 'N/A'}, ${estado || 'N/A'}, ${pais || 'N/A'}`;
    }

    // Verificar se é acesso local
    isAcessoLocal() {
        const ip = this.dadosUsuario.ip;
        return ip && (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('127.'));
    }

    // Verificar se é bot
    isPossivelBot() {
        const userAgent = navigator.userAgent.toLowerCase();
        const botKeywords = ['bot', 'crawler', 'spider', 'scraper'];
        return botKeywords.some(keyword => userAgent.includes(keyword));
    }

    // Rastrear evento personalizado
    async rastrearEvento(evento, dados = {}) {
        const eventoData = {
            ...this.dadosUsuario,
            evento: evento,
            dadosEvento: dados,
            timestamp: new Date().toISOString()
        };

        // Enviar para Telegram se disponível
        if (window.telegramIntegration) {
            await window.telegramIntegration.notificarSistema(evento, eventoData);
        }

        // Log local para debug
        console.log('Evento rastreado:', eventoData);
    }

    // Rastrear tempo na página
    iniciarRastreamentoTempo() {
        this.tempoInicio = Date.now();
        
        // Rastrear quando o usuário sai da página
        window.addEventListener('beforeunload', () => {
            const tempoNaPagina = Date.now() - this.tempoInicio;
            this.rastrearEvento('tempo_na_pagina', {
                tempo: Math.round(tempoNaPagina / 1000), // em segundos
                pagina: window.location.pathname
            });
        });
    }

    // Rastrear cliques
    iniciarRastreamentoCliques() {
        document.addEventListener('click', (e) => {
            const elemento = e.target;
            const dados = {
                tag: elemento.tagName,
                classe: elemento.className,
                id: elemento.id,
                texto: elemento.textContent?.substring(0, 100),
                href: elemento.href,
                posicao: { x: e.clientX, y: e.clientY }
            };

            this.rastrearEvento('clique', dados);
        });
    }

    // Rastrear scroll
    iniciarRastreamentoScroll() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }
        });

        // Enviar dados de scroll ao sair da página
        window.addEventListener('beforeunload', () => {
            this.rastrearEvento('scroll_maximo', { porcentagem: maxScroll });
        });
    }
}

// Inicializar serviço de geolocalização
let geolocationService;

document.addEventListener('DOMContentLoaded', () => {
    geolocationService = new GeolocationService();
    
    // Iniciar rastreamentos opcionais
    geolocationService.iniciarRastreamentoTempo();
    geolocationService.iniciarRastreamentoCliques();
    geolocationService.iniciarRastreamentoScroll();
});

// Exportar para uso global
window.GeolocationService = GeolocationService;