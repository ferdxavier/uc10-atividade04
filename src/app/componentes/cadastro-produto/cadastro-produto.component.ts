import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoSaveInput } from 'src/app/contratos/produto';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { ViewImageModalComponent } from '../shared/view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent implements OnInit {
  estaProcessando: boolean = false;
  idExistente: string | null = null;

  constructor(
    public apiProduto: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let idProduto = params.get('id');
      if (idProduto) {
        this.idExistente = idProduto;
        this.carregaProduto(this.idExistente);
      }
    });
  }

  tituloFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);
  descricaoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(240),
  ]);
  fotoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(500),
  ]);
  precoFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0.01),
  ]);

  carregaProduto(id: string) {
    this.apiProduto.obterProdutoPorId(id).subscribe({
      next: (res) => {
        this.tituloFormControl.setValue(res.titulo);
        this.descricaoFormControl.setValue(res.descricao);
        this.fotoFormControl.setValue(res.foto);
        this.precoFormControl.setValue(res.preco.toString());
      },
      error: (err) => {
        alert(`Erro ao carregar produto. Erro: ${err}`);
      },
    });
  }

  salvarProduto() {
    console.log(this.tituloFormControl.value);
    this.estaProcessando = true;

    if (
      !this.tituloFormControl.value ||
      !this.descricaoFormControl.value ||
      !this.fotoFormControl.value ||
      !this.precoFormControl.value
    ) {
      alert('Um ou mais campos não informados');
      return;
    }

    try {
      let clearPrice = parseFloat(this.precoFormControl.value);

      let newProduto: ProdutoSaveInput = {
        titulo: this.tituloFormControl.value,
        descricao: this.descricaoFormControl.value,
        foto: this.fotoFormControl.value,
        preco: clearPrice,
      };
      if (this.idExistente) {
        console.log('Está criando.......');
        this.apiProduto
          .atualizarProduto(this.idExistente, newProduto)
          .subscribe({
            next: (res) => {
              if (res) {
                setTimeout(() => {
                  this.estaProcessando = false;
                  this.router.navigate(['/painel-principal']);
                }, 2000);
              } else alert('Ocorreu um erro ao atualizar o produto');
            },
            error: (err) => {
              alert(`Ocorreu um erro ao atualizar o produto. Erro: ${err}`);
            },
          });
      } else {
        this.apiProduto.adicionarProduto(newProduto).subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
                this.estaProcessando = false;
                this.router.navigate(['/painel-principal']);
              }, 2000);
            } else alert('Ocorreu um erro ao salvar o produto');
          },
          error: (err) => {
            alert(`Ocorreu um erro ao salvar o produto. Erro: ${err}`);
          },
        });
      }
    } catch (error) {
      console.error('Erro ao processar preço: ', error);
    }
  }

  exibirImage(pathImage: string | null) {
    console.log('está aqui');
    if (pathImage !== null && pathImage.length > 0) {
      const dialogRef = this.dialog.open(ViewImageModalComponent, {
        data: { caminho: pathImage },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      alert('Informe o caminho da image');
    }
  }
}
