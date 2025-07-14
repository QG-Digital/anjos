// Módulo de Projetos
const PROJETOS = {
    vendas: {
        id: 'vendas',
        nome: 'Domínio de Vendas',
        descricao: 'Nossa base operacional. Validação do modelo em larga escala com otimização de logística e treinamento.',
        imagem: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        investimentoTotal: 15000.00,
        investimentoAtual: 11250.00,
        progresso: 75,
        status: 'em-andamento',
        detalhes: {
            objetivo: 'Estabelecer uma operação de vendas sustentável e escalável que sirva como base financeira para todos os outros projetos.',
            estrategia: 'Foco em treinamento intensivo da equipe, otimização de rotas, melhoria contínua dos processos e expansão gradual da área de atuação.',
            resultados: [
                'Aumento de 300% na produtividade da equipe',
                'Redução de 40% nos custos operacionais',
                'Expansão para 5 novos bairros',
                'Treinamento de 12 novos colaboradores'
            ],
            proximosPassos: [
                'Implementar sistema de gestão digital',
                'Expandir para cidades vizinhas',
                'Criar programa de incentivos',
                'Desenvolver parcerias estratégicas'
            ]
        }
    },
    
    terreno: {
        id: 'terreno',
        nome: 'Aquisição do Terreno',
        descricao: 'Nossa terra. O marco zero da independência. Onde construiremos nossa base operacional.',
        imagem: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        investimentoTotal: 50000.00,
        investimentoAtual: 5000.00,
        progresso: 10,
        status: 'iniciado',
        detalhes: {
            objetivo: 'Adquirir um terreno estratégico para estabelecer nossa sede própria e garantir independência operacional.',
            estrategia: 'Pesquisa de mercado, análise de localização, negociação direta com proprietários e financiamento próprio sem dependência bancária.',
            especificacoes: [
                'Área mínima: 2.000m²',
                'Localização: Zona rural próxima à cidade',
                'Acesso: Estrada pavimentada',
                'Infraestrutura: Energia elétrica disponível',
                'Documentação: Regularizada'
            ],
            cronograma: [
                'Pesquisa e seleção: 3 meses',
                'Negociação: 2 meses',
                'Documentação: 1 mês',
                'Aquisição: 6 meses'
            ]
        }
    },
    
    casa: {
        id: 'casa',
        nome: 'Casa-Fortaleza',
        descricao: 'Moradia digna para nossa equipe. Um lugar seguro e de alto padrão. Quem constrói o império, vive nele.',
        imagem: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
        investimentoTotal: 200000.00,
        investimentoAtual: 4000.00,
        progresso: 2,
        status: 'planejado',
        detalhes: {
            objetivo: 'Construir uma residência coletiva de alto padrão que sirva como moradia e centro operacional para a equipe.',
            estrategia: 'Projeto arquitetônico sustentável, construção por etapas, uso de materiais de qualidade e mão de obra especializada.',
            caracteristicas: [
                '15 quartos individuais',
                'Áreas comuns amplas',
                'Cozinha industrial',
                'Sala de reuniões',
                'Área de lazer completa',
                'Sistema de segurança',
                'Energia solar',
                'Captação de água da chuva'
            ],
            fases: [
                'Projeto arquitetônico: R$ 15.000',
                'Fundação: R$ 40.000',
                'Estrutura: R$ 80.000',
                'Acabamento: R$ 65.000'
            ]
        }
    },
    
    abrigo: {
        id: 'abrigo',
        nome: 'Abrigo Animal',
        descricao: 'Santuário para os que não têm voz. Financiado 100% pelo lucro, com a mesma seriedade dos outros projetos.',
        imagem: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
        investimentoTotal: 100000.00,
        investimentoAtual: 0.00,
        progresso: 0,
        status: 'futuro',
        detalhes: {
            objetivo: 'Criar um abrigo modelo para animais abandonados, com foco em reabilitação, adoção responsável e educação.',
            estrategia: 'Desenvolvimento gradual após consolidação dos outros projetos, parcerias com veterinários e ONGs, campanhas de conscientização.',
            estrutura: [
                'Canis individuais: 50 unidades',
                'Gatil: 30 espaços',
                'Clínica veterinária',
                'Área de quarentena',
                'Espaço para adoção',
                'Centro de educação ambiental'
            ],
            servicos: [
                'Resgate de animais',
                'Tratamento veterinário',
                'Castração gratuita',
                'Programa de adoção',
                'Educação ambiental',
                'Campanhas de conscientização'
            ]
        }
    }
};

