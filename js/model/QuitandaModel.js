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

  addProduto(produto) {
    if (!produto.nome) throw new Error("Nome obrigatório");

    const existe = this.produtos.find((p) => p.nome === produto.nome);
    if (existe) throw new Error("Produto já existe");

    this.produtos.push(produto);
    this.registrarMovimentacao("ENTRADA", produto);
  }

  atualizarProduto(nome, dados) {
    const produto = this.produtos.find((p) => p.nome === nome);
    if (!produto) throw new Error("Produto não encontrado");

    Object.assign(produto, dados);
  }

  venderProduto(nome, quantidade) {
    const produto = this.produtos.find((p) => p.nome === nome);

    if (!produto) throw new Error("Produto não encontrado");
    if (produto.quantidade < quantidade) {
      throw new Error("Estoque insuficiente");
    }

    produto.quantidade -= quantidade;
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
