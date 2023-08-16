import { Component, OnInit } from '@angular/core'
import { PopoverController } from '@ionic/angular'
import { PopmenuComponent } from '../popmenu/popmenu.component'
import { AuthService } from 'src/app/auth/services/auth.service'

import { Usuario } from 'src/app/classes/usuario'
import { environment } from 'src/environments/environment'
import { FunctionsService } from 'src/app/services/functions.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  usuario!: Usuario
  imgUrl: String = ''
  url: String = environment.base_url
  constructor(
    private functionsService: FunctionsService,
    private authService: AuthService,
    private popoverCtrl: PopoverController,

  ) {

    if (this.functionsService.getLocal('uid')) {
      let usr = this.functionsService.getLocal('uid')

      this.authService.cargarUsuarioById(usr.data).subscribe((resp: any) => {

        this.usuario = resp.usuario
        if (this.usuario.img !== null && this.usuario.img !== undefined && this.usuario.img !== null && resp.usuario.img !== '') {
          this.imgUrl = this.usuario.img
        }

      },
        (err) => {
          console.log('err: ', err);

        })
    }
  }

  ngOnInit() { }

  async presentPopover(ev: any) {
    console.log('ev:', ev)
    const popover = await this.popoverCtrl.create({
      component: PopmenuComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
    })

    await popover.present()

    const { data } = await popover.onWillDismiss()
    console.log(data)
  }
}
