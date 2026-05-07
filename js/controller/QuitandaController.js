import QuitandaModel from "../model/QuitandaModel.js";
import QuitandaView from "../view/QuitandaView.js";

export default class QuitandaController {
  constructor() {
    this.model = new QuitandaModel();
    this.view = new QuitandaView();

    this.init();
  }

  init() {
    this.view.bindAddProduto(this.handleAddProduto.bind(this));
    this.view.bindVenda(this.handleVenda.bind(this));
    this.view.bindAtualizarProduto(this.handleAtualizarProduto.bind(this)); // Novo
    this.view.renderEstoque(this.model.listarProdutos());
    this.view.renderMovimentacoes(this.model.movimentacoes);
  }

  handleAddProduto(dados) {
    try {
      this.model.addProduto(dados);
      this.view.renderEstoque(this.model.listarProdutos());
      this.view.renderMovimentacoes(this.model.movimentacoes);
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }

  handleVenda(nome, quantidade) {
    try {
      this.model.venderProduto(nome, quantidade);
      this.view.renderEstoque(this.model.listarProdutos());
      this.view.renderMovimentacoes(this.model.movimentacoes);
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }

  // Novo handler para atualizar produtos existentes
  handleAtualizarProduto(nome, dados) {
    try {
      this.model.atualizarProduto(nome, dados);
      this.view.renderEstoque(this.model.listarProdutos());
      this.view.renderMovimentacoes(this.model.movimentacoes);
      alert("Produto atualizado com sucesso!");
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }
}
