```javascript
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
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
}


function carregarFilmes() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (dadosSalvos) {
    filmes = JSON.parse(dadosSalvos);
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
  const filme = filmes.find(function (filme) {
    return filme.id === id;
  });

  if (!filme) {
    return;
  }

  filme.assistido = !filme.assistido;

  salvarFilmes();

  renderizarFilmes();
}


function excluirFilme(id) {
  filmes = filmes.filter(function (filme) {
    return filme.id !== id;
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

    if (filme.assistido) {
      btnStatus.textContent = "Não assistido";
    } else {
      btnStatus.textContent = "Assistido";
    }

    btnStatus.addEventListener("click", function () {
      alternarAssistido(filme.id);
    });

    li.appendChild(spanTitulo);
    li.appendChild(btnStatus);


    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", function () {
      excluirFilme(filme.id);
    });

    li.appendChild(btnExcluir);

    listaFilmes.appendChild(li);
  });
}


// 4. EVENTOS

btnAdicionar.addEventListener("click", adicionarFilme);


// 5. INICIALIZAÇÃO

carregarFilmes();
renderizarFilmes();
```

