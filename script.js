// Banco de dados expandido com dilemas profundos
const situacoes = [
    {
        titulo: "Situação 1: Uso da Água e a Comunidade",
        texto: "Uma forte seca atingiu a região. Para manter sua alta produção de milho no nível máximo, você precisará captar mais água do rio local, o que pode reduzir o abastecimento da comunidade de pequenos produtores vizinhos. O que você faz?",
        opcao1: {
            texto: "Priorizar a lavoura: Captar o volume máximo de água necessário para garantir 100% da produção.",
            impactos: { producao: 20, ambiente: -15, pessoas: -20 },
            feedback: "Sua produção subiu, mas o rio baixou e a comunidade vizinha protestou contra a falta de água."
        },
        opcao2: {
            texto: "Cooperação e racionamento: Conversar com os vizinhos, reduzir seu uso e instalar irrigação gota a gota mais econômica.",
            impactos: { producao: -5, ambiente: 15, pessoas: 25 },
            feedback: "Você perdeu um pouco de produção inicial, mas ganhou o respeito da comunidade e protegeu o rio!"
        }
    },
    {
        titulo: "Situação 2: Segurança do Trabalhador",
        texto: "A época da colheita chegou e o prazo está apertado. Para economizar tempo e dinheiro, alguns funcionários sugerem aplicar um tratamento biológico rápido na lavoura sem esperar o tempo correto de entrega de novos EPIs (Equipamentos de Proteção Individual). Qual sua postura?",
        opcao1: {
            texto: "Acelerar o processo: Permitir a aplicação rápida para não perder a janela de colheita e lucrar mais rápido.",
            impactos: { producao: 25, ambiente: 5, pessoas: -30 },
            feedback: "A colheita foi rápida, mas dois funcionários passaram mal por falta de proteção. Clima tenso na fazenda."
        },
        opcao2: {
            texto: "Respeito à vida: Paralisar a aplicação até que todos os EPIs cheguem, garantindo a segurança integral da equipe.",
            impactos: { producao: -10, ambiente: 5, pessoas: 30 },
            feedback: "A colheita atrasou um pouco, mas a equipe se sentiu extremamente valorizada e segura."
        }
    },
    {
        titulo: "Situação 3: Agricultura Familiar e Merenda Escolar",
        texto: "A prefeitura local abriu uma chamada para fornecer alimentos para as escolas públicas. Você, como grande produtor, pode disputar toda a vaga ou ceder parte da cota para que a cooperativa de agricultura familiar local também participe. O que faz?",
        opcao1: {
            texto: "Disputar tudo: Usar sua escala para vencer a licitação inteira e garantir o lucro total da fazenda.",
            impactos: { producao: 20, ambiente: 0, pessoas: -15 },
            feedback: "O contrato é seu! Mas os pequenos produtores locais perderam renda essencial para sustentar suas famílias."
        },
        opcao2: {
            texto: "Dividir o mercado: Fazer uma parceria com a cooperativa local, dividindo o fornecimento de forma justa.",
            impactos: { producao: 5, ambiente: 5, pessoas: 25 },
            feedback: "Parceria de sucesso! A comunidade se fortaleceu e as crianças locais ganharam alimentos diversos e frescos."
        }
    },
    {
        titulo: "Situação 4: Capacitação Tecnológica",
        texto: "Novas colheitadeiras com inteligência artificial e menor emissão de carbono chegaram ao mercado. Elas exigem alto conhecimento técnico. O que fazer com seus atuais operadores experientes, mas que não sabem mexer na tecnologia?",
        opcao1: {
            texto: "Substituição direta: Demitir os funcionários antigos e contratar técnicos de fora já capacitados para operar imediatamente.",
            impactos: { producao: 25, ambiente: 10, pessoas: -25 },
            feedback: "As máquinas estão a todo vapor, mas a demissão em massa gerou revolta e tristeza na região."
        },
        opcao2: {
            texto: "Valorização humana: Investir em cursos de capacitação e alfabetização digital para sua equipe atual, mesmo que demore mais.",
            impactos: { producao: 10, ambiente: 10, pessoas: 30 },
            feedback: "Seus funcionários aprenderam a usar a nova tecnologia com orgulho. Lealdade e eficiência máximas!"
        }
    }
];

// Estado Inicial do Jogo
let status = { producao: 50, ambiente: 50, pessoas: 50 };
let rodadaAtual = 0;

function iniciarJogo() {
    document.getElementById("tela-inicial").classList.add("escondido");
    document.getElementById("tela-jogo").classList.remove("escondido");
    mostrarRodada();
}

function mostrarRodada() {
    atualizarInterface();
    
    // Verifica derrota imediata antes de passar de fase
    if (status.producao <= 0 || status.ambiente <= 0 || status.pessoas <= 0) {
        finalizarJogo(false, "Sua gestão causou o colapso de um dos pilares essenciais.");
        return;
    }

    // Verifica vitória por conclusão das rodadas
    if (rodadaAtual >= situacoes.length) {
        finalizarJogo(true, "Excelente! Você concluiu o desafio demonstrando liderança justa e consciente.");
        return;
    }

    // Atualiza os textos da tela
    const dadosRodada = situacoes[rodadaAtual];
    document.getElementById("titulo-rodada").innerText = dadosRodada.titulo;
    document.getElementById("texto-situacao").innerText = dadosRodada.texto;
    document.getElementById("btn-opcao1").innerText = dadosRodada.opcao1.texto;
    document.getElementById("btn-opcao2").innerText = dadosRodada.opcao2.texto;
}

