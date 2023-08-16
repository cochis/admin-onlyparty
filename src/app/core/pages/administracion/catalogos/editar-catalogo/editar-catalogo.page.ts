import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FileUpService } from 'src/app/core/services/file-up.service';

import { MsnServiceService } from 'src/app/core/services/msn-service.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.page.html',
  styleUrls: ['./editar-catalogo.page.scss'],
})
export class EditarCatalogoPage implements OnInit, OnDestroy {
  edit: boolean = false
  id: string = ''
  title: string = ''
  catalogo!: Catalogo
  catalogos!: Catalogo[]
  formSubmited = false
  catalogoForm!: FormGroup;
  nuevoTipo = false
  nuevaCategoria = false
  tipos = []
  url = environment.base_url
  imgUrl = ''
  categorias = []
  submited = false;
  loading!: any
  imagenSubir!: File
  imgTemp: any = null
  imgCharge!: ''
  constructor(
    private route: ActivatedRoute,
    private catalogosService: CatalogosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService,
    private fileUploadService: FileUpService
  ) {
    this.createForm()

    this.id = this.route.snapshot.params['id']
    this.edit = (this.route.snapshot.params['edit'] == 'true') ? true : false
    this.title = this.edit ? 'Editar catalogo' : 'Ver catalogo'

  }
  ngOnDestroy(): void {
    this.catalogoForm.reset()
  }

  ngAfterViewInit(): void {
    this.getCatalogo(this.id)

  }
  getCatalogo(id: string) {
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.catalogosService.cargarCatalogoById(id).pipe(delay(1000)).subscribe((resp: any) => {
        this.catalogo = resp.catalogo

        this.setCatalogo(this.catalogo)
        if (this.catalogo.img !== '') {
          this.imgUrl = this.url + '/upload/catalogos/' + this.catalogo.img
        }
        this.functionsService.closeLoading(this.loading)
      },
        (err) => {
          console.log('err: ', err);
          this.functionsService.closeLoading(this.loading)
          this.msnService.alerta('Error', "Por favor intentar después")


        })
    })
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

    })
  }
  setCatalogo(catalogo: Catalogo) {
    console.log('catalogo: ', catalogo);
    try {

      this.catalogoForm.get('nombre')?.setValue(catalogo.nombre)
      this.catalogoForm.get('tipo')?.setValue(catalogo.tipo)
      this.catalogoForm.get('categoria')?.setValue(catalogo.categoria)
      this.catalogoForm.get('clave')?.setValue(catalogo.clave)
      this.catalogoForm.get('value')?.setValue(catalogo.value)
      this.catalogoForm.get('descripcion')?.setValue(catalogo.descripcion)
      this.catalogoForm.get('img')?.setValue(catalogo.img)
    } catch (error) {
      console.log('error: ', error);

    }
  }
  get fm() {
    return this.catalogoForm.controls
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

  onSubmit() {
    if (this.catalogo.img == '' && this.imgCharge == '') {

      this.catalogo = {
        ...this.catalogo,
        ...this.catalogoForm.value,
      }
    }
    else if (this.catalogo.img == '' && this.imgCharge !== '') {
      this.catalogo = {
        ...this.catalogo,
        ...this.catalogoForm.value,
        img: this.imgCharge
      }
    }
    else if (this.catalogo.img !== '' && this.imgCharge !== '') {
      this.catalogo = {
        ...this.catalogo,
        ...this.catalogoForm.value,
        img: this.imgCharge
      }
    }
    else {
      let img = this.catalogo.img
      this.catalogo = {
        ...this.catalogo,
        ...this.catalogoForm.value,
        img: img
      }
    }

    console.log('catalogoNew: ', this.catalogo);
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.catalogosService.actualizarCatalogo(this.catalogo).pipe(delay(1000)).subscribe((resp) => {
        this.catalogoForm.reset()
        this.functionsService.closeLoading(this.loading)
        this.msnService.alerta('success', 'Catalogo actualizado')

        this.submited = true

        this.functionsService.navigate('core/catalogos/catalogos')

      },
        (err) => {
          this.msnService.alerta('Error', 'Ha sucedido un error, intente mas tarde')
          this.functionsService.closeLoading(this.loading)
          console.log(err);

        })
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
        (img: any) => {
          console.log('img: ', img);
          this.imgCharge = img
          this.imgUrl = this.url + '/upload/catalogos/' + this.imgCharge
          this.msnService.alerta(
            'success',
            'Imagen cargada',
          )

        },
        (err: any) => {
          this.msnService.alerta(
            'error',
            'No se pudo actualizar la imagen',
          )
        },
      )
  }
}
