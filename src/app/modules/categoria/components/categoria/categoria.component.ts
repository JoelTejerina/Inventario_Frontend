import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacionComponent } from 'src/app/modules/shared/components/confirmacion/confirmacion.component';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategorias();
  }
  displayedColumns: string[] = ['idCategoria', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CategoriaElement>();

  getCategorias(){

    this.categoriaService.getCategorias()
        .subscribe( (data:any) => {

          console.log("respuesta categories: ", data);
          this.processCategoriesResponse(data);

        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoriaElement[] = [];

    if( resp.metadata[0].codigo == "200") {

      let listCategory = resp.categoriaResponse.categorias;

      console.log("array ", listCategory) 
      listCategory.forEach((element: CategoriaElement) => {
        dataCategory.push(element);
      });
    }

    this.dataSource = new MatTableDataSource<CategoriaElement>(dataCategory);   
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
      data: {idCategoria: idCategoria}
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

  abrirSnackBar(mensaje: string, accion: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje, accion, {
      duration: 2000
    })
  }
}

export interface CategoriaElement {
  descripcion: string;
  idCategoria: number;
  nombre: string;
}