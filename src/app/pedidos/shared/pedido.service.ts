import { FormPagamentoPage } from './../form-pagamento/form-pagamento.page';
import { FirebasePath } from './../../core/shared/firebase-path';
import { Key } from 'protractor';
import { FirebasePath } from 'src/app/core/shared/firebase-path';
import { PedidoService } from './pedido.service';
import { map } from 'rxjs/operators';
import { CarrinhoService } from './carrinho.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public static TIPO_FORMA_PAGAMENTO = {
    DINHEIRO: 1,
    CARTÃO: 2
  }

  public static STATUS = {
    ENVIADO: 0,
    CONFIRMADO: 1,
    SAIU_PARA_ENTREGA:2,
    ENTREGUE: 3
  }
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private carrinhoService:CarrinhoService, private dateFormat:DatePipe) { }
  
  gerarPedido(pedido: any){

  }

  private criarObjetoPedido(pedido: any){
    const numeroPedido = '#' + this.dateFormat.transform(new Date(), 'ddMMyyyyyHHmmss');
    const dataPedido = this.dateFormat.transform(new Date(), 'dd/MM/yyyy');
    let pedidoRef = {
      numero: numeroPedido,
      status: PedidoService.STATUS.ENVIADO,
      data: dataPedido,
      formPagamento: pedido.FormPagamento,
      trocoPara: pedido.trocoPara,
      tipoCartao: pedido.tipoCartao,
      enderecoEntrega: pedido.enderecoEntrega,
      usuarioKey: this.afAuth.auth.currentUser.uid,
      usuarioNome: this.afAuth.auth.currentUser.displayName,
      //Tecnica para filtro de varios campos
      usuarioStatus: this.afAuth.auth.currentUser.uid + '_' + PedidoService.STATUS.ENVIADO,
      total:pedido.total
    }
  }

  getStatusNome(status: number){
    switch (status){
      case PedidoService.STATUS.ENVIADO:
        return 'Aguardando confirmação';
      case PedidoService.STATUS.CONFIRMADO:
        return 'Em preparação';
      case PedidoService.STATUS.SAIU_PARA_ENTREGA:
        return 'Saiu para entrega';
      case PedidoService.STATUS.ENTREGUE:
        return 'Entregue';
    }
  }

  getFormaPagamentoNome(paymentType){
    switch(paymentType){
      case PedidoService.TIPO_FORMA_PAGAMENTO.DINHEIRO:
        return 'Dinheiro';
      case PedidoService.TIPO_FORMA_PAGAMENTO.CARTÃO:
        return 'Cartão de credito/debito';
    }
  }

  getAll(){
    return this.db.list(FirebasePath.PEDIDOS,
      q=> q.orderByChild('usuariosKey').endAt(this.afAuth.auth.currentUser.uid))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        })
      )

  }

  getAllAbertos(){
    const usuarioStatus = this.afAuth.auth.currentUser.uid + '_' + PedidoService.STATUS.SAIU_PARA_ENTREGA;
    return this.db.list(FirebasePath.PEDIDOS,
      q => q.orderByChild('usuarioStatus').endAt(usuarioStatus))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val()  }))
        })
      )
  }

  getAllProdutos(key:string){
    const path = '${FirebasePath.PEDIDOS_PRODUTOS}${key}';
    return this.db.list(path).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  }


