import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';

export interface Data {
  movies: string;
}
@Component({
  selector: 'app-vista-carrera',
  templateUrl: './vista-carrera.page.html',
  styleUrls: ['./vista-carrera.page.scss'],
})
export class VistaCarreraPage implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'programa',
    'nivel',
    'estatus',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;
  data: any[] = [
    {
      id: 1,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 2,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 3,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 4,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 5,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 6,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 7,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 8,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 9,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
    {
      id: 10,
      programa: 'Especialidad',
      nivel: 'Nivel',
      estatus: '',
    },
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.addData(this.data);
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

  getNivel(n: number) {
    if (n % 2 == 0) {
      return 'Licenciatura';
    } else {
      return 'Maestria';
    }
  }
  getActivo(n: number) {
    if (n % 2 == 0) {
      return 'lock-closed';
    } else {
      return 'lock-open';
    }
  }
}
