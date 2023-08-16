import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController, LoadingController, ToastController } from '@ionic/angular'
import * as SecureLS from 'secure-ls/dist/secure-ls';


@Injectable({
  providedIn: 'root',
})

export class FunctionsService {
  ls = new SecureLS({
    encodingType: 'aes'
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController) { }

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

  setLocal(key: string, value: any) {
    this.ls.set(key, { data: value });
  }
  getLocal(key: string) {
    return this.ls.get(key);
  }
  getAllLocal() {
    return this.ls.getAllKeys();
  }
  removeAllLocal() {
    this.ls.removeAll();
  }
  getToday() {
    return Date.now()
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

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: type
    });

    await toast.present();
  }
}
