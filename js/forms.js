// Módulo de Formulários
class FormsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botões para abrir modais
        const trabalheBtn = document.getElementById('trabalhe-conosco-btn');
        const faleBtn = document.getElementById('fale-conosco-btn');

        if (trabalheBtn) {
            trabalheBtn.addEventListener('click', () => this.abrirModalTrabalhe());
        }

        if (faleBtn) {
            faleBtn.addEventListener('click', () => this.abrirModalFale());
        }

        // Botões para fechar modais
        const closeTrabalhe = document.getElementById('close-trabalhe-modal');
        const closeFale = document.getElementById('close-fale-modal');

        if (closeTrabalhe) {
            closeTrabalhe.addEventListener('click', () => this.fecharModal('trabalhe-conosco-modal'));
        }

        if (closeFale) {
            closeFale.addEventListener('click', () => this.fecharModal('fale-conosco-modal'));
        }

        // Fechar modal clicando fora
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.fecharModal(e.target.id);
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.fecharTodosModais();
            }
        });

        // Formulários
        const formTrabalhe = document.getElementById('trabalhe-conosco-form');
        const formFale = document.getElementById('fale-conosco-form');

        if (formTrabalhe) {
            formTrabalhe.addEventListener('submit', (e) => this.handleTrabalheSubmit(e));
        }

        if (formFale) {
            formFale.addEventListener('submit', (e) => this.handleFaleSubmit(e));
        }
    }

    // Modal Trabalhe Conosco
    abrirModalTrabalhe() {
        const modal = document.getElementById('trabalhe-conosco-modal');
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
        
        // Rastrear abertura do modal
        if (window.geolocationService) {
            window.geolocationService.rastrearEvento('modal_trabalhe_aberto');
        }
    }

    // Modal Fale Conosco
    abrirModalFale() {
        const modal = document.getElementById('fale-conosco-modal');
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
        
        // Rastrear abertura do modal
        if (window.geolocationService) {
            window.geolocationService.rastrearEvento('modal_fale_aberto');
        }
    }

    // Fechar modal específico
    fecharModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    }

    // Fechar todos os modais
    fecharTodosModais() {
        const modais = document.querySelectorAll('.modal.visible');
        modais.forEach(modal => {
            modal.classList.remove('visible');
        });
        document.body.style.overflow = 'auto';
    }

    // Handle submit do formulário Trabalhe Conosco
    async handleTrabalheSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Desabilitar botão e mostrar loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome-trabalhe').value,
                email: document.getElementById('email-trabalhe').value,
                experiencia: document.getElementById('experiencia').value,
                motivacao: document.getElementById('motivacao').value,
                disponibilidade: document.getElementById('disponibilidade').value
            };

            // Adicionar dados de geolocalização
            if (window.geolocationService) {
                const dadosUsuario = window.geolocationService.obterDadosUsuario();
                formData.ip = dadosUsuario.ip;
                formData.localizacao = window.geolocationService.obterLocalizacaoFormatada();
                formData.dispositivo = `${dadosUsuario.dispositivo} - ${dadosUsuario.navegador} - ${dadosUsuario.sistema}`;
            }

            // Validar dados
            if (!this.validarFormularioTrabalhe(formData)) {
                throw new Error('Por favor, preencha todos os campos obrigatórios');
            }

            // Enviar para Telegram
            if (window.telegramIntegration) {
                const sucesso = await window.telegramIntegration.notificarTrabalheConosco(formData);
                
                if (sucesso) {
                    this.mostrarSucesso('Candidatura enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                    this.fecharModal('trabalhe-conosco-modal');
                } else {
                    throw new Error('Erro ao enviar candidatura. Tente novamente.');
                }
            } else {
                // Fallback: mostrar dados no console (desenvolvimento)
                console.log('Dados do formulário Trabalhe Conosco:', formData);
                this.mostrarSucesso('Candidatura registrada! (Modo desenvolvimento)');
                form.reset();
                this.fecharModal('trabalhe-conosco-modal');
            }

            // Rastrear envio
            if (window.geolocationService) {
                window.geolocationService.rastrearEvento('formulario_trabalhe_enviado', {
                    disponibilidade: formData.disponibilidade
                });
            }

        } catch (error) {
            this.mostrarErro(error.message);
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    // Handle submit do formulário Fale Conosco
    async handleFaleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Desabilitar botão e mostrar loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome-contato').value,
                email: document.getElementById('email-contato').value,
                assunto: document.getElementById('assunto').value,
                mensagem: document.getElementById('mensagem').value
            };

            // Adicionar dados de geolocalização
            if (window.geolocationService) {
                const dadosUsuario = window.geolocationService.obterDadosUsuario();
                formData.ip = dadosUsuario.ip;
                formData.localizacao = window.geolocationService.obterLocalizacaoFormatada();
                formData.dispositivo = `${dadosUsuario.dispositivo} - ${dadosUsuario.navegador} - ${dadosUsuario.sistema}`;
            }

            // Validar dados
            if (!this.validarFormularioFale(formData)) {
                throw new Error('Por favor, preencha todos os campos obrigatórios');
            }

            // Enviar para Telegram
            if (window.telegramIntegration) {
                const sucesso = await window.telegramIntegration.notificarFaleConosco(formData);
                
                if (sucesso) {
                    this.mostrarSucesso('Mensagem enviada com sucesso! Responderemos em breve.');
                    form.reset();
                    this.fecharModal('fale-conosco-modal');
                } else {
                    throw new Error('Erro ao enviar mensagem. Tente novamente.');
                }
            } else {
                // Fallback: mostrar dados no console (desenvolvimento)
                console.log('Dados do formulário Fale Conosco:', formData);
                this.mostrarSucesso('Mensagem registrada! (Modo desenvolvimento)');
                form.reset();
                this.fecharModal('fale-conosco-modal');
            }

            // Rastrear envio
            if (window.geolocationService) {
                window.geolocationService.rastrearEvento('formulario_fale_enviado', {
                    assunto: formData.assunto
                });
            }

        } catch (error) {
            this.mostrarErro(error.message);
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    // Validações
    validarFormularioTrabalhe(dados) {
        return dados.nome && 
               dados.email && 
               dados.motivacao && 
               dados.disponibilidade &&
               this.validarEmail(dados.email);
    }

    validarFormularioFale(dados) {
        return dados.nome && 
               dados.email && 
               dados.assunto && 
               dados.mensagem &&
               this.validarEmail(dados.email);
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Notificações
    mostrarSucesso(mensagem) {
        this.mostrarNotificacao(mensagem, 'success');
    }

    mostrarErro(mensagem) {
        this.mostrarNotificacao(mensagem, 'error');
    }

    mostrarNotificacao(mensagem, tipo) {
        // Remover notificação existente
        const existente = document.querySelector('.notification');
        if (existente) {
            existente.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification ${tipo}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${tipo === 'success' ? '✅' : '❌'}</span>
                <span class="notification-message">${mensagem}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        // Adicionar ao DOM
        document.body.appendChild(notification);

        // Event listener para fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    // Método para pré-preencher formulário (útil para testes)
    preencherFormularioTeste(tipo) {
        if (tipo === 'trabalhe') {
            document.getElementById('nome-trabalhe').value = 'João Silva';
            document.getElementById('email-trabalhe').value = 'joao@email.com';
            document.getElementById('experiencia').value = 'Experiência em vendas e atendimento ao cliente.';
            document.getElementById('motivacao').value = 'Quero fazer parte de um projeto que realmente faz a diferença.';
            document.getElementById('disponibilidade').value = 'integral';
        } else if (tipo === 'fale') {
            document.getElementById('nome-contato').value = 'Maria Santos';
            document.getElementById('email-contato').value = 'maria@email.com';
            document.getElementById('assunto').value = 'parceria';
            document.getElementById('mensagem').value = 'Gostaria de saber mais sobre oportunidades de parceria.';
        }
    }
}

// Inicializar gerenciador de formulários
let formsManager;

document.addEventListener('DOMContentLoaded', () => {
    formsManager = new FormsManager();
});

// Exportar para uso global
window.FormsManager = FormsManager;