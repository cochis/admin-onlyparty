import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FileUpService } from 'src/app/core/services/file-up.service';
import { FunctionsService } from 'src/app/services/functions.service';

import { MsnServiceService } from 'src/app/services/msn-service.service';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.page.html',
  styleUrls: ['./crear-catalogo.page.scss'],
})
export class CrearCatalogoPage implements OnInit, OnDestroy {
  formSubmited = false
  catalogo!: Catalogo
  catalogos!: Catalogo[]
  nuevoTipo = false
  nuevaCategoria = false
  tipos = []
  categorias = []
  catalogoForm!: FormGroup;
  imagenSubir!: File
  imgTemp: any = null
  imgCharge!: ''
  constructor(
    private catalogoService: CatalogosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService,
    private fileUploadService: FileUpService,

  ) {
    this.createForm()
    this.getCatalogos()
  }
  ngOnDestroy(): void {
    this.catalogoForm.reset()
  }

  ngOnInit() {
  }

  createForm() {
    this.catalogoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      tipo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      categoria: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      value: ['', [Validators.required, Validators.minLength(3)]],
      img: [''],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      // imagenes: this.fb.array([
      //   this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(7)])
      // ])

    })
  }
  setValue(campo: string, value: any) {
    this.catalogoForm.get(campo)?.setValue(value)
  }

  get fm() {
    return this.catalogoForm.controls
  }



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
        img: this.imgCharge,

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
  cambiarImagen(file: any, tipo: string) {

    console.log(file.target.files[0]);

    this.imagenSubir = file.target.files[0]
    if (!file) {
      this.imgTemp = null
      return
    }
    const reader = new FileReader()

    const url64 = reader.readAsDataURL(this.imagenSubir)
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
    this.subirImagen(tipo)
  }
  subirImagen(tipo: string) {
    this.fileUploadService
      .subirFoto(this.imagenSubir, tipo)
      .then(
        (img) => {
          console.log('img: ', img);
          this.imgCharge = img
          this.setValue('imagen', this.imgCharge)
          this.msnService.alerta(
            'success',
            'Imagen cargada',
          )

        },
        (err) => {
          this.msnService.alerta(
            'error',
            'No se pudo actualizar la imagen',
          )
        },
      )
  }
}
