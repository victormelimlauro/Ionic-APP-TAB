import { map } from 'rxjs/operators';
import { FirebasePath } from './../../core/shared/firebase-path';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db:AngularFireDatabase) {}
  getAll(categoriaKey:string = null){
    return this.db.list(FirebasePath.PRODUTOS, q=>{
        if(categoriaKey){
          return q.orderByChild('categoriaKey').equalTo(categoriaKey);
        }else{
          return q.orderByChild('nome');
        }
    }).snapshotChanges().pipe(
      map(changes =>{
        return changes.map(m=> ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }

  getCategoriasAll(){
    return this.db.list(FirebasePath.CATEGORIAS)
    .snapshotChanges().pipe(
      map( changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      }
        )
    )
  }

  // //Busca produto por key
  getByKey(key: string){

      //'produtos'+'-KEY FIREBASE'
      // path = 'produtos'/-KEY FIREBASE'
    const path = '${FirebasePath.PRODUTOS}${key}';
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({key: change.key, ...change.payload.val() });
      })
    )
  }
}
