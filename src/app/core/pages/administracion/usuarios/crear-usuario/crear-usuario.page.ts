import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FileUpService } from 'src/app/core/services/file-up.service';
import { FunctionsService } from 'src/app/services/functions.service';

import { MsnServiceService } from 'src/app/services/msn-service.service';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  formSubmited = false
  loading: any
  catalogo!: Catalogo
  catalogos!: Catalogo[]
  usuario!: Usuario
  usuarios!: Usuario[]
  nuevoTipo = false
  nuevaCategoria = false
  tipos = []
  categorias = []
  usuarioForm!: FormGroup;
  roles!: any[];
  imagenSubir!: File
  imgTemp: any = null
  imgCharge!: ''
  constructor(private catalogoService: CatalogosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private fileUploadService: FileUpService,
    private msnService: MsnServiceService,
    private authService: AuthService) {
    this.createForm()
    this.getCatalogos()
    this.getRoles('Rol')
  }

  ngOnInit() {
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      apellidoMaterno: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]],
      role: [[]],
      img: [''],
    })
  }
  setValue(name: string, value: any) {
    this.usuarioForm.get(name)?.setValue(value)
  }

  get fm() {
    return this.usuarioForm.controls
  }
  // get imagenes() {
  //   return this.usuarioForm.get('imagenes') as FormArray
  // }

  // addImagen() {
  //   this.imagenes.push(this.fb.control('', [Validators.required, Validators.minLength(5)]))
  // }


  onSubmit() {
    this.formSubmited = true

    console.log('this.usuarioForm: ', this.usuarioForm);
    if (this.usuarioForm.valid) {
      this.functionsService.showLoading().then((resp: any) => {
        this.loading = resp
        this.usuario = {
          ...this.usuario,
          nombre: this.usuarioForm.value.nombre.toUpperCase().trim(),
          apellidoPaterno: this.usuarioForm.value.apellidoPaterno.toUpperCase().trim(),
          apellidoMaterno: this.usuarioForm.value.apellidoMaterno.toUpperCase().trim(),
          email: this.usuarioForm.value.email.toLowerCase().trim(),
          img: this.imgCharge,
          google: false,
          password: this.usuarioForm.value.password,
          role: this.usuarioForm.value.role,
          activated: false,
        }
        console.log(this.usuario);

        this.authService.register(this.usuario).pipe(delay(1000)).subscribe((resp) => {
          console.log('resp: ', resp);
          this.functionsService.closeLoading(this.loading)
          this.functionsService.navigate('/core/usuarios/usuarios')

        },
          (err) => {
            console.log('err: ', err);
            this.msnService.alerta('Error', err.error.msg)
            this.functionsService.closeLoading(this.loading)

          })
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

  getRoles(categoria: string) {
    this.catalogoService.cargarCatalogoByCategoria(categoria).subscribe((resp: any) => {

      this.roles = resp.catalogo
      console.log('this.roles : ', this.roles);
      let x = this.roles.filter((a) => {
        if (a.activated) {
          return a
        }
      })
      this.roles = x
      console.log('this.roles : ', this.roles);
    },
      (err) => {
        console.log('err: ', err);

      })
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
