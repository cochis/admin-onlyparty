import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FunctionsService } from 'src/app/core/services/functions.service';
import { MsnServiceService } from 'src/app/services/msn-service.service';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.page.html',
  styleUrls: ['./crear-catalogo.page.scss'],
})
export class CrearCatalogoPage implements OnInit {
  formSubmited = false
  catalogo!: Catalogo
  catalogos!: Catalogo[]
  nuevoTipo = false
  nuevaCategoria = false
  tipos = []
  categorias = []
  catalogoForm!: FormGroup;
  constructor(
    private catalogoService: CatalogosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService

  ) {
    this.createForm()
    this.getCatalogos()
  }

  ngOnInit() {
  }

  createForm() {
    this.catalogoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      tipo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      categoria: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      value: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      img: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      // imagenes: this.fb.array([
      //   this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(7)])
      // ])

    })
  }
  setValue() {
    this.catalogoForm.get('nombre')?.setValue('nuevo')
  }

  get fm() {
    return this.catalogoForm.controls
  }
  // get imagenes() {
  //   return this.catalogoForm.get('imagenes') as FormArray
  // }

  // addImagen() {
  //   this.imagenes.push(this.fb.control('', [Validators.required, Validators.minLength(5)]))
  // }


  onSubmit() {
    this.formSubmited = true

    if (this.catalogoForm.valid) {
      this.catalogo = {
        ...this.catalogo,
        nombre: this.catalogoForm.value.nombre.toUpperCase().trim(),
        tipo: this.catalogoForm.value.tipo.toUpperCase().trim(),
        clave: this.catalogoForm.value.clave.toUpperCase().trim(),
        categoria: this.catalogoForm.value.categoria.toUpperCase().trim(),
        value: this.catalogoForm.value.value.toUpperCase().trim(),
        img: this.catalogoForm.value.img.toUpperCase().trim(),

        descripcion: this.catalogoForm.value.descripcion.toUpperCase().trim(),
        activated: true,
        dateCreated: this.functionsService.getToday(),
        lastEdited: this.functionsService.getToday(),



      }
      console.log(this.catalogo);

      this.catalogoService.nuevoCatalogo(this.catalogo).pipe(delay(1000)).subscribe((resp) => {
        console.log('resp: ', resp);
        this.msnService.alerta('success', 'Se ha creado el catalogo')
        this.functionsService.navigate('core/catalogos/catalogos')
      },
        (err) => {
          console.log('err: ', err);

        })


    } else {
      console.error('Formulario invalido');

    }
  }

  changeNuevoTipo(event: any) {

    console.log('event.target: ', event.target.value);
    this.nuevoTipo = event.target.value
    console.log('  this.nuevoTipo: ', this.nuevoTipo);

  }
  changeNuevaCategoria(event: any) {

    console.log('event.target: ', event.target.value);
    this.nuevaCategoria = event.target.value
    console.log('  this.nuevoTipo: ', this.nuevoTipo);

  }
  getCatalogos() {
    this.catalogoService.getCatalogos().subscribe((resp: any) => {
      console.log('resp: ', resp);
      let cats: any = []
      let tipo: any = []
      this.catalogos = resp.catalogos
      this.catalogos.forEach((catalogo: any) => {
        if (!cats.includes(catalogo.categoria)) {
          cats.push(catalogo.categoria)
        }
      })
      this.catalogos.forEach((catalogo: any) => {
        if (!tipo.includes(catalogo.tipo)) {
          tipo.push(catalogo.tipo)
        }
      })
      console.log(cats);
      this.categorias = cats
      console.log(tipo);
      this.tipos = tipo

    },
      (err) => {
        console.log('err: ', err);

      })
  }
}
