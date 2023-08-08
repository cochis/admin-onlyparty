import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PopoverController } from '@ionic/angular'

@Component({
  selector: 'app-popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss'],
})
export class PopmenuComponent implements OnInit {
  items = Array(7)

  constructor(private popoverCtrl: PopoverController, private router: Router) {}

  ngOnInit() {}

  menuUser = [
    {
      titulo: 'Perfil',
      url: '/perfil',
      icon: 'person',
    },
    {
      titulo: 'Salir',
      url: '/login',
      icon: 'log-out',
    },
  ]

  onClick(valor: any) {
    console.log('valor', valor)
    this.router.navigateByUrl(valor)
    this.popoverCtrl.dismiss()
    // this.popoverCtrl.dismiss({
    //   item: valor,
    // })
  }
}
