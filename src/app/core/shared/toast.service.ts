import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration:3000,
      position: 'bottom'
    });
    toast.present();
  }

}
