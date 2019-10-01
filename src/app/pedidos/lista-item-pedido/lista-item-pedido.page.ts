import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../shared/carrinho.service';
import { AlertService } from 'src/app/core/shared/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-item-pedido',
  templateUrl: './lista-item-pedido.page.html',
  styleUrls: ['./lista-item-pedido.page.scss'],
})
export class ListaItemPedidoPage implements OnInit {
  itemPedido: Observable<any[]>;
  total: number;
  
  constructor(private carrinhoService:CarrinhoService, private alert:AlertService) { }
  
    ngOnInit() {
      this.itemPedido = this.carrinhoService.getAll();
    }
  
    getTotalPedido(){
      const subscribe = this.carrinhoService.getTotalPedido().subscribe( (total: number) => {
        subscribe.unsubscribe();
        this.total = total;
      })
    }
  
    adicionarQuantidade(itemPedido: any){
      let qtd = itemPedido.quantidade;
      qtd++;
  
      this.atualizarTotal(itemPedido, qtd);
    }
    removerQuantidade(itemPedido: any){
      let qtd = itemPedido.quantidade;
      qtd--;
  
      if (qtd <=0){
        this.removerProduto(itemPedido);
      } else {
        this.atualizarTotal(itemPedido, qtd);
  
      }
    }
    atualizarTotal(itemPedido: any, quantidade: number){
      const total = this.carrinhoService.calcularTotal(itemPedido.produtoPreco, quantidade);
      this.carrinhoService.update(itemPedido.key, quantidade, total);
      this.getTotalPedido();
    }
    removerProduto(itemPedido){
      this.alert.ShowConfirmaExclusao(itemPedido.produtoNome, () => {
        this.carrinhoService.remove(itemPedido.key);
        this.getTotalPedido();
      }
      )
    }
  }
  