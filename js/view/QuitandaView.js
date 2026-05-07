export default class QuitandaView {
  bindAddProduto(handler) {
    const form = document.getElementById("formProduto");
    const nomeInput = document.getElementById("nome");
    const categoriaInput = document.getElementById("categoria");
    const precoInput = document.getElementById("preco");
    const quantidadeInput = document.getElementById("quantidade");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const produto = {
        id: Date.now(),
        nome: nomeInput.value,
        categoria: categoriaInput.value,
        preco: parseFloat(precoInput.value),
        quantidade: parseInt(quantidadeInput.value, 10),
      };

      if (handler(produto)) {
        form.reset();
      }
    });
  }

  renderEstoque(produtos) {
    const lista = document.getElementById("estoque");
    lista.innerHTML = "";

    produtos.forEach((p) => {
      lista.innerHTML += `
                <li>${p.nome} - ${p.quantidade} unidades - ${p.categoria} - R$${p.preco} p/un.</li>
            `;
    });
  }

  bindVenda(handler) {
    const nomeInput = document.getElementById("vendaNome");
    const quantidadeInput = document.getElementById("vendaQuantidade");
    const btnVenda = document.getElementById("btnVenda");

    btnVenda.addEventListener("click", () => {
      const nome = nomeInput.value;
      const quantidade = parseInt(quantidadeInput.value, 10);

      if (handler(nome, quantidade)) {
        nomeInput.value = "";
        quantidadeInput.value = "";
      }
    });
  }

  renderMovimentacoes(movimentacoes) {
    const lista = document.getElementById("movimentacoes");
    lista.innerHTML = "";
    movimentacoes.forEach((m) => {
      lista.innerHTML += `
        <li>${m.tipo} - ${m.nome} - ${new Date(m.data).toLocaleString()}</li>
      `;
    });
  }

  // Adiciona o bind para atualização de produtos
  bindAtualizarProduto(handler) {
    const form = document.getElementById("formAtualizar");
    const nomeInput = document.getElementById("atualizaNome");
    const categoriaInput = document.getElementById("atualizaCategoria");
    const precoInput = document.getElementById("atualizaPreco");
    const quantidadeInput = document.getElementById("atualizaQuantidade");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = nomeInput.value;
      const dados = {};

      if (categoriaInput.value) dados.categoria = categoriaInput.value;
      if (precoInput.value) dados.preco = parseFloat(precoInput.value);
      if (quantidadeInput.value) dados.quantidade = parseInt(quantidadeInput.value, 10);

      if (!Object.keys(dados).length) {
        alert("Preencha pelo menos um campo para atualizar");
        return;
      }

      if (handler(nome, dados)) {
        form.reset();
      }
    });
  }
}
