import { Component, OnInit } from '@angular/core'
import { PopoverController } from '@ionic/angular'
import { PopmenuComponent } from '../popmenu/popmenu.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

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
