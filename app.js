let numerosEscolhidos = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}
function exibeMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibeMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  let palavraTentativa = tentativa > 1 ? "tentativas" : "tentativa";
  let msgDeAcerto = `Parabéns, você acertou o número secreto com ${tentativa} ${palavraTentativa}`;
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", msgDeAcerto);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    exibirTextoNaTela("h1", "Errou! Tente novamente..");
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
    } else {
      exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
    }
    tentativa++;
    limparCampo();
  }
}
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function gerarNumeroAleatorio() {
  let limiteMaximoDeNumeros = 3;
  let numeroGerado = parseInt(Math.random() * limiteMaximoDeNumeros + 1);
  let quantidadeDeElementosNaLista = numerosEscolhidos.length;
  if (quantidadeDeElementosNaLista == limiteMaximoDeNumeros) {
    numerosEscolhidos = [];
  }
  if (numerosEscolhidos.includes(numeroGerado)) {
    return gerarNumeroAleatorio();
  } else {
    numerosEscolhidos.push(numeroGerado);
    return numeroGerado;
  }
}
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativa = 1;
  limparCampo();
  exibeMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
