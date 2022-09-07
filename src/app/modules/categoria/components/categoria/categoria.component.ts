import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacionComponent } from 'src/app/modules/shared/components/confirmacion/confirmacion.component';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  esAdmin: any;

  constructor(private categoriaService: CategoriaService,
              public dialog: MatDialog, private snackBar: MatSnackBar,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getCategorias();
    console.log(this.utilityService.getRoles());
    this.esAdmin = this.utilityService.esAdmin();
  }

  displayedColumns: string[] = ['idCategoria', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CategoriaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategorias(){

    this.categoriaService.getCategorias()
        .subscribe( (data:any) => {

          console.log("respuesta categories: ", data);
          this.procesarCategoriasResponse(data);

        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  procesarCategoriasResponse(resp: any){

    const dataCategoria: CategoriaElement[] = [];

    if( resp.metadata[0].codigo == "200") {

      let listCategoria = resp.categoriaResponse.categorias;

      listCategoria.forEach((element: CategoriaElement) => {
        dataCategoria.push(element);
      });
    }

    this.dataSource = new MatTableDataSource<CategoriaElement>(dataCategoria);
    this.dataSource.paginator = this.paginator;   
  }

  abrirCategoriaDialog(){
    const dialogRef = this.dialog.open( NuevaCategoriaComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      
      if (result == 1) {
        this.abrirSnackBar("Categoria agregada", "Exitosa");
        this.getCategorias();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al guardar categoria", "Error");
      }
    });
  }

  editar(idCategoria:number, nombre: string, descripcion: string){
    const dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      width: '450px',
      data: {idCategoria: idCategoria, nombre: nombre, descripcion: descripcion}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if (result == 1) {
        this.abrirSnackBar("Categoria actuazalida", "Exitosa");
        this.getCategorias();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al actualizar categoria", "Error");
      }
    });
  }

  eliminar(idCategoria: any){
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '450px',
      data: {idCategoria: idCategoria, module: "categoria"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if (result == 1) {
        this.abrirSnackBar("Categoria eliminada", "Exitosa");
        this.getCategorias();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al eliminar categoria", "Error");
      }
    });
  }

  buscar( termino: string){
    if (termino.length === 0) {
      return this.getCategorias();
    }

    this.categoriaService.getCategoriaPorId(termino)
          .subscribe((rest:any) => {
            this.procesarCategoriasResponse(rest);
          })
  }

  abrirSnackBar(mensaje: string, accion: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje, accion, {
      duration: 2000
    })
  }

  exportExcel(){
    this.categoriaService.getExportCategorias()
          .subscribe((data:any) => {
            let archivo = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            let archivoUrl = URL.createObjectURL(archivo);
            var anchor = document.createElement("a");
            anchor.download = "categorias.xlsx"
            anchor.href = archivoUrl;
            anchor.click();

            this.abrirSnackBar("Archivo exportado correctamente", "Exitosa");
          }), (error:any) => {
            this.abrirSnackBar("No se pudo exportar correctamente", "Error");

          }
  }
}

export interface CategoriaElement {
  descripcion: string;
  idCategoria: number;
  nombre: string;
}