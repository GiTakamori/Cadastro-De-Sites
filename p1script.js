
// ======================================================
// ELEMENTOS
// ======================================================
const form = document.getElementById("formProjeto");
const mensagem = document.getElementById("mensagem");

// ======================================================
// CALENDÁRIO
// ======================================================
flatpickr("#dataInicio", {
  dateFormat: "d/m/Y",
  defaultDate: "today"
});

// ======================================================
// MENSAGEM
// ======================================================
function mostrarMsg(texto, cor) {
  mensagem.innerText = texto;
  mensagem.style.color = cor;
  mensagem.style.opacity = "1";

  setTimeout(() => {
    mensagem.style.opacity = "0";
  }, 2000);
}

// ======================================================
// SUBMIT
// ======================================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const data = document.getElementById("dataInicio").value;

  if (!nome || !descricao || !data) {
    mostrarMsg("Preencha todos os campos!", "red");
    return;
  }

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("descricao", descricao);
  formData.append("data_inicio", data);

  try {

    const resposta = await fetch("salvar_projeto.php", {
      method: "POST",
      body: formData
    });

    const dados = await resposta.json();

    console.log("RESPOSTA:", dados);

    if (dados.sucesso) {

      mostrarMsg("Projeto cadastrado com sucesso!", "green");

      setTimeout(() => {
        window.location.href = "p2/index.html";
      }, 1200);

    }

  } catch (erro) {
    console.log("ERRO:", erro);
  }
});