import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { IonicModule } from '@ionic/angular'
import { MenuComponent } from './menu/menu.component'
import { PopmenuComponent } from './popmenu/popmenu.component'
import { LoadingComponent } from './loading/loading.component'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PopmenuComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PopmenuComponent,
    LoadingComponent,
  ],
})
export class ComponentsModule {}
