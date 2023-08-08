import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.page.html',
  styleUrls: ['./crear-carrera.page.scss'],
})
export class CrearCarreraPage implements OnInit {
  constructor() {}
  carrera = {
    programa: '',
    nivel: '',
    estatus: false,
  }
  ngOnInit() {}
  onSubmit(formulario: NgForm) {
    console.log(formulario.value)
  }
}
