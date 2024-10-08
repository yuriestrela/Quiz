const perguntas = [
  {
    pergunta: "Qual linguagem de programação é amplamente usada para desenvolvimento de aplicações web front-end?",
    opcoes: ["Python", "JavaScript", "Java", "C++"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual linguagem de programação é conhecida por sua simplicidade e uso em ciência de dados?",
    opcoes: ["C#", "JavaScript", "Python", "PHP"],
    respostaCorreta: 2
  },
  {
    pergunta: "O que significa 'SQL' no contexto de bancos de dados?",
    opcoes: ["Simple Query Language", "Structured Query Language", "Standard Question List", "System Quality Language"],
    respostaCorreta: 0
  },
  {
    pergunta: "O que acontece quando um loop while é definido como while True:?",
    opcoes: ["O loop será executado uma vez e depois terminará.", "O loop criará um loop infinito, a menos que haja uma condição de quebra.", "O loop executará apenas se a condição for verdadeira.", "O loop não será executado, pois True não é uma condição válida."],
    respostaCorreta: 1
  },
  {
    pergunta: "Quais das seguintes opções não se configura como um FrameWork?",
    opcoes: ["Django", "React", "Angular", "HTML"],
    respostaCorreta: 3
  }
]

let perguntaAtual = 0;
let pontuacao = 0;
let opcaoSelecionada = null;

function exibirPergunta() {
  const pergunta = document.getElementById('pergunta');
  const opcoes = document.getElementById('opcoes');
  const mensagem = document.getElementById('mensagem');
  const botaoProximo = document.getElementById('botaoProximo');

  opcoes.innerHTML = "";
  mensagem.textContent = "";
  opcaoSelecionada = null;
  botaoProximo.disabled = true;

  pergunta.textContent = perguntas[perguntaAtual].pergunta;

  perguntas[perguntaAtual].opcoes.forEach((opcao, index) => {
    const button = document.createElement("button");
    button.textContent = opcao;
    button.onclick = () => selecionarOpcao(index);
    opcoes.appendChild(button);
  });
}

function selecionarOpcao(index) {
  opcaoSelecionada = index;

  document.querySelectorAll("#opcoes button").forEach((button) => {
    button.classList.remove("selecionado");
  });
  document.querySelectorAll("#opcoes button")[index].classList.add("selecionado");


  const botaoProximo = document.getElementById('botaoProximo');
  botaoProximo.disabled = false;
}

function verificarResposta() {
  const mensagem = document.getElementById('mensagem');

  if (opcaoSelecionada === perguntas[perguntaAtual].respostaCorreta) {
    pontuacao++;
    mensagem.textContent = "Certa Resposta!";
    mensagem.style.color = "green";
  } else {
    const respostaCorreta = perguntas[perguntaAtual].opcoes[perguntas[perguntaAtual].respostaCorreta];
    mensagem.textContent = `Resposta Errada! A resposta correta é: ${respostaCorreta}.`;
    mensagem.style.color = "red";
  }
}

function proximaPergunta() {
  if (opcaoSelecionada !== null) {
    verificarResposta();

    let tempoEspera = (opcaoSelecionada === perguntas[perguntaAtual].respostaCorreta) ? 1000 : 3000;

    
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
      setTimeout(exibirPergunta, tempoEspera);
    } else {
      setTimeout(exibirResultado, tempoEspera);
    }
  }
}

function exibirResultado() {
  const pergunta = document.getElementById('pergunta');
  const opcoes = document.getElementById('opcoes');
  const mensagem = document.getElementById('mensagem');

  opcoes.innerHTML = '';
  mensagem.textContent = '';

  pergunta.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

  const botaoReiniciar = document.createElement('button');
  botaoReiniciar.textContent = "Reiniciar Quiz";
  botaoReiniciar.onclick = reiniciarQuiz;
  botaoReiniciar.style.marginTop = "20px";
  opcoes.appendChild(botaoReiniciar);

  // Desabilitar o botão de próximo
  const botaoProximo = document.getElementById('botaoProximo');
  botaoProximo.style.display = "none";
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  opcaoSelecionada = null;

  const botaoProximo = document.getElementById('botaoProximo');
  botaoProximo.style.display = "inline";

  exibirPergunta()
}

exibirPergunta();