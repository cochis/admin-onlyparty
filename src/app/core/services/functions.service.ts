import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private router: Router, private alertCtrl: AlertController) {}

  navigate(url: string) {
    this.router.navigateByUrl(url)
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK'],
    })

    await alert.present()
  }
}
