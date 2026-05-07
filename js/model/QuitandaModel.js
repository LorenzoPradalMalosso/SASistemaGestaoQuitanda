export class Produto {
  constructor(id, nome, categoria, preco, quantidade) {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
    this.quantidade = quantidade;
  }
}

export default class QuitandaModel {
  constructor() {
    this.produtos = [];
    this.movimentacoes = [];
  }

  normalizarNome(nome) {
    return nome ? nome.toString().trim().toLowerCase() : "";
  }

  validarPreco(preco) {
    const valor = Number(preco);
    if (!Number.isFinite(valor) || valor <= 0) {
      throw new Error("Preço deve ser um número maior que zero");
    }
    return valor;
  }

  validarQuantidade(quantidade, allowZero = true) {
    const valor = Number(quantidade);
    if (
      !Number.isFinite(valor) ||
      !Number.isInteger(valor) ||
      valor < 0 ||
      (!allowZero && valor === 0)
    ) {
      throw new Error("Quantidade inválida");
    }
    return valor;
  }

  encontrarProdutoPorNome(nome) {
    const nomeNormalizado = this.normalizarNome(nome);
    return this.produtos.find(
      (p) => this.normalizarNome(p.nome) === nomeNormalizado,
    );
  }

  addProduto(produto) {
    if (!produto.nome || !produto.nome.toString().trim()) throw new Error("Nome obrigatório");
    if (!produto.categoria || !produto.categoria.toString().trim()) throw new Error("Categoria obrigatória");

    produto.nome = produto.nome.toString().trim();
    produto.categoria = produto.categoria.toString().trim();
    produto.preco = this.validarPreco(produto.preco);
    produto.quantidade = this.validarQuantidade(produto.quantidade, true);

    const existe = this.encontrarProdutoPorNome(produto.nome);
    if (existe) throw new Error("Produto já existe");

    this.produtos.push(produto);
    this.registrarMovimentacao("ENTRADA", produto);
  }

  atualizarProduto(nome, dados) {
    if (!nome || !nome.toString().trim()) {
      throw new Error("Nome do produto para atualização é obrigatório");
    }

    const produto = this.encontrarProdutoPorNome(nome);
    if (!produto) throw new Error("Produto não encontrado");

    if (dados.nome) {
      dados.nome = dados.nome.toString().trim();
      if (!dados.nome) throw new Error("Nome inválido");

      const nomeNormalizado = this.normalizarNome(dados.nome);
      const outroProduto = this.produtos.find(
        (p) => p.id !== produto.id && this.normalizarNome(p.nome) === nomeNormalizado,
      );
      if (outroProduto) throw new Error("Produto já existe");
    }

    if (dados.categoria !== undefined) {
      if (!dados.categoria.toString().trim()) {
        throw new Error("Categoria inválida");
      }
      dados.categoria = dados.categoria.toString().trim();
    }

    if (dados.preco !== undefined && dados.preco !== "") {
      dados.preco = this.validarPreco(dados.preco);
    }

    if (dados.quantidade !== undefined && dados.quantidade !== "") {
      dados.quantidade = this.validarQuantidade(dados.quantidade, true);
    }

    Object.assign(produto, dados);
  }

  venderProduto(nome, quantidade) {
    if (!nome || !nome.toString().trim()) throw new Error("Nome obrigatório");

    const quantidadeVenda = this.validarQuantidade(quantidade, false);
    const produto = this.encontrarProdutoPorNome(nome);

    if (!produto) throw new Error("Produto não encontrado");
    if (produto.quantidade < quantidadeVenda) {
      throw new Error("Estoque insuficiente");
    }

    produto.quantidade -= quantidadeVenda;
    this.registrarMovimentacao("SAIDA", produto);
  }

  listarProdutos() {
    return this.produtos;
  }

  registrarMovimentacao(tipo, produto) {
    this.movimentacoes.push({
      tipo,
      nome: produto.nome,
      data: new Date(),
    });
  }
}
