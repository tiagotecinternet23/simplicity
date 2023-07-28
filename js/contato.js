/* Selecionando os elementos a serem manipulados */
const formulario = document.querySelector("form");
const campoTelefone = document.querySelector("#telefone");
const campoCep = document.querySelector("#cep");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoLocalizar = document.querySelector("#localizar-cep");
const mensagemStatus = document.querySelector("#status");

/* Ativação das máscaras usando jQuery e jQuery Mask */
$(campoCep).mask("00000-000");
$(campoTelefone).mask("(00) 0000-0000");

botaoLocalizar.addEventListener("click", async function (event) {
  event.preventDefault();

  // Pegar o cep digitado no campo
  let cep = campoCep.value;

  /* Ajax: técnica de comunicação assíncrona,
    geralmente usada com APIs. */

  // Preparar uma url dinâmica (com variável e o resto da url)
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  /* Acessando a API ViaCEP e obtendo
    dados do cep informado. */

  // Etapa 1: acessar o ViaCEP passando a url
  const resposta = await fetch(url);

  // Etapa 2: pegar/extrair os dados da resposta como objeto JSON
  const dados = await resposta.json();

  // Etapa 3: mostrar/lidar com os dados
  if ("erro" in dados) {
    mensagemStatus.textContent = "CEP não encontrado!";
    mensagemStatus.style.color = "red";
  } else {
    mensagemStatus.textContent = "CEP encontrado!";
    mensagemStatus.style.color = "blue";

    // Colocando cada parte dos dados nos campos
    campoEndereco.value = dados.logradouro;
    campoBairro.value = dados.bairro;
    campoCidade.value = dados.localidade;
    campoEstado.value = dados.uf;
  }
});

/* Programação do Formspree usando Ajax */
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Valeu parça!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
