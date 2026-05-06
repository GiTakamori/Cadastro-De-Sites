const form = document.getElementById("formRequisito");
const mensagem = document.getElementById("mensagem");
const STORAGE_KEY = "reqmanager_requisitos";

// =========================
// STORAGE
// =========================
function carregarRequisitos() {
    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) return [];

    try {
        const requisitos = JSON.parse(dados);
        return Array.isArray(requisitos) ? requisitos : [];
    } catch (erro) {
        console.error("Falha ao ler requisitos salvos:", erro);
        return [];
    }
}

function salvarRequisitos(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// =========================
// UI TEMPORÁRIA
// =========================
function mostrarHistoricoTemp(req) {
    const container = document.getElementById("historicoTemp");

    const div = document.createElement("div");
    div.classList.add("card-temp");

    div.innerHTML = `
        <button type="button">&times;</button>
        <strong>${req.titulo}</strong><br>
        ${req.descricao}<br>
        ${req.tipo} | ${req.prioridade} | ${req.status}
    `;

    const botao = div.querySelector("button");

    botao.onclick = () => {
        if (confirm("Deseja excluir este requisito?")) {
            div.remove();
        }
    };

    container.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 4000);
}

// =========================
// PROJETO
// =========================
const params = new URLSearchParams(window.location.search);
const id_projeto = params.get("id_projeto") || 1;

// =========================
// SUBMIT FORM
// =========================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const tipo = document.getElementById("tipo").value;
    const status = document.getElementById("status").value;
    const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');

    if (!titulo || !descricao || !tipo || !prioridadeSelecionada) {
        mensagem.className = "show erro";
        mensagem.innerText = "⚠️ Preencha todos os campos!";
        setTimeout(() => mensagem.classList.remove("show"), 3000);
        return;
    }

    const prioridade = prioridadeSelecionada.value;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("tipo", tipo);
    formData.append("prioridade", prioridade);
    formData.append("status", status);
    formData.append("id_projeto", id_projeto);

    fetch("../salvar_requisito.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.sucesso) {
                const requisito = { titulo, descricao, tipo, prioridade, status };

                mostrarHistoricoTemp(requisito);

                mensagem.className = "show sucesso";
                mensagem.innerText = "✅ Requisito cadastrado com sucesso!";

                setTimeout(() => mensagem.classList.remove("show"), 3000);

                form.reset();
            } else {
                mensagem.className = "show erro";
                mensagem.innerText = "⚠️ Erro: " + (data.erro || "Falha ao salvar.");

                setTimeout(() => mensagem.classList.remove("show"), 3000);
            }
        })
        .catch(err => {
            console.error(err);

            mensagem.className = "show erro";
            mensagem.innerText = "⚠️ Erro de conexão.";

            setTimeout(() => mensagem.classList.remove("show"), 3000);
        });
});

// =========================
// NAVEGAÇÃO
// =========================
document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "../index.php";
});

document.getElementById("btnProxima").addEventListener("click", () => {
    if (form.checkValidity()) {
        window.location.href = "dashboard/lista.html?id_projeto=" + id_projeto;
    } else {
        form.reportValidity();
    }
});