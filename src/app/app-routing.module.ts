import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './usuarios/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]
  },
  { path: 'criar-conta', loadChildren: './usuarios/criar-conta/criar-conta.module#CriarContaPageModule' },
  { path: 'login', loadChildren: './usuarios/login/login.module#LoginPageModule' },
  { path: 'esqueci-senha', loadChildren: './usuarios/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule' },  { path: 'form-item-pedido', loadChildren: './pedidos/form-item-pedido/form-item-pedido.module#FormItemPedidoPageModule' },
  { path: 'lista-item-pedido', loadChildren: './pedidos/lista-item-pedido/lista-item-pedido.module#ListaItemPedidoPageModule' },
  { path: 'lista-produto-pedido', loadChildren: './pedidos/lista-produto-pedido/lista-produto-pedido.module#ListaProdutoPedidoPageModule' },

  /*{ path: 'form-endereco', loadChildren: './enderecos/form-endereco/form-endereco.module#FormEnderecoPageModule' },
  { path: 'lista-endereco', loadChildren: './enderecos/lista-endereco/lista-endereco.module#ListaEnderecoPageModule' },
  { path: 'lista-produtos', loadChildren: './produtos/lista-produtos/lista-produtos.module#ListaProdutosPageModule' },
  { path: 'perfil', loadChildren: './usuarios/perfil/perfil.module#PerfilPageModule' }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
