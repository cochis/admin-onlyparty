import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FunctionsService } from 'src/app/core/services/functions.service';
import { MsnServiceService } from 'src/app/core/services/msn-service.service';

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
  categorias = []
  submited = false;
  loading!: any
  constructor(
    private route: ActivatedRoute,
    private catalogosService: CatalogosService,
    private fb: FormBuilder,
    private functionsService: FunctionsService,
    private msnService: MsnServiceService
  ) {
    this.createForm()
    this.getCatalogos()
    this.id = this.route.snapshot.params['id']
    this.edit = (this.route.snapshot.params['edit'] == 'true') ? true : false
    this.title = this.edit ? 'Editar catalogo' : 'Ver catalogo'

  }
  ngOnDestroy(): void {
    this.catalogos = []
  }
  ngAfterViewInit(): void {
    this.getCatalogo(this.id)

  }
  getCatalogo(id: string) {
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.catalogosService.cargarCatalogoById(id).pipe(delay(1000)).subscribe((resp: any) => {
        this.catalogo = resp.catalogo
        console.log('resp: ', this.catalogo);
        this.setCatalogo(this.catalogo)
        this.functionsService.closeLoading(this.loading)
      },
        (err) => {
          console.log('err: ', err);

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
      value: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      img: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],

    })
  }
  setCatalogo(catalogo: Catalogo) {
    console.log('catalogo: ', catalogo);
    this.catalogoForm.get('nombre')?.setValue(catalogo.nombre)
    this.catalogoForm.get('tipo')?.setValue(catalogo.tipo)
    this.catalogoForm.get('categoria')?.setValue(catalogo.categoria)
    this.catalogoForm.get('clave')?.setValue(catalogo.clave)
    this.catalogoForm.get('value')?.setValue(catalogo.value)
    this.catalogoForm.get('img')?.setValue(catalogo.img)
    this.catalogoForm.get('descripcion')?.setValue(catalogo.descripcion)
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
  getCatalogos() {
    this.catalogosService.getCatalogos().subscribe((resp: any) => {
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
  onSubmit() {

    this.catalogo = {
      ...this.catalogo,
      ...this.catalogoForm.value

    }
    console.log('catalogoNew: ', this.catalogo);
    this.functionsService.showLoading().then((res: any) => {
      this.loading = res

      this.catalogosService.actualizarCatalogo(this.catalogo).pipe(delay(1000)).subscribe((resp) => {
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

}
