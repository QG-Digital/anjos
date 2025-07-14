// Configurações Gerais do Sistema
const CONFIG = {
    // Configurações do Telegram
    telegram: {
        // Bot para cookies e acessos
        cookies: {
            botToken: 'SEU_BOT_TOKEN_COOKIES',
            chatId: 'SEU_CHAT_ID_COOKIES'
        },
        // Bot para formulário trabalhe conosco
        trabalhe: {
            botToken: 'SEU_BOT_TOKEN_TRABALHE',
            chatId: 'SEU_CHAT_ID_TRABALHE'
        },
        // Bot para fale conosco
        contato: {
            botToken: 'SEU_BOT_TOKEN_CONTATO',
            chatId: 'SEU_CHAT_ID_CONTATO'
        },
        // Bot para dados gerais do sistema
        sistema: {
            botToken: 'SEU_BOT_TOKEN_SISTEMA',
            chatId: 'SEU_CHAT_ID_SISTEMA'
        }
    },

    // Configurações de paginação
    pagination: {
        itemsPerPage: 50
    },

    // Configurações de geolocalização
    geolocation: {
        enabled: true,
        apiKey: 'SUA_API_KEY_GEOLOCATION' // Para serviços como IPGeolocation
    },

    // URLs de APIs externas
    apis: {
        ipGeolocation: 'https://api.ipgeolocation.io/ipgeo',
        ipInfo: 'https://ipapi.co/json/'
    },

    // Configurações de cookies
    cookies: {
        expirationDays: 365,
        domain: window.location.hostname
    },

    // Configurações do dashboard
    dashboard: {
        updateInterval: 30000, // 30 segundos
        chartColors: {
            entrada: '#25D366',
            saida: '#e03911',
            investimento: '#f9c533'
        }
    }
};

// Função para validar configurações
function validateConfig() {
    const requiredConfigs = [
        'telegram.cookies.botToken',
        'telegram.trabalhe.botToken',
        'telegram.contato.botToken',
        'telegram.sistema.botToken'
    ];

    const missing = requiredConfigs.filter(config => {
        const keys = config.split('.');
        let obj = CONFIG;
        for (const key of keys) {
            if (!obj[key] || obj[key].startsWith('SEU_')) {
                return true;
            }
            obj = obj[key];
        }
        return false;
    });

    if (missing.length > 0) {
        console.warn('Configurações pendentes:', missing);
        return false;
    }
    return true;
}

// Função para obter configuração aninhada
function getConfig(path) {
    const keys = path.split('.');
    let obj = CONFIG;
    for (const key of keys) {
        if (!obj[key]) return null;
        obj = obj[key];
    }
    return obj;
}

// Exportar configurações
window.CONFIG = CONFIG;
window.validateConfig = validateConfig;
window.getConfig = getConfig;