class GerenciadorProjetos {
    constructor() {
        this.init();
    }

    init() {
        this.renderizarProjetos();
        this.setupEventListeners();
    }

    renderizarProjetos() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.values(PROJETOS).forEach(projeto => {
            const projetoElement = this.criarElementoProjeto(projeto);
            grid.appendChild(projetoElement);
        });
    }

    criarElementoProjeto(projeto) {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <div class="project-image">
                <img src="${projeto.imagem}" alt="${projeto.nome}">
                <div class="project-overlay">
                    <button class="view-details-btn" data-project="${projeto.id}">Ver Detalhes</button>
                </div>
            </div>
            <div class="project-content">
                <h3>${projeto.nome}</h3>
                <p>${projeto.descricao}</p>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-label">Investido</span>
                        <span class="stat-value">${this.formatarMoeda(projeto.investimentoAtual)}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Meta</span>
                        <span class="stat-value">${this.formatarMoeda(projeto.investimentoTotal)}</span>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${projeto.progresso}%;"></div>
                </div>
                <div class="project-footer">
                    <span class="progress-text">${projeto.progresso}% Concluído</span>
                    <span class="status-badge ${projeto.status}">${this.formatarStatus(projeto.status)}</span>
                </div>
                <button class="view-data-btn" data-project="${projeto.id}">Ver Dados Financeiros</button>
            </div>
        `;

        return div;
    }

    setupEventListeners() {
        // Event delegation para botões dinâmicos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details-btn')) {
                const projetoId = e.target.getAttribute('data-project');
                this.abrirModalDetalhes(projetoId);
            }
            
            if (e.target.classList.contains('view-data-btn')) {
                const projetoId = e.target.getAttribute('data-project');
                this.verDadosFinanceiros(projetoId);
            }
        });

        // Modal close
        const closeBtn = document.getElementById('close-project-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.fecharModal());
        }

        // Close modal on outside click
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.fecharModal();
            });
        }
    }

    abrirModalDetalhes(projetoId) {
        const projeto = PROJETOS[projetoId];
        if (!projeto) return;

        const modal = document.getElementById('project-modal');
        const detailsContainer = document.getElementById('project-details');

        detailsContainer.innerHTML = this.criarConteudoModal(projeto);
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    criarConteudoModal(projeto) {
        return `
            <div class="project-modal-header">
                <img src="${projeto.imagem}" alt="${projeto.nome}" class="modal-project-image">
                <div class="modal-project-info">
                    <h2>${projeto.nome}</h2>
                    <p class="modal-project-description">${projeto.descricao}</p>
                    <div class="modal-project-stats">
                        <div class="modal-stat">
                            <span class="modal-stat-value">${this.formatarMoeda(projeto.investimentoAtual)}</span>
                            <span class="modal-stat-label">Investido</span>
                        </div>
                        <div class="modal-stat">
                            <span class="modal-stat-value">${projeto.progresso}%</span>
                            <span class="modal-stat-label">Progresso</span>
                        </div>
                        <div class="modal-stat">
                            <span class="modal-stat-value">${this.formatarStatus(projeto.status)}</span>
                            <span class="modal-stat-label">Status</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="project-modal-body">
                <div class="modal-section">
                    <h3>🎯 Objetivo</h3>
                    <p>${projeto.detalhes.objetivo}</p>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Estratégia</h3>
                    <p>${projeto.detalhes.estrategia}</p>
                </div>
                
                ${this.criarSecaoDetalhes(projeto)}
                
                <div class="modal-actions">
                    <button class="modal-btn primary" onclick="gerenciadorProjetos.verDadosFinanceiros('${projeto.id}')">
                        📊 Ver Dados Financeiros
                    </button>
                    <button class="modal-btn secondary" onclick="gerenciadorProjetos.fecharModal()">
                        Fechar
                    </button>
                </div>
            </div>
        `;
    }

    criarSecaoDetalhes(projeto) {
        const detalhes = projeto.detalhes;
        let html = '';

        // Seções específicas baseadas no tipo de projeto
        if (detalhes.resultados) {
            html += `
                <div class="modal-section">
                    <h3>✅ Resultados Alcançados</h3>
                    <ul class="modal-list">
                        ${detalhes.resultados.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (detalhes.proximosPassos) {
            html += `
                <div class="modal-section">
                    <h3>🚀 Próximos Passos</h3>
                    <ul class="modal-list">
                        ${detalhes.proximosPassos.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (detalhes.especificacoes) {
            html += `
                <div class="modal-section">
                    <h3>📐 Especificações</h3>
                    <ul class="modal-list">
                        ${detalhes.especificacoes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (detalhes.caracteristicas) {
            html += `
                <div class="modal-section">
                    <h3>🏗️ Características</h3>
                    <ul class="modal-list">
                        ${detalhes.caracteristicas.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (detalhes.fases) {
            html += `
                <div class="modal-section">
                    <h3>📅 Fases de Construção</h3>
                    <ul class="modal-list">
                        ${detalhes.fases.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (detalhes.servicos) {
            html += `
                <div class="modal-section">
                    <h3>🐾 Serviços Oferecidos</h3>
                    <ul class="modal-list">
                        ${detalhes.servicos.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return html;
    }

    verDadosFinanceiros(projetoId) {
        // Fechar modal atual se estiver aberto
        this.fecharModal();
        
        // Navegar para página de dados abertos com filtro do projeto
        this.navegarParaDadosAbertos(projetoId);
    }

    navegarParaDadosAbertos(projetoId) {
        // Simular navegação para dados abertos
        const navLink = document.querySelector('a[href="#dados-abertos"]');
        if (navLink) {
            navLink.click();
            
            // Aguardar um pouco para a página carregar e então aplicar filtro
            setTimeout(() => {
                if (window.dadosAbertos) {
                    // Aplicar filtro por projeto (implementar no módulo dados_abertos.js)
                    this.aplicarFiltroProjeto(projetoId);
                }
            }, 500);
        }
    }

    aplicarFiltroProjeto(projetoId) {
        // Esta função seria implementada no módulo dados_abertos.js
        // Por enquanto, apenas mostra uma mensagem
        console.log(`Filtrar dados por projeto: ${projetoId}`);
    }

    fecharModal() {
        const modal = document.getElementById('project-modal');
        modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    formatarStatus(status) {
        const statusMap = {
            'em-andamento': 'Em Andamento',
            'iniciado': 'Iniciado',
            'planejado': 'Planejado',
            'futuro': 'Futuro',
            'concluido': 'Concluído'
        };
        return statusMap[status] || status;
    }

    // Método para adicionar novo projeto
    adicionarProjeto(projeto) {
        PROJETOS[projeto.id] = projeto;
        this.renderizarProjetos();
    }

    // Método para atualizar projeto
    atualizarProjeto(projetoId, dadosAtualizados) {
        if (PROJETOS[projetoId]) {
            PROJETOS[projetoId] = { ...PROJETOS[projetoId], ...dadosAtualizados };
            this.renderizarProjetos();
        }
    }

    // Método para obter dados de um projeto
    obterProjeto(projetoId) {
        return PROJETOS[projetoId];
    }

    // Método para obter todos os projetos
    obterTodosProjetos() {
        return PROJETOS;
    }
}

// Inicializar gerenciador de projetos
let gerenciadorProjetos;

document.addEventListener('DOMContentLoaded', () => {
    gerenciadorProjetos = new GerenciadorProjetos();
});

// Exportar para uso global
window.PROJETOS = PROJETOS;
window.GerenciadorProjetos = GerenciadorProjetos;