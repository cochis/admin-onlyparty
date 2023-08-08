import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HomePageRoutingModule } from './home-routing.module'

import { HomePage } from './home.page'
import { ComponentsModule } from 'src/app/components/components.module'
import { environment } from 'src/environments/environment'
@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
  ],
})
export class HomePageModule {}
