import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { Catalogo } from 'src/app/core/classes/catalogo';
import { CatalogosService } from 'src/app/core/services/catalogos.service';
import { FileUpService } from 'src/app/core/services/file-up.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { MsnServiceService } from 'src/app/services/msn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.page.html',
  styleUrls: ['./vista-usuario.page.scss'],
})
export class VistaUsuarioPage implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [

    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'email',
    'img',
    'google',
    'role',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;

  catalogos!: Catalogo[]
  usuarios!: Usuario[]
  usuariosTemp!: Usuario[]
  update = false
  loading: any
  url = environment.base_url
  constructor(
    private route: ActivatedRoute,
    private functionsService: FunctionsService,
    private catalogosService: CatalogosService,
    private authService: AuthService

  ) {
    this.getUsuarios()
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
  getUsuarios() {
    this.authService.getUsers().subscribe((resp: any) => {
      this.usuarios = resp.usuarios
      this.usuariosTemp = resp.usuarios
      console.log('this.usuarios : ', this.usuarios);
      this.addData(this.usuarios)
    },
      (err) => {
        console.log('err: ', err);

      }
    )
  }

  viewUsuario(usuario: Usuario) {
    console.log('uausrio: ', usuario);

    this.functionsService.navigate(`core/usuarios/editar-usuario/false/${usuario.uid}`)

  }
  editUsuario(usuario: Usuario) {
    this.functionsService.navigate(`core/usuarios/editar-usuario/true/${usuario.uid}`)
    console.log('catalogo: ', usuario);
  }
  isActive(usuario: Usuario) {
    console.log('usuario: ', usuario);
    this.functionsService.showLoading().then((resp: any) => {
      this.loading = resp
      this.authService.activeUsuario(usuario).pipe(delay(1000)).subscribe((resp) => {
        console.log('resp: ', resp);

        this.functionsService.closeLoading(this.loading)
        this.getUsuarios()
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
    this.usuarios = this.usuariosTemp
    if (event.target.value.toLowerCase() === '') {
      this.ngOnChanges(this.usuariosTemp)
    }
    const query = event.target.value.toLowerCase();
    console.log('query: ', query);
    this.usuarios = this.usuarios.filter(function (arr) {
      console.log('arr.nombre.toLowerCase(): ', arr.nombre.toLowerCase());
      console.log('event: ', query);

      return arr.nombre.toLowerCase().includes(query);
    })
    this.ngOnChanges(this.usuarios)

  }
}
