import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { PainelPrincipalComponent } from './componentes/painel-principal/painel-principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'painel-principal', pathMatch: 'full' },
  {
    path: 'painel-principal',
    component: PainelPrincipalComponent,
  },
  {
    path: 'cadastro-produto',
    component: CadastroProdutoComponent,
  },
  {
    path: 'atualizar-produto/:id',
    component: CadastroProdutoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
