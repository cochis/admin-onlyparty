import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController, LoadingController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private router: Router, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  navigate(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true })
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor espera...',

    });

    loading.present();
    return loading;
  }
  closeLoading(loading: any) {
    loading.dismiss()
  }

}
