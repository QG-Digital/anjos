// Módulo de Textos Dinâmicos
const TEXTOS = {
    manifesto: {
        heroTitle: "O dinheiro não é o problema. É a ferramenta que vamos usar para quebrar o sistema.",
        heroSubtitle: "Nascemos da necessidade, sobrevivemos pela inteligência e vamos prosperar pela determinação. Isto não é uma caridade. É um negócio com alma.",
        impactQuote: "Nós não queremos sua pena. Queremos parceiros que entendam que, para construir um mundo melhor, primeiro você precisa dominar as regras do mundo real."
    },

    roteiro: {
        intro: "Toda grande história tem um roteiro. Este é o nosso. Cada fase é um investimento, financiado pelo nosso próprio trabalho. O progresso é real e visível. É aqui que cada centavo é aplicado.",
        fases: [
            {
                id: 'vendas',
                icon: '📈',
                titulo: 'Fase 1: Domínio de Vendas',
                descricao: 'Validar o modelo em larga escala, otimizando a logística e o treinamento da equipe. A base de tudo.',
                progresso: 75,
                status: 'em-andamento'
            },
            {
                id: 'terreno',
                icon: '🏗️',
                titulo: 'Fase 2: O Terreno',
                descricao: 'Aquisição da nossa terra. Onde nossa base será erguida. O marco zero da nossa independência.',
                progresso: 10,
                status: 'iniciado'
            },
            {
                id: 'casa',
                icon: '🏠',
                titulo: 'Fase 3: A Casa-Fortaleza',
                descricao: 'Construir a moradia digna para nossa equipe. Um lugar seguro e de alto padrão. Quem constrói o império, vive nele.',
                progresso: 2,
                status: 'planejado'
            },
            {
                id: 'abrigo',
                icon: '🐾',
                titulo: 'Fase 4: Abrigo Animal',
                descricao: 'Financiado 100% pelo lucro, será o santuário para os que não têm voz. Um projeto paralelo com a mesma seriedade.',
                progresso: 0,
                status: 'futuro'
            }
        ]
    },

    saida: {
        intro: "Este é um chamado. Não uma oferta de emprego. É um convite para quem cansou do jogo e quer começar a construir o seu.",
        sistemaJogo: [
            "Salário mínimo que mal paga as contas.",
            "Viver para trabalhar, sem nunca prosperar.",
            "Ser julgado pela sua aparência, não pela sua força.",
            "Sentir que seu potencial está sendo desperdiçado.",
            "Achar que a rua é o fim da linha."
        ],
        nossoJogo: [
            "Ganhos baseados no seu esforço e determinação.",
            "Trabalhar para construir algo seu, não para os outros.",
            "Ser valorizado pela sua lealdade e vontade de vencer.",
            "Aprender a gerar dinheiro e criar oportunidades.",
            "Entender que a rua foi só o começo."
        ],
        conclusao: "Se você se identifica com o nosso jogo e não tem medo de trabalhar duro, talvez seu lugar seja aqui. Nós não damos o peixe. Nós ensinamos a construir o barco, a rede e a vender para o restaurante mais caro da cidade."
    },

    conexao: {
        intro: "Procuramos aliados, não seguidores. Investidores com visão, parceiros de negócio e pessoas que queiram construir junto. Se a nossa determinação ressoa com a sua, entre em contato."
    },

    footer: {
        description: "Nós não resgatamos. Nós construímos. Um império para quem foi esquecido.",
        mission: "DETERMINAÇÃO. É a nossa moeda. É o nosso combustível. É tudo o que temos e tudo o que precisamos."
    },

    splash: {
        message: "Construindo um império... na raça."
    }
};

// Função para carregar textos na página
function carregarTextos() {
    // Manifesto
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const impactQuote = document.getElementById('impact-quote');
    
    if (heroTitle) heroTitle.textContent = TEXTOS.manifesto.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = TEXTOS.manifesto.heroSubtitle;
    if (impactQuote) impactQuote.textContent = TEXTOS.manifesto.impactQuote;

    // Roteiro
    const roteiroIntro = document.getElementById('roteiro-intro');
    if (roteiroIntro) roteiroIntro.textContent = TEXTOS.roteiro.intro;

    // Saída
    const saidaIntro = document.getElementById('saida-intro');
    if (saidaIntro) saidaIntro.textContent = TEXTOS.saida.intro;

    // Conexão
    const conexaoIntro = document.getElementById('conexao-intro');
    if (conexaoIntro) conexaoIntro.textContent = TEXTOS.conexao.intro;

    // Footer
    const footerDescription = document.getElementById('footer-description');
    const footerMission = document.getElementById('footer-mission');
    
    if (footerDescription) footerDescription.textContent = TEXTOS.footer.description;
    if (footerMission) footerMission.textContent = TEXTOS.footer.mission;

    // Carregar fases do roteiro
    carregarFasesRoteiro();
    
    // Carregar seção de saída
    carregarSecaoSaida();
}

function carregarFasesRoteiro() {
    const roteiroGrid = document.getElementById('roteiro-grid');
    if (!roteiroGrid) return;

    roteiroGrid.innerHTML = '';

    TEXTOS.roteiro.fases.forEach(fase => {
        const faseElement = document.createElement('div');
        faseElement.className = 'action-card';
        faseElement.innerHTML = `
            <div class="action-icon">${fase.icon}</div>
            <h3>${fase.titulo}</h3>
            <p>${fase.descricao}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${fase.progresso}%;"></div>
            </div>
            <span class="progress-text">${fase.progresso}% Concluído</span>
        `;
        roteiroGrid.appendChild(faseElement);
    });
}

function carregarSecaoSaida() {
    const exitContainer = document.getElementById('exit-container');
    if (!exitContainer) return;

    exitContainer.innerHTML = `
        <div class="exit-column">
            <h3>O Jogo do Sistema</h3>
            <ul>
                ${TEXTOS.saida.sistemaJogo.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="exit-column">
            <h3>O Nosso Jogo</h3>
            <ul>
                ${TEXTOS.saida.nossoJogo.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    // Adicionar conclusão
    const conclusao = document.createElement('p');
    conclusao.className = 'page-intro';
    conclusao.style.marginTop = '3rem';
    conclusao.textContent = TEXTOS.saida.conclusao;
    exitContainer.parentNode.insertBefore(conclusao, exitContainer.nextSibling);
}

// Função para atualizar texto específico
function atualizarTexto(secao, chave, novoTexto) {
    if (TEXTOS[secao] && TEXTOS[secao][chave]) {
        TEXTOS[secao][chave] = novoTexto;
        carregarTextos(); // Recarregar textos
        return true;
    }
    return false;
}

// Função para obter texto
function obterTexto(secao, chave) {
    return TEXTOS[secao] && TEXTOS[secao][chave] ? TEXTOS[secao][chave] : null;
}

// Exportar funções
window.TEXTOS = TEXTOS;
window.carregarTextos = carregarTextos;
window.atualizarTexto = atualizarTexto;
window.obterTexto = obterTexto;