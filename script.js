let advice = "";
let currentId = null;
const texto = document.querySelector("#advice");
const id_texto = document.querySelector("#advice-id");

function obterNovoAdvice() {
  // Faz uma requisição GET para a API
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((data) => {
      // Manipula os dados recebidos da API
      advice = data.slip.advice;
      const id = data.slip.id;
      if (id !== currentId) {
        currentId = id;
        id_texto.textContent = "advice# " + id;
        texto.textContent = '"' + advice + '"';
      } else {
        obterNovoAdvice();
      }
    })
    .catch((error) => {
      // Trata erros de requisição
      console.error("Erro:", error);
    });
}

let isRotated = 0;
const imgDado = document.querySelector(".img-dado");
const dado = document.querySelector(".circulo");

function atualizarDados() {
  // Chama a função para obter um novo advice
  obterNovoAdvice();
  isRotated += 180;
  imgDado.style.transform = `rotate(${isRotated}deg)`;
}

dado.addEventListener("click", atualizarDados);

obterNovoAdvice();
