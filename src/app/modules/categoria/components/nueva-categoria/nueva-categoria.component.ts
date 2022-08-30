import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {

  public categoriaForm: FormGroup;
  estadoFormulario: string = "";
  constructor(private fb: FormBuilder, private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<NuevaCategoriaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.estadoFormulario = "Agregar";

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    
    if (data != null) {
      this.actualizarForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  ngOnInit(): void {
  }

  guardar(){
    let data = {
      nombre: this.categoriaForm.get('nombre')?.value,
      descripcion: this.categoriaForm.get('descripcion')?.value
    }
    if(this.data != null){
      this.categoriaService.actualizarCategoria(data, this.data.idCategoria)
      .subscribe((data: any) =>{
        this.dialogRef.close(1)
      }), (error:any) => {
        this.dialogRef.close(2)
      }
    }else{
      this.categoriaService.guardarCategoria(data)
            .subscribe((data:any) =>{
              console.log(data);
              this.dialogRef.close(1);
            }), (error:any) => {
              this.dialogRef.close(2);
            }
    }
  }

  cancelar(){
    this.dialogRef.close(3);
  }

  actualizarForm(data: any){
    this.categoriaForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
  }
}
