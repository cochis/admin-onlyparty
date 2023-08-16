import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


import { Usuario } from 'src/app/classes/usuario';

import { Catalogo } from 'src/app/core/classes/catalogo';
import { Comercio } from 'src/app/core/classes/comercio';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { ComerciosService } from 'src/app/core/services/comercios.service';
import { FileUpService } from 'src/app/core/services/file-up.service';
import { FunctionsService } from 'src/app/services/functions.service';


import { MsnServiceService } from 'src/app/services/msn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-comercio',
  templateUrl: './crear-comercio.page.html',
  styleUrls: ['./crear-comercio.page.scss'],
})
export class CrearComercioPage implements OnInit {
  formSubmited = false
  comercio!: Comercio
  catalogo!: Catalogo
  catalogos!: Catalogo[]
  nuevoTipo = false
  usuario!: Usuario
  nuevaCategoria = false
  tipos = []
  imagenesComercio = [] as any
  categorias = []
  comercioForm!: FormGroup;
  imagenSubir!: File
  imgCharge: string = ''
  imgTemp: any = null
  categoriaRDS = environment.categoriaRDS
  sociales!: Catalogo[]
  url = environment.base_url
  submited = false
  loading!: any
  constructor(
    private fileUploadService: FileUpService,
    private catalogoService: CatalogosService,
    private authService: AuthService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService,
    private comercioService: ComerciosService

  ) {
    this.createForm()
    this.getCatalogos()
    this.getUsuario(this.authService.uid)

    this.getCatalogosByCategoria(this.categoriaRDS)
    this.setTest()
  }

  ngOnInit() {
  }

  createForm() {
    this.comercioForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],

      direccion: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      horarioAtencion: ['', [Validators.required, Validators.minLength(5)]],
      telefonos: this.fb.array([]),
      whatsapp: [0],
      redes: this.fb.array([]),
      imagenes: this.fb.array([]),


    })
  }
  setValue(campo: string, value: any) {
    this.comercioForm.get(campo)?.setValue(value)
  }

  get fm() {
    return this.comercioForm.controls
  }
  get telefonos() {
    return this.comercioForm.get('telefonos') as FormArray
  }

  addTelefono() {
    this.telefonos.push(this.fb.control(0, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]))
  }

  removeTelefono(i: number) {
    this.telefonos.removeAt(i);
  }
  get imagenes() {
    return this.comercioForm.get('imagenes') as FormArray
  }

  addImagen() {
    this.imagenes.push(this.fb.control(''))
  }

  removeImagen(i: number) {
    this.imagenes.removeAt(i);
  }
  get redes(): FormArray {
    return this.comercioForm.get("redes") as FormArray
  }

  newRed(): FormGroup {
    return this.fb.group({
      red: '',
      link: '',
    })
  }
  addRed() {
    this.redes.push(this.newRed());
  }

  removeRed(i: number) {
    this.redes.removeAt(i);
  }

  getUsuario(id: string) {
    this.authService.cargarUsuarioById(id).subscribe((resp: any) => {

      this.usuario = resp.usuarios[0]
      console.log('this.usuario : ', this.usuario);
      let nombreCompleto = ` ${this.usuario.nombre} ${this.usuario.apellidoMaterno}  ${this.usuario.apellidoMaterno}`
      this.setValue('usuario', nombreCompleto)
    },
      (err) => {
        console.log('err: ', err);

      })
  }
  onSubmit() {

    console.log('this.comercioForm.value: ', this.comercioForm.value);


    if (this.comercioForm.valid) {
      this.comercioForm.value.nombre = this.comercioForm.value.nombre.toUpperCase().trim()
      this.comercioForm.value.direccion = this.comercioForm.value.direccion.toUpperCase().trim()
      this.comercioForm.value.email = this.comercioForm.value.email.toLowerCase().trim()
      this.comercioForm.value.horarioAtencion = this.comercioForm.value.horarioAtencion.toUpperCase().trim()


      this.functionsService.showLoading().then((res: any) => {
        this.loading = res
        this.comercio = {
          ...this.comercioForm.value,
          imagenes: this.imagenesComercio,
        }
        this.comercioService.nuevoComercio(this.comercio).pipe(delay(1000)).subscribe((resp: any) => {
          console.log('resp: ', resp);
          this.functionsService.closeLoading(this.loading)
          this.msnService.alerta('success', 'Comercio creado')

          this.submited = true

          this.functionsService.navigate('core/comercios/comercios')
        },
          (err) => {
            console.log('err: ', err);
          })
      },
        (err) => {
        })

    } else {

    }

  }
  setTest() {
    this.comercioForm.get('nombre')?.setValue('SAlon de fiestas margaria')
    this.comercioForm.get('direccion')?.setValue('por ahi')
    this.comercioForm.get('email')?.setValue('mail@comercio.com')
    this.comercioForm.get('horarioAtencion')?.setValue('temprano')
    this.comercioForm.get('whatsapp')?.setValue(1234567890)

  }

  //OBTIENE CATALOGOS
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
  //Seleccionala imagen para mostrar y envia a subir imagen
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
  //Sube imagen
  subirImagen(tipo: string) {
    console.log('tipo: ', tipo);
    console.log('this.imagenSubir: ', this.imagenSubir);
    this.fileUploadService
      .subirFoto(this.imagenSubir, tipo)
      .then(
        (img: string) => {

          this.imgCharge = img
          let imagen: any = img
          console.log('this.imgCharge : ', this.imgCharge);
          if (this.imgCharge !== '') {
            this.imagenesComercio.push(imagen)
          }

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
  //Obtiene Categorias 
  getCatalogosByCategoria(categoria: string) {
    this.catalogoService.cargarCatalogoByCategoria(categoria).subscribe((resp: any) => {

      this.sociales = resp.catalogo
      console.log(' this.sociales: ', this.sociales);
    },
      (err) => {
        console.log('err: ', err);

      })
  }

}
