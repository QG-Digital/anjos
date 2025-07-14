// Módulo de Gráficos
class ChartManager {
    constructor() {
        this.canvas = document.getElementById('financial-chart');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.chartData = this.generateChartData();
        this.init();
    }

    init() {
        if (!this.ctx) return;
        
        this.setupCanvas();
        this.drawChart();
        
        // Atualizar gráfico periodicamente
        setInterval(() => {
            this.updateChart();
        }, CONFIG.dashboard.updateInterval);
    }

    setupCanvas() {
        // Configurar canvas responsivo
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = 400;
        
        this.canvas.width = containerWidth;
        this.canvas.height = containerHeight;
        
        // Configurar estilo
        this.canvas.style.width = containerWidth + 'px';
        this.canvas.style.height = containerHeight + 'px';
    }

    generateChartData() {
        // Gerar dados dos últimos 30 dias
        const dados = [];
        const hoje = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const data = new Date(hoje);
            data.setDate(data.getDate() - i);
            
            // Simular dados (em produção, viriam da API)
            const entradas = Math.random() * 2000 + 500;
            const saidas = Math.random() * 1500 + 300;
            const investimentos = Math.random() * 800 + 100;
            
            dados.push({
                data: data.toISOString().split('T')[0],
                entradas: entradas,
                saidas: saidas,
                investimentos: investimentos,
                saldo: entradas - saidas - investimentos
            });
        }
        
        return dados;
    }

    drawChart() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        // Limpar canvas
        ctx.clearRect(0, 0, width, height);
        
        // Configurações do gráfico
        const padding = 60;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Encontrar valores min/max
        const valores = this.chartData.flatMap(d => [d.entradas, d.saidas, d.investimentos]);
        const minValue = Math.min(...valores, 0);
        const maxValue = Math.max(...valores);
        const range = maxValue - minValue;
        
        // Função para converter valor em posição Y
        const getY = (value) => {
            return padding + chartHeight - ((value - minValue) / range) * chartHeight;
        };
        
        // Função para converter índice em posição X
        const getX = (index) => {
            return padding + (index / (this.chartData.length - 1)) * chartWidth;
        };
        
        // Desenhar grade
        this.drawGrid(ctx, padding, chartWidth, chartHeight, minValue, maxValue);
        
        // Desenhar linhas
        this.drawLine(ctx, this.chartData.map(d => d.entradas), getX, getY, CONFIG.dashboard.chartColors.entrada, 'Entradas');
        this.drawLine(ctx, this.chartData.map(d => d.saidas), getX, getY, CONFIG.dashboard.chartColors.saida, 'Saídas');
        this.drawLine(ctx, this.chartData.map(d => d.investimentos), getX, getY, CONFIG.dashboard.chartColors.investimento, 'Investimentos');
        
        // Desenhar legenda
        this.drawLegend(ctx, width, height);
        
        // Desenhar eixos
        this.drawAxes(ctx, padding, chartWidth, chartHeight, minValue, maxValue);
    }

    drawGrid(ctx, padding, chartWidth, chartHeight, minValue, maxValue) {
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        
        // Linhas horizontais
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const y = padding + (i / steps) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
        }
        
        // Linhas verticais
        const dataPoints = this.chartData.length;
        const verticalSteps = Math.min(7, dataPoints);
        for (let i = 0; i <= verticalSteps; i++) {
            const x = padding + (i / verticalSteps) * chartWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, padding + chartHeight);
            ctx.stroke();
        }
    }

    drawLine(ctx, data, getX, getY, color, label) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = getX(index);
            const y = getY(value);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Desenhar pontos
        ctx.fillStyle = color;
        data.forEach((value, index) => {
            const x = getX(index);
            const y = getY(value);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    drawLegend(ctx, width, height) {
        const legendItems = [
            { color: CONFIG.dashboard.chartColors.entrada, label: 'Entradas' },
            { color: CONFIG.dashboard.chartColors.saida, label: 'Saídas' },
            { color: CONFIG.dashboard.chartColors.investimento, label: 'Investimentos' }
        ];
        
        const legendX = width - 150;
        const legendY = 30;
        
        ctx.font = '14px Poppins, sans-serif';
        
        legendItems.forEach((item, index) => {
            const y = legendY + (index * 25);
            
            // Desenhar cor
            ctx.fillStyle = item.color;
            ctx.fillRect(legendX, y - 8, 15, 15);
            
            // Desenhar texto
            ctx.fillStyle = '#333';
            ctx.fillText(item.label, legendX + 25, y + 4);
        });
    }

    drawAxes(ctx, padding, chartWidth, chartHeight, minValue, maxValue) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.font = '12px Poppins, sans-serif';
        ctx.fillStyle = '#666';
        
        // Eixo Y (valores)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.stroke();
        
        // Labels do eixo Y
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const value = minValue + (maxValue - minValue) * (1 - i / steps);
            const y = padding + (i / steps) * chartHeight;
            const label = this.formatCurrency(value);
            
            ctx.textAlign = 'right';
            ctx.fillText(label, padding - 10, y + 4);
        }
        
        // Eixo X (datas)
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.stroke();
        
        // Labels do eixo X
        const dateSteps = Math.min(7, this.chartData.length);
        for (let i = 0; i <= dateSteps; i++) {
            const dataIndex = Math.floor((i / dateSteps) * (this.chartData.length - 1));
            const data = this.chartData[dataIndex];
            const x = padding + (i / dateSteps) * chartWidth;
            const label = this.formatDate(data.data);
            
            ctx.save();
            ctx.translate(x, padding + chartHeight + 15);
            ctx.rotate(-Math.PI / 4);
            ctx.textAlign = 'right';
            ctx.fillText(label, 0, 0);
            ctx.restore();
        }
    }

    updateChart() {
        // Simular novos dados (em produção, viria de uma API)
        const novosDados = this.generateChartData();
        this.chartData = novosDados;
        this.drawChart();
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        });
    }

    // Método para redimensionar o gráfico
    resize() {
        this.setupCanvas();
        this.drawChart();
    }

    // Método para exportar gráfico como imagem
    exportChart() {
        const link = document.createElement('a');
        link.download = 'grafico_financeiro.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

// Inicializar gerenciador de gráficos
let chartManager;

document.addEventListener('DOMContentLoaded', () => {
    chartManager = new ChartManager();
    
    // Redimensionar gráfico quando a janela mudar de tamanho
    window.addEventListener('resize', () => {
        if (chartManager) {
            chartManager.resize();
        }
    });
});

// Exportar para uso global
window.ChartManager = ChartManager;