import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacionComponent } from '../../shared/components/confirmacion/confirmacion.component';
import { ProductoService } from '../../shared/services/producto.service';
import { NuevoProductoComponent } from '../nuevo-producto/nuevo-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductos();
  }


  displayedColumns: string[] = ['idProducto', 'nombre', 'precio','cantidad','imagen', 'categoria','acciones'];
  dataSource = new MatTableDataSource<ProductoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProductos(){
    this.productoService.getProductos()
        .subscribe( (data:any) => {
          console.log("respuesta productos: ", data);
          this.procesarProductosResponse(data);
        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  procesarProductosResponse(resp: any){

    const dataProducto: ProductoElement[] = [];

    if( resp.metadata[0].codigo == "200") {

      let listProducto = resp.productoResponse.productos;

      listProducto.forEach((element: ProductoElement) => {
        element.imagen = 'data:image/jpeg;base64,'+element.imagen;
        dataProducto.push(element);
      });

      this.dataSource = new MatTableDataSource<ProductoElement>(dataProducto);
      this.dataSource.paginator = this.paginator;
    }  
  }

  abrirProductoDialog(){
    const dialogRef = this.dialog.open( NuevoProductoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      
      if (result == 1) {
        this.abrirSnackBar("Producto agregado", "Exitosa");
        this.getProductos();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al guardar producto", "Error");
      }
    });
  }

  abrirSnackBar(mensaje: string, accion: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje, accion, {
      duration: 2000
    })
  }

  editar(idProducto: number, nombre: string, precio: number, cantidad: number, categoria: any){
    const dialogRef = this.dialog.open( NuevoProductoComponent, {
      width: '450px',
      data: {idProducto: idProducto, nombre: nombre, precio: precio, cantidad: cantidad, categoria: categoria}
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      
      if (result == 1) {
        this.abrirSnackBar("Producto editado", "Exitosa");
        this.getProductos();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al editar producto", "Error");
      }
    });
  }

  eliminar(idProducto: any){
    const dialogRef = this.dialog.open( ConfirmacionComponent, {
      width: '450px',
      data: {idProducto: idProducto, module: "producto"}
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      
      if (result == 1) {
        this.abrirSnackBar("Producto eliminado", "Exitosa");
        this.getProductos();

      }else if (result == 2){
        this.abrirSnackBar("Se produjo en error al eliminar producto", "Error");
      }
    });
  }

  buscar(nombre: any){
    if (nombre.length === 0) {
      return this.getProductos();
    }

    this.productoService.getBuscarProductoPorNombre(nombre)
          .subscribe((resp: any) => {
            this.procesarProductosResponse(resp);
          })
  }
}

export interface ProductoElement{
  idProducto: number,
  nombre: string,
  precio: number,
  cantidad: number,
  categoria: any,
  imagen: any
}