function escolherOpcao(numeroOpcao) {
    const rodada = situacoes[rodadaAtual];
    const opcaoEscolhida = numeroOpcao === 1 ? rodada.opcao1 : rodada.opcao2;

    // Aplica os impactos limitando os valores matematicamente entre 0 e 100
    status.producao = Math.max(0, Math.min(100, status.producao + opcaoEscolhida.impactos.producao));
    status.ambiente = Math.max(0, Math.min(100, status.ambiente + opcaoEscolhida.impactos.ambiente));
    status.pessoas = Math.max(0, Math.min(100, status.pessoas + opcaoEscolhida.impactos.pessoas));

    // Exibe o painel de feedback da ação tomada
    const feed = document.getElementById("feed-impacto");
    feed.classList.remove("escondido");
    feed.innerText = `Resultado anterior: ${opcaoEscolhida.feedback}`;

    rodadaAtual++;
    mostrarRodada();
}

function atualizarInterface() {
    const pilares = ['producao', 'ambiente', 'pessoas'];
    
    pilares.forEach(pilar => {
        const barra = document.getElementById(`barra-${pilar}`);
        const texto = document.getElementById(`txt-${pilar}`);
        const containerPilar = document.getElementById(`pilar-${pilar}`);
        const valor = status[pilar];

        barra.style.width = valor + "%";
        texto.innerText = valor + "%";

        // Estilização dinâmica para situações de perigo (Abaixo de 25%)
        if (valor <= 25) {
            barra.style.backgroundColor = "#ef4444"; // Vermelho Crítico
            containerPilar.classList.add("critico");
        } else if (valor <= 50) {
            barra.style.backgroundColor = "#f59e0b"; // Laranja Alerta
            containerPilar.classList.remove("critico");
        } else {
            // Cores padrão originais
            if(pilar === 'producao') barra.style.backgroundColor = "#f59e0b";
            if(pilar === 'ambiente') barra.style.backgroundColor = "#10b981";
            if(pilar === 'pessoas') barra.style.backgroundColor = "#3b82f6";
            containerPilar.classList.remove("critico");
        }
    });
}

function finalizarJogo(ganhou, mensagemContexto) {
    document.getElementById("tela-jogo").classList.add("escondido");
    const telaFim = document.getElementById("tela-fim");
    telaFim.classList.remove("escondido");

    const titulo = document.getElementById("resultado-titulo");
    const texto = document.getElementById("resultado-texto");
    const vitrine = document.getElementById("vitrine-medalhas");
    const listaMedalhas = document.getElementById("lista-medalhas");
    
    listaMedalhas.innerHTML = ""; // Limpa conquistas antigas

    if (ganhou) {
        let pontuacaoFinal = status.producao + status.ambiente + status.pessoas;
        titulo.innerText = "🏆 Gestor do Futuro!";
        titulo.style.color = "#0f766e";
        
        texto.innerHTML = `${mensagemContexto}<br><br>
        <strong>Sua pontuação final de equilíbrio foi: ${pontuacaoFinal} de 300 pontos possíveis!</strong>`;

        // Sistema dinâmico de medalhas por desempenho
        vitrine.classList.remove("escondido");
        
        if (status.pessoas >= 70) {
            listaMedalhas.innerHTML += `<div class="medalha-card"><span class="icone-med">🥇</span><strong>Guardião Social</strong><br><small>Respeito máximo às pessoas e equipes rurais.</small></div>`;
        }
        if (status.ambiente >= 70) {
            listaMedalhas.innerHTML += `<div class="medalha-card"><span class="icone-med">🌿</span><strong>Selo Eco-Terra</strong><br><small>Preservou a biodiversidade com maestria.</small></div></div>`;
        }
        if (status.producao >= 70) {
            listaMedalhas.innerHTML += `<div class="medalha-card"><span class="icone-med">🚜</span><strong>Gigante do Agro</strong><br><small>Alcançou níveis excelentes de colheita.</small></div>`;
        }
        if (listaMedalhas.innerHTML === "") {
            listaMedalhas.innerHTML += `<div class="medalha-card"><span class="icone-med">⚖️</span><strong>Líder Equilibrado</strong><br><small>Completou o jogo sem deixar nenhum pilar quebrar.</small></div>`;
        }

    } else {
        titulo.innerText = "❌ Fim de Linha: Crise na Fazenda";
        titulo.style.color = "#ef4444";
        texto.innerText = `${mensagemContexto} Lembre-se do lema do Agrinho: O progresso no campo só é sustentável de verdade se caminhar lado a lado com a proteção da natureza e com a dignidade humana de quem trabalha nela.`;
        vitrine.classList.add("escondido");
    }
}

function reiniciarJogo() {
    status = { producao: 50, ambiente: 50, pessoas: 50 };
    rodadaAtual = 0;
    
    document.getElementById("feed-impacto").classList.add("escondido");
    document.getElementById("tela-fim").classList.add("escondido");
    document.getElementById("tela-jogo").classList.remove("escondido");
    
    mostrarRodada();
}
