import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'src/app/modelos/produto';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css'],
})
export class PainelPrincipalComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    public apiProduto: ProdutoService,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.apiProduto.obterProdutos().subscribe((res) => {
      this.produtos = res;
    });
  }

  formatarPreco(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  abrirConfirmaExcluir(id: string): void {
    let produtoParaExcluir = this.produtos.find((produto) => produto.id === id);
    if (produtoParaExcluir && produtoParaExcluir.id) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '350px',
        data: {
          title: 'Excluir',
          message: `Tem certeza que deseja excluir **${produtoParaExcluir.titulo}** ?`,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.executarExclusao(id);
        } else {
          console.log('Exclusão cancelada pelo usuário');
        }
      });
    } else {
      alert('Nenhum produto informado para exclusão');
    }
  }

  executarExclusao(id: string) {
    this.apiProduto.deletarProduto(id).subscribe((res) => {
      let newList = this.produtos.filter((produto) => produto.id !== id);
      this.produtos = newList;
    });
  }
}
