import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MsnServiceService {

  constructor(private alertController: AlertController) { }
  async alerta(tipo: string, msn: string) {
    const alert = await this.alertController.create({
      header: tipo.toUpperCase(),
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: tipo,
      message: msn,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
