import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

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
}

export interface ProductoElement{
  idProducto: number,
  nombre: string,
  precio: number,
  cantidad: number,
  categoria: any,
  imagen: any
}
