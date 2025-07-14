// Módulo de Integração com Telegram
class TelegramIntegration {
    constructor() {
        this.config = CONFIG.telegram;
        this.init();
    }

    init() {
        // Verificar se as configurações estão válidas
        if (!validateConfig()) {
            console.warn('Configurações do Telegram não estão completas');
            return;
        }
    }

    // Enviar mensagem para bot específico
    async enviarMensagem(botType, mensagem, dados = {}) {
        const botConfig = this.config[botType];
        if (!botConfig) {
            console.error(`Configuração não encontrada para bot: ${botType}`);
            return false;
        }

        const url = `https://api.telegram.org/bot${botConfig.botToken}/sendMessage`;
        
        const payload = {
            chat_id: botConfig.chatId,
            text: mensagem,
            parse_mode: 'HTML'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`Mensagem enviada com sucesso para ${botType}`);
                return true;
            } else {
                console.error(`Erro ao enviar mensagem para ${botType}:`, response.statusText);
                return false;
            }
        } catch (error) {
            console.error(`Erro de rede ao enviar mensagem para ${botType}:`, error);
            return false;
        }
    }

    // Notificar acesso ao site
    async notificarAcesso(dadosUsuario) {
        const mensagem = this.formatarMensagemAcesso(dadosUsuario);
        return await this.enviarMensagem('cookies', mensagem, dadosUsuario);
    }

    // Notificar formulário trabalhe conosco
    async notificarTrabalheConosco(dadosFormulario) {
        const mensagem = this.formatarMensagemTrabalhe(dadosFormulario);
        return await this.enviarMensagem('trabalhe', mensagem, dadosFormulario);
    }

    // Notificar formulário fale conosco
    async notificarFaleConosco(dadosFormulario) {
        const mensagem = this.formatarMensagemContato(dadosFormulario);
        return await this.enviarMensagem('contato', mensagem, dadosFormulario);
    }

    // Notificar eventos do sistema
    async notificarSistema(evento, dados = {}) {
        const mensagem = this.formatarMensagemSistema(evento, dados);
        return await this.enviarMensagem('sistema', mensagem, dados);
    }

    // Formatadores de mensagem
    formatarMensagemAcesso(dados) {
        const timestamp = new Date().toLocaleString('pt-BR');
        
        return `
🌐 <b>NOVO ACESSO AO SITE</b>

📅 <b>Data/Hora:</b> ${timestamp}
🌍 <b>IP:</b> ${dados.ip || 'Não disponível'}
📍 <b>Localização:</b> ${dados.cidade || 'N/A'}, ${dados.estado || 'N/A'}, ${dados.pais || 'N/A'}
🖥️ <b>Dispositivo:</b> ${dados.dispositivo || 'Não identificado'}
🌐 <b>Navegador:</b> ${dados.navegador || 'Não identificado'}
📱 <b>Sistema:</b> ${dados.sistema || 'Não identificado'}
🔗 <b>Página:</b> ${dados.pagina || 'Página inicial'}
📊 <b>Cookies:</b> ${dados.cookiesAceitos ? 'Aceitos' : 'Rejeitados'}

${dados.referrer ? `🔗 <b>Origem:</b> ${dados.referrer}` : ''}
        `.trim();
    }

    formatarMensagemTrabalhe(dados) {
        const timestamp = new Date().toLocaleString('pt-BR');
        
        return `
💼 <b>NOVA CANDIDATURA - TRABALHE CONOSCO</b>

📅 <b>Data/Hora:</b> ${timestamp}

👤 <b>DADOS PESSOAIS</b>
• <b>Nome:</b> ${dados.nome}
• <b>Email:</b> ${dados.email}

💪 <b>EXPERIÊNCIA</b>
${dados.experiencia || 'Não informado'}

🎯 <b>MOTIVAÇÃO</b>
${dados.motivacao}

⏰ <b>DISPONIBILIDADE</b>
${dados.disponibilidade}

🌍 <b>DADOS TÉCNICOS</b>
• <b>IP:</b> ${dados.ip || 'N/A'}
• <b>Localização:</b> ${dados.localizacao || 'N/A'}
• <b>Dispositivo:</b> ${dados.dispositivo || 'N/A'}
        `.trim();
    }

    formatarMensagemContato(dados) {
        const timestamp = new Date().toLocaleString('pt-BR');
        
        return `
📧 <b>NOVA MENSAGEM - FALE CONOSCO</b>

📅 <b>Data/Hora:</b> ${timestamp}

👤 <b>CONTATO</b>
• <b>Nome:</b> ${dados.nome}
• <b>Email:</b> ${dados.email}

📋 <b>ASSUNTO</b>
${dados.assunto}

💬 <b>MENSAGEM</b>
${dados.mensagem}

🌍 <b>DADOS TÉCNICOS</b>
• <b>IP:</b> ${dados.ip || 'N/A'}
• <b>Localização:</b> ${dados.localizacao || 'N/A'}
• <b>Dispositivo:</b> ${dados.dispositivo || 'N/A'}
        `.trim();
    }

    formatarMensagemSistema(evento, dados) {
        const timestamp = new Date().toLocaleString('pt-BR');
        
        let mensagem = `⚙️ <b>EVENTO DO SISTEMA</b>\n\n📅 <b>Data/Hora:</b> ${timestamp}\n🔔 <b>Evento:</b> ${evento}\n`;

        switch (evento) {
            case 'export_dados':
                mensagem += `📊 <b>Tipo:</b> ${dados.tipo}\n📁 <b>Registros:</b> ${dados.registros}\n👤 <b>Usuário:</b> ${dados.ip}`;
                break;
            case 'filtro_aplicado':
                mensagem += `🔍 <b>Filtros:</b> ${JSON.stringify(dados.filtros)}\n📊 <b>Resultados:</b> ${dados.resultados}`;
                break;
            case 'projeto_visualizado':
                mensagem += `📁 <b>Projeto:</b> ${dados.projeto}\n👤 <b>IP:</b> ${dados.ip}`;
                break;
            default:
                mensagem += `📝 <b>Dados:</b> ${JSON.stringify(dados)}`;
        }

        return mensagem;
    }

    // Método para testar conexão
    async testarConexao(botType) {
        const mensagem = `🧪 <b>TESTE DE CONEXÃO</b>\n\n📅 ${new Date().toLocaleString('pt-BR')}\n✅ Bot ${botType} funcionando corretamente!`;
        return await this.enviarMensagem(botType, mensagem);
    }

    // Método para enviar relatório diário
    async enviarRelatorioDiario() {
        if (!window.dadosAbertos) return;

        const dados = window.dadosAbertos.obterDadosDashboard();
        const hoje = new Date().toLocaleDateString('pt-BR');
        
        const mensagem = `
📊 <b>RELATÓRIO DIÁRIO</b>

📅 <b>Data:</b> ${hoje}

💰 <b>FINANCEIRO</b>
• <b>Saldo Atual:</b> ${this.formatarMoeda(dados.saldoAtual)}
• <b>Ganhos do Mês:</b> ${this.formatarMoeda(dados.ganhosMes)}
• <b>Gastos do Mês:</b> ${this.formatarMoeda(dados.gastosMes)}

👥 <b>EQUIPE</b>
• <b>Pessoas no Projeto:</b> ${dados.pessoasProjeto}

📈 <b>PROJETOS</b>
${this.obterResumoProjetosTelegram()}
        `.trim();

        return await this.enviarMensagem('sistema', mensagem);
    }

    obterResumoProjetosTelegram() {
        if (!window.PROJETOS) return 'Dados não disponíveis';

        return Object.values(window.PROJETOS)
            .map(projeto => `• <b>${projeto.nome}:</b> ${projeto.progresso}%`)
            .join('\n');
    }

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
}

// Inicializar integração do Telegram
let telegramIntegration;

document.addEventListener('DOMContentLoaded', () => {
    telegramIntegration = new TelegramIntegration();
    
    // Configurar relatório diário (opcional)
    // setInterval(() => {
    //     telegramIntegration.enviarRelatorioDiario();
    // }, 24 * 60 * 60 * 1000); // 24 horas
});

// Exportar para uso global
window.TelegramIntegration = TelegramIntegration;