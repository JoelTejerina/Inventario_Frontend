import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>, private productoService: ProductoService,
              @Inject (MAT_DIALOG_DATA) public data: any, private categoriaService: CategoriaService) {

  }

  ngOnInit(): void {
  }

  noClick(){
    this.dialogRef.close(3)
  }

  eliminar(){
    if (this.data != null) {
      if (this.data.module == "categoria") {
        this.categoriaService.eliminarCategoria(this.data.idCategoria)
        .subscribe((data:any) => {
          this.dialogRef.close(1);
        }),(error:any) => {
          this.dialogRef.close(2);
        }
      } else if (this.data.module == "producto"){
        this.productoService.eliminarProducto(this.data.idProducto)
        .subscribe((data:any) => {
          this.dialogRef.close(1);
        }),(error:any) => {
          this.dialogRef.close(2);
        }
      }
    }else{
      this.dialogRef.close(2);
    }
  }

}
