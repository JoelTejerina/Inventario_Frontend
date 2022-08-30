import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {

  public categoriaForm: FormGroup;
  constructor(private fb: FormBuilder, private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<NuevaCategoriaComponent>) {

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    let data = {
      nombre: this.categoriaForm.get('nombre')?.value,
      descripcion: this.categoriaForm.get('descripcion')?.value
    }

    this.categoriaService.guardarCategoria(data)
          .subscribe((data:any) =>{
            console.log(data);
            this.dialogRef.close(1);
          }), (error:any) => {
            this.dialogRef.close(2);
          }
  }
  cancelar(){
    this.dialogRef.close(3);
  }

}
