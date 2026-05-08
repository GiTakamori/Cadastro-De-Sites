
const form = document.getElementById("formProjeto");
const mensagem = document.getElementById("mensagem");


flatpickr("#dataInicio", {
  dateFormat: "d/m/Y",
  defaultDate: "today"
});


function mostrarMsg(texto, cor) {

  mensagem.innerText = texto;
  mensagem.style.color = cor;
  mensagem.classList.add("show");

  setTimeout(() => {
    mensagem.classList.remove("show");
  }, 2000);
}

form.addEventListener("submit", (e) => {

  e.preventDefault();

 
  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const data = document.getElementById("dataInicio").value;


  if (!nome || !descricao || !data) {

    mostrarMsg("Preencha todos os campos!", "red");
    return;
  }

 
  mostrarMsg("Projeto cadastrado com sucesso!", "green");

 
  document.querySelector(".card").classList.add("success");

  
  setTimeout(() => {

    window.location.href = "p2index.html";
  }, 1500);

});