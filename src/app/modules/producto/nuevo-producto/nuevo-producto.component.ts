import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../shared/services/categoria.service';
import { ProductoService } from '../../shared/services/producto.service';

export interface Categoria {
  descripcion: string;
  idCategoria: number;
  nombre: string;
}

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  public productoForm: FormGroup;
  estadoFormulario = "";
  categorias: Categoria[]=[];
  seleccionarFile: any;
  nombreImagen: string = "";
  constructor(private fb: FormBuilder, private categoriaService: CategoriaService,
    private productoService: ProductoService, private dialogRef: MatDialogRef<NuevoProductoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.estadoFormulario = "Agregar"
      this.productoForm = this.fb.group( {
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required],
        categoria: ['', Validators.required],
        imagen: ['', Validators.required]
      });

      if (data != null) {
        this.actualizarForm(data);
        this.estadoFormulario = "Actualizar";
      }
    }
    
    ngOnInit(): void {
      this.getCategoria();    
    }

    guardar(){
      let data = {
        nombre: this.productoForm.get('nombre')?.value,
        precio: this.productoForm.get('precio')?.value,
        cantidad: this.productoForm.get('cantidad')?.value,
        categoria: this.productoForm.get('categoria')?.value,
        imagen: this.seleccionarFile
      }

      const subirImagenData = new FormData();
      subirImagenData.append('imagen', data.imagen, data.imagen.nombre);
      subirImagenData.append('nombre', data.nombre);
      subirImagenData.append('precio', data.precio);
      subirImagenData.append('cantidad', data.cantidad);
      subirImagenData.append('idCategoria', data.categoria);

      if(this.data != null){
        this.productoService.actualizarProducto(subirImagenData, this.data.idProducto)
                  .subscribe((data: any) => {
                    this.dialogRef.close(1);
                  }), (error:any) => {
                    this.dialogRef.close(2);
                  }
      }else {
        this.productoService.guardarProducto(subirImagenData)
                  .subscribe((data: any) => {
                    this.dialogRef.close(1);
                  }), (error:any) => {
                    this.dialogRef.close(2);
                  }
      }

    }

    cancelar(){
      this.dialogRef.close(3);
    }

    getCategoria(){
      this.categoriaService.getCategorias()
          .subscribe((data:any) => {
            this.categorias = data.categoriaResponse.categorias;
      }), (error:any) => {
        console.log("Error al consultar categoria")
      }
    }

    onFileChanged(event:any){
      this.seleccionarFile = event.target.files[0];
      console.log(this.seleccionarFile);

      this.nombreImagen = event.target.files[0].name;
    }

    actualizarForm(data:any){
      this.productoForm = this.fb.group( {
        nombre: [data.nombre, Validators.required],
        precio: [data.precio, Validators.required],
        cantidad: [data.cantidad, Validators.required],
        categoria: [data.categoria.idCategoria, Validators.required]
      });
    }

}
