import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FunctionsService } from 'src/app/core/services/functions.service';

@Component({
  selector: 'app-vista-catalogo',
  templateUrl: './vista-catalogo.page.html',
  styleUrls: ['./vista-catalogo.page.scss'],
})
export class VistaCatalogoPage implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [

    'nombre',
    'tipo',
    'categoria',
    'clave',
    'valor',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;

  catalogos!: Catalogo[]
  update = false
  loading: any
  constructor(
    private route: ActivatedRoute,
    private functionsService: FunctionsService,
    private catalogosService: CatalogosService,

  ) {
    this.getCatalogos()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('chande');

    this.getCatalogos()
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
  getCatalogos() {
    this.catalogosService.getCatalogos().subscribe((resp: any) => {
      this.catalogos = resp.catalogos
      console.log('this.catalogos : ', this.catalogos);
      this.addData(this.catalogos)
    })
  }

  viewCatalogo(catalogo: Catalogo) {
    console.log('catalogo: ', catalogo);

    this.functionsService.navigate(`core/catalogos/editar-catalogo/false/${catalogo.uid}`)

  }
  editCatalogo(catalogo: Catalogo) {
    this.functionsService.navigate(`core/catalogos/editar-catalogo/true/${catalogo.uid}`)
    console.log('catalogo: ', catalogo);
  }
  isActive(catalogo: Catalogo) {
    console.log('catalogo: ', catalogo);
    this.functionsService.showLoading().then((resp: any) => {
      this.loading = resp
      this.catalogosService.activeCatalogo(catalogo).pipe(delay(1000)).subscribe((resp) => {
        console.log('resp: ', resp);

        this.functionsService.closeLoading(this.loading)
        this.getCatalogos()
      },
        (err) => {
          console.log('err: ', err);
          this.functionsService.closeLoading(this.loading)

        })
    },
      (err: any) => {

      })


  }

}
