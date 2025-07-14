// Módulo de Dados Abertos
class DadosAbertos {
    constructor() {
        this.dados = this.carregarDados();
        this.paginaAtual = 1;
        this.itensPorPagina = CONFIG.pagination.itemsPerPage;
        this.filtros = {
            tipo: '',
            categoria: '',
            dataInicio: '',
            dataFim: '',
            projeto: ''
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.carregarCategorias();
        this.renderizarTabela();
        this.atualizarResumo();
    }

    // Dados de exemplo (em produção, viriam de uma API)
    carregarDados() {
        const dadosExemplo = [
            {
                id: 1,
                data: '2025-01-15',
                tipo: 'entrada',
                valor: 12840.00,
                categoria: 'Vendas',
                descricao: 'Lucro bruto do mês anterior',
                projeto: 'Vendas'
            },
            {
                id: 2,
                data: '2025-01-14',
                tipo: 'saida',
                valor: -300.00,
                categoria: 'Material',
                descricao: 'Compra de 10.000 folhas A4',
                projeto: 'Vendas'
            },
            {
                id: 3,
                data: '2025-01-13',
                tipo: 'saida',
                valor: -150.00,
                categoria: 'Manutenção',
                descricao: 'Manutenção da Impressora',
                projeto: 'Vendas'
            },
            {
                id: 4,
                data: '2025-01-12',
                tipo: 'saida',
                valor: -5000.00,
                categoria: 'Investimento',
                descricao: 'Adiantamento Fundo do Terreno',
                projeto: 'Terreno'
            },
            {
                id: 5,
                data: '2025-01-11',
                tipo: 'saida',
                valor: -1800.00,
                categoria: 'Pessoas',
                descricao: 'Alimentação e Transporte da Equipe',
                projeto: 'Operacional'
            },
            {
                id: 6,
                data: '2025-01-10',
                tipo: 'saida',
                valor: -450.00,
                categoria: 'Animais',
                descricao: 'Ração para pontos de alimentação animal',
                projeto: 'Abrigo Animal'
            },
            {
                id: 7,
                data: '2025-01-09',
                tipo: 'entrada',
                valor: 8500.00,
                categoria: 'Vendas',
                descricao: 'Vendas da semana',
                projeto: 'Vendas'
            },
            {
                id: 8,
                data: '2025-01-08',
                tipo: 'entrada',
                valor: 2000.00,
                categoria: 'Investimento',
                descricao: 'Investimento de parceiro',
                projeto: 'Geral'
            }
        ];

        // Gerar mais dados para demonstração
        for (let i = 9; i <= 150; i++) {
            const tipos = ['entrada', 'saida'];
            const categorias = ['Vendas', 'Material', 'Manutenção', 'Investimento', 'Pessoas', 'Animais'];
            const projetos = ['Vendas', 'Terreno', 'Casa', 'Abrigo Animal', 'Operacional', 'Geral'];
            
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const categoria = categorias[Math.floor(Math.random() * categorias.length)];
            const projeto = projetos[Math.floor(Math.random() * projetos.length)];
            
            const data = new Date();
            data.setDate(data.getDate() - Math.floor(Math.random() * 90));
            
            dadosExemplo.push({
                id: i,
                data: data.toISOString().split('T')[0],
                tipo: tipo,
                valor: tipo === 'entrada' ? 
                    Math.floor(Math.random() * 10000) + 100 : 
                    -(Math.floor(Math.random() * 5000) + 50),
                categoria: categoria,
                descricao: `${tipo === 'entrada' ? 'Entrada' : 'Saída'} de ${categoria.toLowerCase()}`,
                projeto: projeto
            });
        }

        return dadosExemplo.sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('apply-filters').addEventListener('click', () => this.aplicarFiltros());
        document.getElementById('clear-filters').addEventListener('click', () => this.limparFiltros());
        
        // Exportação
        document.getElementById('export-csv').addEventListener('click', () => this.exportarCSV());
        document.getElementById('export-json').addEventListener('click', () => this.exportarJSON());
        
        // Paginação
        document.getElementById('prev-page').addEventListener('click', () => this.paginaAnterior());
        document.getElementById('next-page').addEventListener('click', () => this.proximaPagina());
    }

    carregarCategorias() {
        const categorias = [...new Set(this.dados.map(item => item.categoria))];
        const select = document.getElementById('filter-category');
        
        select.innerHTML = '<option value="">Todas as Categorias</option>';
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            select.appendChild(option);
        });
    }

    aplicarFiltros() {
        this.filtros = {
            tipo: document.getElementById('filter-type').value,
            categoria: document.getElementById('filter-category').value,
            dataInicio: document.getElementById('filter-date-start').value,
            dataFim: document.getElementById('filter-date-end').value
        };
        
        this.paginaAtual = 1;
        this.renderizarTabela();
        this.atualizarResumo();
    }

    limparFiltros() {
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-date-start').value = '';
        document.getElementById('filter-date-end').value = '';
        
        this.filtros = {
            tipo: '',
            categoria: '',
            dataInicio: '',
            dataFim: ''
        };
        
        this.paginaAtual = 1;
        this.renderizarTabela();
        this.atualizarResumo();
    }

    filtrarDados() {
        return this.dados.filter(item => {
            // Filtro por tipo
            if (this.filtros.tipo && item.tipo !== this.filtros.tipo) return false;
            
            // Filtro por categoria
            if (this.filtros.categoria && item.categoria !== this.filtros.categoria) return false;
            
            // Filtro por data
            if (this.filtros.dataInicio && item.data < this.filtros.dataInicio) return false;
            if (this.filtros.dataFim && item.data > this.filtros.dataFim) return false;
            
            return true;
        });
    }

    renderizarTabela() {
        const dadosFiltrados = this.filtrarDados();
        const totalPaginas = Math.ceil(dadosFiltrados.length / this.itensPorPagina);
        const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        const dadosPagina = dadosFiltrados.slice(inicio, fim);

        const tbody = document.getElementById('data-table-body');
        tbody.innerHTML = '';

        dadosPagina.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatarData(item.data)}</td>
                <td><span class="badge ${item.tipo}">${item.tipo === 'entrada' ? 'Entrada' : 'Saída'}</span></td>
                <td class="${item.valor >= 0 ? 'positive' : 'negative'}">${this.formatarMoeda(item.valor)}</td>
                <td>${item.categoria}</td>
                <td>${item.descricao}</td>
                <td>${item.projeto}</td>
            `;
            tbody.appendChild(row);
        });

        // Atualizar paginação
        this.atualizarPaginacao(totalPaginas, dadosFiltrados.length);
    }

    atualizarPaginacao(totalPaginas, totalItens) {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');

        prevBtn.disabled = this.paginaAtual <= 1;
        nextBtn.disabled = this.paginaAtual >= totalPaginas;
        
        pageInfo.textContent = `Página ${this.paginaAtual} de ${totalPaginas} (${totalItens} registros)`;
    }

    paginaAnterior() {
        if (this.paginaAtual > 1) {
            this.paginaAtual--;
            this.renderizarTabela();
        }
    }

    proximaPagina() {
        const dadosFiltrados = this.filtrarDados();
        const totalPaginas = Math.ceil(dadosFiltrados.length / this.itensPorPagina);
        
        if (this.paginaAtual < totalPaginas) {
            this.paginaAtual++;
            this.renderizarTabela();
        }
    }

    atualizarResumo() {
        const dadosFiltrados = this.filtrarDados();
        
        const totalRegistros = dadosFiltrados.length;
        const totalEntradas = dadosFiltrados
            .filter(item => item.tipo === 'entrada')
            .reduce((sum, item) => sum + item.valor, 0);
        const totalSaidas = Math.abs(dadosFiltrados
            .filter(item => item.tipo === 'saida')
            .reduce((sum, item) => sum + item.valor, 0));
        const saldoLiquido = totalEntradas - totalSaidas;

        document.getElementById('total-records').textContent = totalRegistros;
        document.getElementById('total-entries').textContent = this.formatarMoeda(totalEntradas);
        document.getElementById('total-exits').textContent = this.formatarMoeda(totalSaidas);
        
        const saldoElement = document.getElementById('net-balance');
        saldoElement.textContent = this.formatarMoeda(saldoLiquido);
        saldoElement.className = saldoLiquido >= 0 ? 'positive' : 'negative';
    }

    exportarCSV() {
        const dadosFiltrados = this.filtrarDados();
        const headers = ['Data', 'Tipo', 'Valor', 'Categoria', 'Descrição', 'Projeto'];
        
        let csv = headers.join(',') + '\n';
        
        dadosFiltrados.forEach(item => {
            const row = [
                item.data,
                item.tipo === 'entrada' ? 'Entrada' : 'Saída',
                item.valor,
                `"${item.categoria}"`,
                `"${item.descricao}"`,
                `"${item.projeto}"`
            ];
            csv += row.join(',') + '\n';
        });

        this.downloadFile(csv, 'dados_abertos.csv', 'text/csv');
    }

    exportarJSON() {
        const dadosFiltrados = this.filtrarDados();
        const json = JSON.stringify(dadosFiltrados, null, 2);
        this.downloadFile(json, 'dados_abertos.json', 'application/json');
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(Math.abs(valor));
    }

    // Método para adicionar novo registro (para uso futuro)
    adicionarRegistro(registro) {
        registro.id = this.dados.length + 1;
        this.dados.unshift(registro);
        this.renderizarTabela();
        this.atualizarResumo();
    }

    // Método para obter dados para dashboard
    obterDadosDashboard() {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        
        const dadosMes = this.dados.filter(item => 
            new Date(item.data) >= inicioMes
        );

        const ganhosMes = dadosMes
            .filter(item => item.tipo === 'entrada')
            .reduce((sum, item) => sum + item.valor, 0);
            
        const gastosMes = Math.abs(dadosMes
            .filter(item => item.tipo === 'saida')
            .reduce((sum, item) => sum + item.valor, 0));

        const saldoAtual = this.dados.reduce((sum, item) => sum + item.valor, 0);

        return {
            saldoAtual,
            ganhosMes,
            gastosMes,
            pessoasProjeto: 8 // Valor fixo por enquanto
        };
    }
}

// Inicializar quando a página carregar
let dadosAbertos;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dados-abertos')) {
        dadosAbertos = new DadosAbertos();
    }
});

// Exportar para uso global
window.DadosAbertos = DadosAbertos;