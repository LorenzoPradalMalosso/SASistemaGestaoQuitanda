export default class QuitandaView {
  bindAddProduto(handler) {
    document.getElementById("formProduto").addEventListener("submit", (e) => {
      e.preventDefault();

      const produto = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        preco: parseFloat(document.getElementById("preco").value),
        quantidade: parseInt(document.getElementById("quantidade").value),
      };

      handler(produto);
      formProduto.reset();
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
    document.getElementById("btnVenda").addEventListener("click", () => {
      const nome = document.getElementById("vendaNome").value;
      const quantidade = parseInt(
        document.getElementById("vendaQuantidade").value,
      );

      handler(nome, quantidade);
      vendaNome.value = "";
      vendaQuantidade.value = "";
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
    document.getElementById("formAtualizar").addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("atualizaNome").value;
      const categoria = document.getElementById("atualizaCategoria").value;
      const preco = document.getElementById("atualizaPreco").value;
      const quantidade = document.getElementById("atualizaQuantidade").value;

      // Monta objeto apenas com campos preenchidos
      const dados = {};
      if (categoria) dados.categoria = categoria;
      if (preco) dados.preco = parseFloat(preco);
      if (quantidade) dados.quantidade = parseInt(quantidade);
      handler(nome, dados);
      formAtualizar.reset();
    });
  }
}
