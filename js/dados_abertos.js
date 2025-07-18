// Módulo de Dados Abertos
class DadosAbertos {
    constructor() {
        this.dados = this.carregarDados();
        this.paginaAtual = 1;
        // A variável CONFIG pode não existir, então definimos um valor padrão.
        this.itensPorPagina = (typeof CONFIG !== 'undefined' && CONFIG.pagination) ? CONFIG.pagination.itemsPerPage : 15;
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
        // DADOS REAIS INJETADOS PELO BACK-END
        const dadosExemplo = [
            {
                id: 1,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 50.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (5 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 2,
                data: "2025-07-15",
                tipo: "saida",
                valor: -21.00,
                categoria: "Alimenta\u00e7\u00e3o",
                descricao: "Marmitas do Dia/Noite",
                projeto: "Pessoal"
            },
            {
                id: 3,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Kawane Caro",
                projeto: "Vendas"
            },
            {
                id: 4,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LETICIA",
                projeto: "Vendas"
            },
            {
                id: 5,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Valdenir Jo",
                projeto: "Vendas"
            },
            {
                id: 6,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 15.00,
                categoria: "Vendas",
                descricao: "PIX ITAMAR",
                projeto: "Vendas"
            },
            {
                id: 7,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX MARGARIDA G",
                projeto: "Vendas"
            },
            {
                id: 8,
                data: "2025-07-15",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Erika Yurie",
                projeto: "Vendas"
            },
            {
                id: 9,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 215.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (20 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 10,
                data: "2025-07-14",
                tipo: "saida",
                valor: -70.00,
                categoria: "Freelancer",
                descricao: "Teste com Free Lancer",
                projeto: "Vendas"
            },
            {
                id: 11,
                data: "2025-07-14",
                tipo: "saida",
                valor: -48.40,
                categoria: "Compras",
                descricao: "Folha A4 + Salgado",
                projeto: "Operacional"
            },
            {
                id: 12,
                data: "2025-07-14",
                tipo: "saida",
                valor: -10.49,
                categoria: "Alimenta\u00e7\u00e3o",
                descricao: "Marmita",
                projeto: "Pessoal"
            },
            {
                id: 13,
                data: "2025-07-14",
                tipo: "saida",
                valor: -30.00,
                categoria: "Compras",
                descricao: "Folhas A4 Inferior",
                projeto: "Operacional"
            },
            {
                id: 14,
                data: "2025-07-14",
                tipo: "saida",
                valor: -500.00,
                categoria: "Aluguel",
                descricao: "Aluguel do Apartameno",
                projeto: "Vendas"
            },
            {
                id: 15,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ANTONIO COU",
                projeto: "Vendas"
            },
            {
                id: 16,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 14.00,
                categoria: "Vendas",
                descricao: "PIX NILSON",
                projeto: "Vendas"
            },
            {
                id: 17,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JOSIANE J F",
                projeto: "Vendas"
            },
            {
                id: 18,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX RITA CASSIA",
                projeto: "Vendas"
            },
            {
                id: 19,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ANDREA CRIS",
                projeto: "Vendas"
            },
            {
                id: 20,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX VALDIRENE D",
                projeto: "Vendas"
            },
            {
                id: 21,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX MATHEUS AND",
                projeto: "Vendas"
            },
            {
                id: 22,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 12.00,
                categoria: "Vendas",
                descricao: "PIX Wellington",
                projeto: "Vendas"
            },
            {
                id: 23,
                data: "2025-07-14",
                tipo: "saida",
                valor: -48.40,
                categoria: "Vendas",
                descricao: "PIX ZAMP S.A.",
                projeto: "Vendas"
            },
            {
                id: 24,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Victoria Ja",
                projeto: "Vendas"
            },
            {
                id: 25,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Edilamar Pe",
                projeto: "Vendas"
            },
            {
                id: 26,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX THALES TOLE",
                projeto: "Vendas"
            },
            {
                id: 27,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Matheus Wei",
                projeto: "Vendas"
            },
            {
                id: 28,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Paulo Cesar",
                projeto: "Vendas"
            },
            {
                id: 29,
                data: "2025-07-14",
                tipo: "saida",
                valor: -10.49,
                categoria: "Vendas",
                descricao: "PIX SUPER MUFFA",
                projeto: "Vendas"
            },
            {
                id: 30,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX RAFAEL BARC",
                projeto: "Vendas"
            },
            {
                id: 31,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Andr\u00e9 Guilh",
                projeto: "Vendas"
            },
            {
                id: 32,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 2487.00,
                categoria: "Vendas",
                descricao: "INT PRE-PAGOXXXXX",
                projeto: "Vendas"
            },
            {
                id: 33,
                data: "2025-07-14",
                tipo: "saida",
                valor: -500.00,
                categoria: "Vendas",
                descricao: "PIX SOLANGE",
                projeto: "Vendas"
            },
            {
                id: 34,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX MARILUZ GOM",
                projeto: "Vendas"
            },
            {
                id: 35,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ANA CLAUDIA",
                projeto: "Vendas"
            },
            {
                id: 36,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 20.00,
                categoria: "Vendas",
                descricao: "PIX SANDRA REGI",
                projeto: "Vendas"
            },
            {
                id: 37,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Murilo Zieg",
                projeto: "Vendas"
            },
            {
                id: 38,
                data: "2025-07-14",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX CESAR F",
                projeto: "Vendas"
            },
            {
                id: 39,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 255.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (21 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 40,
                data: "2025-07-11",
                tipo: "saida",
                valor: -72.66,
                categoria: "Compras",
                descricao: "Folhas A4 2 Remas",
                projeto: "Operacional"
            },
            {
                id: 41,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 15.00,
                categoria: "Vendas",
                descricao: "PIX Everson Pal",
                projeto: "Vendas"
            },
            {
                id: 42,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Ana Carolin",
                projeto: "Vendas"
            },
            {
                id: 43,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Gabriela do",
                projeto: "Vendas"
            },
            {
                id: 44,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Isabelle Di",
                projeto: "Vendas"
            },
            {
                id: 45,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX GLAUCIA GAB",
                projeto: "Vendas"
            },
            {
                id: 46,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Lorene Pent",
                projeto: "Vendas"
            },
            {
                id: 47,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX SUZANA DE S",
                projeto: "Vendas"
            },
            {
                id: 48,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 50.00,
                categoria: "Vendas",
                descricao: "PIX JOSE CARLOS",
                projeto: "Vendas"
            },
            {
                id: 49,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Isadora Ang",
                projeto: "Vendas"
            },
            {
                id: 50,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ROSELI DE F",
                projeto: "Vendas"
            },
            {
                id: 51,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX FERNAND",
                projeto: "Vendas"
            },
            {
                id: 52,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LIGIA APARE",
                projeto: "Vendas"
            },
            {
                id: 53,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX DONIZETI ED",
                projeto: "Vendas"
            },
            {
                id: 54,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JULIANE NOV",
                projeto: "Vendas"
            },
            {
                id: 55,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Fernando Am",
                projeto: "Vendas"
            },
            {
                id: 56,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Joao Ubiraj",
                projeto: "Vendas"
            },
            {
                id: 57,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX GABRIEL BIN",
                projeto: "Vendas"
            },
            {
                id: 58,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JAQUELINE N",
                projeto: "Vendas"
            },
            {
                id: 59,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX WANDERLEY A",
                projeto: "Vendas"
            },
            {
                id: 60,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ISABELA",
                projeto: "Vendas"
            },
            {
                id: 61,
                data: "2025-07-11",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Paola Vieir",
                projeto: "Vendas"
            },
            {
                id: 62,
                data: "2025-07-11",
                tipo: "saida",
                valor: -72.66,
                categoria: "Vendas",
                descricao: "PIX SUPER MUFFA",
                projeto: "Vendas"
            },
            {
                id: 63,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 175.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (17 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 64,
                data: "2025-07-10",
                tipo: "saida",
                valor: -29.90,
                categoria: "Compras",
                descricao: "Folhas A4 Inferior",
                projeto: "Operacional"
            },
            {
                id: 65,
                data: "2025-07-10",
                tipo: "saida",
                valor: -39.90,
                categoria: "Compras",
                descricao: "Folhas A4",
                projeto: "Operacional"
            },
            {
                id: 66,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Amanda Gued",
                projeto: "Vendas"
            },
            {
                id: 67,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX SUZELENE CA",
                projeto: "Vendas"
            },
            {
                id: 68,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Gabriel de",
                projeto: "Vendas"
            },
            {
                id: 69,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Ana L\u00facia M",
                projeto: "Vendas"
            },
            {
                id: 70,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX RODRIGO DA",
                projeto: "Vendas"
            },
            {
                id: 71,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LIS CAROLIN",
                projeto: "Vendas"
            },
            {
                id: 72,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Bruna da Si",
                projeto: "Vendas"
            },
            {
                id: 73,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ANDREIA TAT",
                projeto: "Vendas"
            },
            {
                id: 74,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX T CRUZ CALE",
                projeto: "Vendas"
            },
            {
                id: 75,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX THIAGO GOUV",
                projeto: "Vendas"
            },
            {
                id: 76,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JOELMA FATI",
                projeto: "Vendas"
            },
            {
                id: 77,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Felipe",
                projeto: "Vendas"
            },
            {
                id: 78,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX FABIO ARIST",
                projeto: "Vendas"
            },
            {
                id: 79,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Luana Carol",
                projeto: "Vendas"
            },
            {
                id: 80,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Carolini Li",
                projeto: "Vendas"
            },
            {
                id: 81,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX EVELISE",
                projeto: "Vendas"
            },
            {
                id: 82,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 20.00,
                categoria: "Vendas",
                descricao: "PIX MATEUS FELI",
                projeto: "Vendas"
            },
            {
                id: 83,
                data: "2025-07-10",
                tipo: "saida",
                valor: -39.90,
                categoria: "Vendas",
                descricao: "PIX SUPERMERCAD",
                projeto: "Vendas"
            },
            {
                id: 84,
                data: "2025-07-10",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX MARLI APARE",
                projeto: "Vendas"
            },
            {
                id: 85,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 124.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (12 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 86,
                data: "2025-07-09",
                tipo: "saida",
                valor: -66.66,
                categoria: "Investimento",
                descricao: "Projeto Terreno",
                projeto: "Terreno"
            },
            {
                id: 87,
                data: "2025-07-09",
                tipo: "saida",
                valor: -15.00,
                categoria: "Compras",
                descricao: "Folha A4 100 Folhas + Salgado",
                projeto: "Operacional"
            },
            {
                id: 88,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 20.00,
                categoria: "Vendas",
                descricao: "PIX Ana Paula F",
                projeto: "Vendas"
            },
            {
                id: 89,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LUCAS JOABE",
                projeto: "Vendas"
            },
            {
                id: 90,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JOAO MESSIA",
                projeto: "Vendas"
            },
            {
                id: 91,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX GABRIEL MAH",
                projeto: "Vendas"
            },
            {
                id: 92,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX CAROLINE EN",
                projeto: "Vendas"
            },
            {
                id: 93,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX RENATA PACH",
                projeto: "Vendas"
            },
            {
                id: 94,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ANDREA FERR",
                projeto: "Vendas"
            },
            {
                id: 95,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 12.00,
                categoria: "Vendas",
                descricao: "PIX ANA PAULA B",
                projeto: "Vendas"
            },
            {
                id: 96,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX HELENA NERY",
                projeto: "Vendas"
            },
            {
                id: 97,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX RENATA RUZI",
                projeto: "Vendas"
            },
            {
                id: 98,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LIDIANE PER",
                projeto: "Vendas"
            },
            {
                id: 99,
                data: "2025-07-09",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX MATHEUS WIL",
                projeto: "Vendas"
            },
            {
                id: 100,
                data: "2025-07-09",
                tipo: "saida",
                valor: -15.00,
                categoria: "Vendas",
                descricao: "PIX JOSE RI",
                projeto: "Vendas"
            },
            {
                id: 101,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 140.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (12 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 102,
                data: "2025-07-08",
                tipo: "saida",
                valor: -47.80,
                categoria: "Compras",
                descricao: "Folha A4",
                projeto: "Operacional"
            },
            {
                id: 103,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 8.00,
                categoria: "Vendas",
                descricao: "PIX Felipe",
                projeto: "Vendas"
            },
            {
                id: 104,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX JFR PRESTAC",
                projeto: "Vendas"
            },
            {
                id: 105,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 8.00,
                categoria: "Vendas",
                descricao: "PIX ALESSANDRO",
                projeto: "Vendas"
            },
            {
                id: 106,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 20.00,
                categoria: "Vendas",
                descricao: "PIX Mayara Mate",
                projeto: "Vendas"
            },
            {
                id: 107,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Wilson de O",
                projeto: "Vendas"
            },
            {
                id: 108,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX GUILHERME C",
                projeto: "Vendas"
            },
            {
                id: 109,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX LAURA SUELY",
                projeto: "Vendas"
            },
            {
                id: 110,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 8.00,
                categoria: "Vendas",
                descricao: "PIX EDY SIMONE",
                projeto: "Vendas"
            },
            {
                id: 111,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX ERCI JOSEFI",
                projeto: "Vendas"
            },
            {
                id: 112,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Matheus dos",
                projeto: "Vendas"
            },
            {
                id: 113,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX CLEITON LUI",
                projeto: "Vendas"
            },
            {
                id: 114,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX HELEN ALINE",
                projeto: "Vendas"
            },
            {
                id: 115,
                data: "2025-07-08",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX MIRIAM MELL",
                projeto: "Vendas"
            },
            {
                id: 116,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 100.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (21 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 117,
                data: "2025-07-07",
                tipo: "saida",
                valor: -40.00,
                categoria: "Alimenta\u00e7\u00e3o",
                descricao: "Marmitas do Dia/Noite",
                projeto: "Pessoal"
            },
            {
                id: 118,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Adriely Gam",
                projeto: "Vendas"
            },
            {
                id: 119,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Jade Fran\u00e7a",
                projeto: "Vendas"
            },
            {
                id: 120,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX NAYARA GONC",
                projeto: "Vendas"
            },
            {
                id: 121,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX JULISSI FER",
                projeto: "Vendas"
            },
            {
                id: 122,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Viviane Cri",
                projeto: "Vendas"
            },
            {
                id: 123,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX NATALIE FRA",
                projeto: "Vendas"
            },
            {
                id: 124,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX CARLOS EDUA",
                projeto: "Vendas"
            },
            {
                id: 125,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Matheus Fai",
                projeto: "Vendas"
            },
            {
                id: 126,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX ANA CLAUDIA",
                projeto: "Vendas"
            },
            {
                id: 127,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 5.00,
                categoria: "Vendas",
                descricao: "PIX MIRIAM",
                projeto: "Vendas"
            },
            {
                id: 128,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Maria Carol",
                projeto: "Vendas"
            },
            {
                id: 129,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX NICOLAS BRU",
                projeto: "Vendas"
            },
            {
                id: 130,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX FRANCIELI G",
                projeto: "Vendas"
            },
            {
                id: 131,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX ANDREJ CAMI",
                projeto: "Vendas"
            },
            {
                id: 132,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX ERICK MORAE",
                projeto: "Vendas"
            },
            {
                id: 133,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX ALEXANDRE L",
                projeto: "Vendas"
            },
            {
                id: 134,
                data: "2025-07-07",
                tipo: "saida",
                valor: -40.00,
                categoria: "Vendas",
                descricao: "PIX NIC. BR",
                projeto: "Vendas"
            },
            {
                id: 135,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX NATALIA CAV",
                projeto: "Vendas"
            },
            {
                id: 136,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX GABRIEL FER",
                projeto: "Vendas"
            },
            {
                id: 137,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX J H D COM D",
                projeto: "Vendas"
            },
            {
                id: 138,
                data: "2025-07-07",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX Gabriele Lo",
                projeto: "Vendas"
            },
            {
                id: 139,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 32.00,
                categoria: "Vendas",
                descricao: "Faturamento consolidado do dia (9 transa\u00e7\u00f5es)",
                projeto: "Vendas"
            },
            {
                id: 140,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Cristiane M",
                projeto: "Vendas"
            },
            {
                id: 141,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX MARCO AUREL",
                projeto: "Vendas"
            },
            {
                id: 142,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 5.00,
                categoria: "Vendas",
                descricao: "PIX Andresa Sci",
                projeto: "Vendas"
            },
            {
                id: 143,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX GIOVANN",
                projeto: "Vendas"
            },
            {
                id: 144,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX LEONARDO LU",
                projeto: "Vendas"
            },
            {
                id: 145,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 10.00,
                categoria: "Vendas",
                descricao: "PIX VERONICA OL",
                projeto: "Vendas"
            },
            {
                id: 146,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Jeferson Xa",
                projeto: "Vendas"
            },
            {
                id: 147,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 5.00,
                categoria: "Vendas",
                descricao: "PIX Gabriel",
                projeto: "Vendas"
            },
            {
                id: 148,
                data: "2025-07-04",
                tipo: "entrada",
                valor: 2.00,
                categoria: "Vendas",
                descricao: "PIX Fl\u00e1via Ang\u00e9",
                projeto: "Vendas"
            },
            {
                id: 149,
                data: "2025-06-11",
                tipo: "entrada",
                valor: 0.02,
                categoria: "Outros",
                descricao: "Migra\u00e7\u00e3o de saldo PLAYERSBANK",
                projeto: "Outros"
            },
            {
                id: 150,
                data: "2025-06-11",
                tipo: "saida",
                valor: -0.02,
                categoria: "Outros",
                descricao: "Migra\u00e7\u00e3o de saldo PLAYERSBANK",
                projeto: "Outros"
            },
            {
                id: 151,
                data: "2025-06-11",
                tipo: "entrada",
                valor: 0.02,
                categoria: "Vendas",
                descricao: "MIGRACAO DE SALDO PLAYERSBANK",
                projeto: "Vendas"
            },
            {
                id: 152,
                data: "2025-06-11",
                tipo: "saida",
                valor: -0.02,
                categoria: "Outros",
                descricao: "Migra\u00e7\u00e3o de saldo PLAYERSBANK",
                projeto: "Geral"
            },
            {
                id: 153,
                data: "2025-05-17",
                tipo: "entrada",
                valor: 16.00,
                categoria: "Vendas",
                descricao: "at\u00e9",
                projeto: "Vendas"
            }
        ];

        // A geração de dados aleatórios pode ser mantida se desejado para demonstração,
        // ou removida para usar apenas os dados reais. Vamos mantê-la como no modelo.
        for (let i = dadosExemplo.length + 1; i <= 150; i++) {
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
                descricao: `${{tipo === 'entrada' ? 'Entrada' : 'Saída'}} de ${{categoria.toLowerCase()}}`,
                projeto: projeto
            });
        }

        return dadosExemplo.sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    setupEventListeners() {
        // Filtros
        if(document.getElementById('apply-filters')) document.getElementById('apply-filters').addEventListener('click', () => this.aplicarFiltros());
        if(document.getElementById('clear-filters')) document.getElementById('clear-filters').addEventListener('click', () => this.limparFiltros());
        
        // Exportação
        if(document.getElementById('export-csv')) document.getElementById('export-csv').addEventListener('click', () => this.exportarCSV());
        if(document.getElementById('export-json')) document.getElementById('export-json').addEventListener('click', () => this.exportarJSON());
        
        // Paginação
        if(document.getElementById('prev-page')) document.getElementById('prev-page').addEventListener('click', () => this.paginaAnterior());
        if(document.getElementById('next-page')) document.getElementById('next-page').addEventListener('click', () => this.proximaPagina());
    }

    carregarCategorias() {
        const categorias = [...new Set(this.dados.map(item => item.categoria))];
        const select = document.getElementById('filter-category');
        if (!select) return;

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
        
        this.filtros = { tipo: '', categoria: '', dataInicio: '', dataFim: '' };
        
        this.paginaAtual = 1;
        this.renderizarTabela();
        this.atualizarResumo();
    }

    filtrarDados() {
        return this.dados.filter(item => {
            if (this.filtros.tipo && item.tipo !== this.filtros.tipo) return false;
            if (this.filtros.categoria && item.categoria !== this.filtros.categoria) return false;
            if (this.filtros.dataInicio && item.data < this.filtros.dataInicio) return false;
            if (this.filtros.dataFim && item.data > this.filtros.dataFim) return false;
            return true;
        });
    }

    renderizarTabela() {
        const tbody = document.getElementById('data-table-body');
        if (!tbody) return;

        const dadosFiltrados = this.filtrarDados();
        const totalPaginas = Math.ceil(dadosFiltrados.length / this.itensPorPagina);
        const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        const dadosPagina = dadosFiltrados.slice(inicio, fim);
        
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
        this.atualizarPaginacao(totalPaginas, dadosFiltrados.length);
    }

    atualizarPaginacao(totalPaginas, totalItens) {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');
        if (!pageInfo) return;

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
        const totalEntradas = dadosFiltrados.filter(item => item.tipo === 'entrada').reduce((sum, item) => sum + item.valor, 0);
        const totalSaidas = Math.abs(dadosFiltrados.filter(item => item.tipo === 'saida').reduce((sum, item) => sum + item.valor, 0));
        const saldoLiquido = totalEntradas - totalSaidas;

        if (document.getElementById('total-records')) document.getElementById('total-records').textContent = dadosFiltrados.length;
        if (document.getElementById('total-entries')) document.getElementById('total-entries').textContent = this.formatarMoeda(totalEntradas);
        if (document.getElementById('total-exits')) document.getElementById('total-exits').textContent = this.formatarMoeda(totalSaidas);
        
        const saldoElement = document.getElementById('net-balance');
        if (saldoElement) {
            saldoElement.textContent = this.formatarMoeda(saldoLiquido);
            saldoElement.className = saldoLiquido >= 0 ? 'positive' : 'negative';
        }
    }

    exportarCSV() {
        const dadosFiltrados = this.filtrarDados();
        const headers = ['Data', 'Tipo', 'Valor', 'Categoria', 'Descrição', 'Projeto'];
        let csv = headers.join(',') + '\n';
        dadosFiltrados.forEach(item => {
            const row = [item.data, item.tipo, item.valor, `"${item.categoria}"`, `"${item.descricao}"`, `"${item.projeto}"`];
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
        // Adiciona T00:00:00 para evitar problemas de fuso horário
        return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    }

    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    adicionarRegistro(registro) {
        registro.id = this.dados.length + 1;
        this.dados.unshift(registro);
        this.renderizarTabela();
        this.atualizarResumo();
    }

    obterDadosDashboard() {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const dadosMes = this.dados.filter(item => new Date(item.data) >= inicioMes);
        const ganhosMes = dadosMes.filter(item => item.tipo === 'entrada').reduce((sum, item) => sum + item.valor, 0);
        const gastosMes = Math.abs(dadosMes.filter(item => item.tipo === 'saida').reduce((sum, item) => sum + item.valor, 0));
        const saldoAtual = this.dados.reduce((sum, item) => sum + item.valor, 0);
        return { saldoAtual, ganhosMes, gastosMes, pessoasProjeto: 8 };
    }
}

// Inicializar quando a página carregar
let dadosAbertos;
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se um elemento específico para este script existe, para evitar erros em outras páginas
    if (document.getElementById('data-table-body')) { // Ou outro ID específico do seu dashboard
        dadosAbertos = new DadosAbertos();
    }
});

// Exportar para uso global, se necessário
window.DadosAbertos = DadosAbertos;
