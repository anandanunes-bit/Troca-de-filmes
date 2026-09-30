// 1. ELEMENTOS DO DOM
const inputTitulo = document.querySelector("#input-titulo");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaFilmes = document.querySelector("#lista-filmes");
const mensagem = document.querySelector("#mensagem");

// 2. ESTADO DA APLICAÇÃO
let filmes = [];
const CHAVE_STORAGE = "minha-colecao-filmes";

// 3. FUNÇÕES
function salvarFilmes() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
  } catch (erro) {
    console.error("Erro ao salvar no localStorage:", erro);
  }
}

function carregarFilmes() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
      filmes = JSON.parse(dadosSalvos);
    }
  } catch (erro) {
    console.error("Erro ao carregar do localStorage:", erro);
    filmes = [];
  }
}

function adicionarFilme() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    mensagem.textContent = "Digite o título de um filme.";
    mensagem.className = "mensagem erro";
    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    assistido: false
  };

  filmes.push(novoFilme);
  salvarFilmes();

  inputTitulo.value = "";
  mensagem.textContent = "Filme adicionado com sucesso!";
  mensagem.className = "mensagem sucesso";

  renderizarFilmes();
}

function alternarAssistido(id) {
  const filme = filmes.find(function (f) {
    return f.id === id;
  });

  if (!filme) return;

  filme.assistido = !filme.assistido;
  salvarFilmes();
  renderizarFilmes();
}

function excluirFilme(id) {
  filmes = filmes.filter(function (f) {
    return f.id !== id;
  });

  salvarFilmes();
  renderizarFilmes();
}

function renderizarFilmes() {
  listaFilmes.innerHTML = "";

  filmes.forEach(function (filme) {
    const li = document.createElement("li");
    li.classList.add("filme");

    if (filme.assistido) {
      li.classList.add("assistido");
    }

    const spanTitulo = document.createElement("span");
    spanTitulo.classList.add("titulo-filme");
    spanTitulo.textContent = filme.titulo;

    const btnStatus = document.createElement("button");
    btnStatus.classList.add("btn-status");
    btnStatus.textContent = filme.assistido ? "Não assistido" : "Assistido";

    btnStatus.addEventListener("click", function () {
      alternarAssistido(filme.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", function () {
      excluirFilme(filme.id);
    });

    li.appendChild(spanTitulo);
    li.appendChild(btnStatus);
    li.appendChild(btnExcluir);

    listaFilmes.appendChild(li);
  });
}

// 4. EVENTOS
if (btnAdicionar) {
  btnAdicionar.addEventListener("click", adicionarFilme);
}

// 5. INICIALIZAÇÃO
carregarFilmes();
renderizarFilmes();
