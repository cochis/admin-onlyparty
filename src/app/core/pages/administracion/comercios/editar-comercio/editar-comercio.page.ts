import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-editar-comercio',
  templateUrl: './editar-comercio.page.html',
  styleUrls: ['./editar-comercio.page.scss'],
})
export class EditarComercioPage implements OnInit {
  edit: boolean = false
  id: string = ''
  title: string = ''
  catalogo!: Catalogo
  usuario!: Usuario
  comercio!: Comercio
  catalogos!: Catalogo[]
  formSubmited = false
  comercioForm!: FormGroup;
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
  imgCarga: any = []
  file: any = []
  sociales!: Catalogo[]
  categoriaRDS = environment.categoriaRDS
  imgOK = false
  constructor(
    private route: ActivatedRoute,
    private catalogosService: CatalogosService,
    private comerciosService: ComerciosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService,
    private fileUploadService: FileUpService,
    private authService: AuthService
  ) {
    this.createForm()

    this.getCatalogosByCategoria(this.categoriaRDS)
    this.id = this.route.snapshot.params['id']
    this.edit = (this.route.snapshot.params['edit'] == 'true') ? true : false
    this.title = this.edit ? 'Editar comercio' : 'Ver comercio'

  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

  ngAfterViewInit(): void {
    this.getComercio(this.id)

  }
  getComercio(id: string) {
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.comerciosService.cargarComercioById(id).
        pipe(delay(1000)).subscribe((resp: any) => {
          console.log('id: ', id);
          this.comercio = resp.comercio

          this.setComercio(this.comercio)

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






  setComercio(comercio: Comercio) {
    console.log('comercio: ', comercio);
    try {

      this.getUsuario(this.comercio.usuario)
      this.comercioForm.get('nombre')?.setValue(comercio.nombre)
      this.comercioForm.get('direccion')?.setValue(comercio.direccion)
      this.comercioForm.get('email')?.setValue(comercio.email)
      this.comercioForm.get('horarioAtencion')?.setValue(comercio.horarioAtencion)
      this.comercioForm.get('whatsapp')?.setValue(comercio.whatsapp)
      comercio.redes.forEach((r: any) => {
        this.addSetRed(r)
      });
      comercio.telefonos.forEach(t => {
        this.addTelefono()
      });
      this.telefonos.setValue(comercio.telefonos);
      comercio.imagenes.forEach(i => {
        this.addImagen()
        this.imgCarga.push(i)
        this.file.push(false)
      })
      console.log('this.file: ', this.file);


      this.imagenes.setValue(comercio.imagenes);



      this.imgOK = true

    } catch (error) {
      console.log('error: ', error);

    }
  }
  get fm() {
    return this.comercioForm.controls
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
  //redes
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
  setRed(r: any) {
    return this.fb.group({
      red: r.red,
      link: r.link,
    })
  }
  removeRed(i: number) {
    this.redes.removeAt(i);
  }
  addSetRed(r: any) {
    this.redes.push(this.setRed(r));
  }
  //Telefonos
  get telefonos() {
    return this.comercioForm.get('telefonos') as FormArray
  }

  addTelefono() {
    this.telefonos.push(this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]))
  }
  setTelefono(t: any) {

    console.log(' this.fb.group({ t }): ', this.fb.group(t));
    return this.fb.group(this.fb.control(t, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]))
  }

  removeTelefono(i: number) {
    this.telefonos.removeAt(i);
  }
  addSetTelefono(t: any) {

    this.telefonos.push(this.fb.control(t, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]))
  }
  // Imagenes

  get imagenes() {
    return this.comercioForm.get('imagenes') as FormArray
  }
  newImagen(): FormGroup {
    return this.fb.group('')
  }
  addImagen() {
    this.imagenes.push(this.fb.control(''))
  }

  setImagen(i: any) {
    this.imagenes.push(this.fb.control(i))
  }
  removeImagen(i: number) {
    this.imagenes.removeAt(i);
  }

  addSetImagen(i: any) {
    this.imagenes.push(this.setImagen(i));
  }


  getUsuario(id: string) {
    this.authService.cargarUsuarioById(id).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.usuario = resp.usuario
      console.log('this.usuario : ', this.usuario);
      let nombreCompleto = ` ${this.usuario.nombre} ${this.usuario.apellidoMaterno}  ${this.usuario.apellidoMaterno}`
      this.setValue('usuario', nombreCompleto)
    },
      (err) => {
        console.log('err: ', err);

      })
  }
  setValue(campo: string, value: any) {
    this.comercioForm.get(campo)?.setValue(value)
  }
  onSubmit() {


    this.file.forEach((f: any, index: any) => {
      console.log('i: ', index);
      if (f == true) {
        this.comercio.imagenes[index] = this.imgCarga[index]
      }
    });


    let imgs: any = this.comercio.imagenes
    this.comercio = {
      ...this.comercio,
      ...this.comercioForm.value,
      nombre: this.comercioForm.value.nombre.toUpperCase().trim(),
      direccion: this.comercioForm.value.direccion.toUpperCase().trim(),
      email: this.comercioForm.value.email.toLowerCase().trim(),
      horarioAtencion: this.comercioForm.value.horarioAtencion.toUpperCase().trim(),
      imagenes: imgs,
      usuario: this.usuario.uid

    }


    console.log('catalogoNew: ', this.comercio);
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.comerciosService.actualizarComercio(this.comercio).pipe(delay(1000)).subscribe((resp) => {
        console.log('resp: ', resp);
        this.comercioForm.reset()
        this.functionsService.closeLoading(this.loading)
        this.msnService.alerta('success', 'Comercio actualizado')

        this.submited = true

        this.functionsService.navigate('core/comercios/comercios')

      },
        (err) => {
          this.msnService.alerta('Error', 'Ha sucedido un error, intente mas tarde')
          this.functionsService.closeLoading(this.loading)
          console.log(err);

        })
    })
  }
  activarFile(i: number) {

  }
  showInput(i: number) {
    console.log('i: ', i);
    console.log('this.file: ', this.file);
    this.file[i] = true
    console.log(this.file);

  }

  cambiarImagen(file: any, tipo: string, i: number) {
    console.log('i: ', i);

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
    this.subirImagen(tipo, i)
  }
  subirImagen(tipo: string, i: number) {
    this.fileUploadService
      .subirFoto(this.imagenSubir, tipo)
      .then(
        (img: any) => {
          console.log('i: ', i);
          console.log('this.imgCarga: ', this.imgCarga);
          console.log('img: ', img);
          this.imgCharge = img
          this.imgCarga[i] = img
          console.log('this.imgCarga: ', this.imgCarga);
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
  getCatalogosByCategoria(categoria: string) {
    this.catalogosService.cargarCatalogoByCategoria(categoria).subscribe((resp: any) => {

      this.sociales = resp.catalogo
      console.log(' this.sociales: ', this.sociales);
    },
      (err: any) => {
        console.log('err: ', err);

      })
  }

}
