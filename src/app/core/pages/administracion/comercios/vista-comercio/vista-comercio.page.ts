import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { Comercio } from 'src/app/core/classes/comercio';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { ComerciosService } from 'src/app/core/services/comercios.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-comercio',
  templateUrl: './vista-comercio.page.html',
  styleUrls: ['./vista-comercio.page.scss'],
})
export class VistaComercioPage implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'usuario',
    'nombre',
    'direccion',
    'email',
    'telefonos',
    'whatsapp',
    'redes',
    'servicios',
    'productos',
    'paquetes',
    'imagenes',
    'horarioAtencion',
    'dateCreated',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;

  catalogos!: Catalogo[]
  comercios!: Comercio[]
  comerciosTemp!: Comercio[]
  update = false
  loading: any
  url = environment.base_url
  constructor(
    private route: ActivatedRoute,
    private functionsService: FunctionsService,
    private comerciosService: ComerciosService,
    private authService: AuthService

  ) {
    this.getComercios()
  }

  ngOnChanges(changes: any): void {
    this.addData(changes)
  }

  ngOnInit() {
    console.log('init');


  }


  addData(data: any[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.itemsPerPageLabel = 'Datos por página';
    this.paginator._intl.lastPageLabel = 'última página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.applyFilter(this.formControlInput.value);
  }
  getComercios() {
    this.comerciosService.getComercios().subscribe((resp: any) => {
      console.log('resp: ', resp);
      this.comercios = resp.comercios
      this.comerciosTemp = resp.comercios

      this.addData(this.comercios)
    },
      (err) => {
        console.log('err: ', err);

      }
    )
  }

  viewComercio(comercio: Comercio) {


    this.functionsService.navigate(`core/comercios/editar-comercio/false/${comercio.uid}`)

  }
  editComercio(comercio: Comercio) {
    this.functionsService.navigate(`core/comercios/editar-comercio/true/${comercio.uid}`)

  }
  isActive(comercio: Comercio) {

    this.functionsService.showLoading().then((resp: any) => {
      this.loading = resp
      this.comerciosService.activeComercio(comercio).pipe(delay(1000)).subscribe((resp) => {
        console.log('resp: ', resp);

        this.functionsService.closeLoading(this.loading)
        this.getComercios()
      },
        (err) => {
          console.log('err: ', err);
          this.functionsService.closeLoading(this.loading)

        })
    },
      (err: any) => {

      })


  }
  handleInput(event: any) {
    this.comercios = this.comerciosTemp
    if (event.target.value.toLowerCase() === '') {
      this.ngOnChanges(this.comerciosTemp)
    }
    const query = event.target.value.toLowerCase();
    console.log('query: ', query);
    this.comercios = this.comercios.filter(function (arr) {
      console.log('arr.nombre.toLowerCase(): ', arr.nombre.toLowerCase());
      console.log('event: ', query);

      return arr.nombre.toLowerCase().includes(query);
    })
    this.ngOnChanges(this.comercios)

  }


  getUsr(id: string) {
    this.authService.cargarUsuarioById(id).subscribe((resp: any) => {

      return resp.usuario.email

    })
  }
}
