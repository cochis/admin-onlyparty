import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FileUpService } from 'src/app/core/services/file-up.service';

import { MsnServiceService } from 'src/app/core/services/msn-service.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  edit: boolean = false
  id: string = ''
  title: string = ''
  catalogo!: Catalogo
  usuario!: Usuario
  catalogos!: Catalogo[]
  roles!: Catalogo[]
  formSubmited = false
  usuarioForm!: FormGroup;
  nuevoTipo = false
  nuevaCategoria = false
  tipos = []
  categorias = []
  submited = false;
  loading!: any
  imagenSubir!: File
  imgTemp: any = null
  imgCharge!: ''
  url = environment.base_url
  imgUrl = ''
  constructor(
    private route: ActivatedRoute,
    private catalogosService: CatalogosService,
    private authService: AuthService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService,
    private fileUploadService: FileUpService
  ) {
    this.createForm()
    this.getRoles('ROLES')

    this.id = this.route.snapshot.params['id']
    this.edit = (this.route.snapshot.params['edit'] == 'true') ? true : false
    this.title = this.edit ? 'Editar catalogo' : 'Ver catalogo'

  }
  ngOnDestroy(): void {
    this.catalogos = []
  }
  ngAfterViewInit(): void {
    this.getUsuario(this.id)

  }
  getUsuario(id: string) {
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.authService.cargarUsuarioById(id).pipe(delay(1000)).subscribe((resp: any) => {
        this.usuario = resp.usuario
        console.log('resp: ', this.usuario);

        if (this.usuario.img !== '') {
          this.imgUrl = this.url + '/upload/usuarios/' + this.usuario.img
          console.log('   this.imgUrl: ', this.imgUrl);
        }
        this.setUsuario(this.usuario)
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
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],

      role: [[]],
      img: ['']


    })
  }
  setUsuario(usuario: Usuario) {
    console.log('catalogo: ', usuario);

    try {
      this.usuarioForm.get('nombre')?.setValue(usuario.nombre)
      this.usuarioForm.get('apellidoPaterno')?.setValue(usuario.apellidoPaterno)
      this.usuarioForm.get('apellidoMaterno')?.setValue(usuario.apellidoMaterno)
      this.usuarioForm.get('email')?.setValue(usuario.email)
      this.usuarioForm.get('role')?.setValue(usuario.role)



      this.usuarioForm.get('img')?.setValue(usuario.img)
    } catch (error) {
      console.log('error: ', error);

    }


  }
  get fm() {
    return this.usuarioForm.controls
  }

  get role() {
    return this.usuarioForm.get('role') as FormArray
  }

  addRole() {
    this.role.push(this.fb.control(''))
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


    this.usuarioForm.value.nombre = this.usuarioForm.value.nombre.toUpperCase().trim(),
      this.usuarioForm.value.apellidoPaterno = this.usuarioForm.value.apellidoPaterno.toUpperCase().trim(),
      this.usuarioForm.value.apellidoMaterno = this.usuarioForm.value.apellidoMaterno.toUpperCase().trim(),
      this.usuarioForm.value.email = this.usuarioForm.value.email.toLowerCase().trim(),

      this.functionsService.showLoading().then((res: any) => {
        this.loading = res
        if (this.usuario.img == '' && this.imgCharge == '') {

          this.usuario = {
            ...this.usuario,
            ...this.usuarioForm.value,
          }
        }
        else if (this.usuario.img == '' && this.imgCharge !== '') {
          this.usuario = {
            ...this.usuario,
            ...this.usuarioForm.value,
            img: this.imgCharge
          }
        }
        else if (this.usuario.img !== '' && this.imgCharge !== '') {
          this.usuario = {
            ...this.usuario,
            ...this.usuarioForm.value,
            img: this.imgCharge
          }
        }
        else {
          let img = this.usuario.img
          this.usuario = {
            ...this.usuario,
            ...this.usuarioForm.value,
            img: img
          }
        }
        console.log('this.usuario: ', this.usuario);


        this.authService.actualizarUsuario(this.usuario).pipe(delay(1000)).subscribe((resp) => {
          this.functionsService.closeLoading(this.loading)
          this.msnService.alerta('success', 'Usuario actualizado')

          this.submited = true

          this.functionsService.navigate('core/usuarios/usuarios')

        },
          (err) => {
            this.msnService.alerta('Error', 'Ha sucedido un error, intente mas tarde')
            this.functionsService.closeLoading(this.loading)
            console.log(err);

          })
      })
  }
  getRoles(categoria: string) {
    this.catalogosService.cargarCatalogoByCategoria(categoria).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.roles = resp.catalogo
      console.log('this.roles : ', this.roles);
      let x = this.roles.filter((a: any) => {
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
          console.log('this.imgCharge: ', this.imgCharge);
          this.imgUrl = this.url + '/upload/usuarios/' + this.imgCharge
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
