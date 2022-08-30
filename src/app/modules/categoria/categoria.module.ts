import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevaCategoriaComponent } from './components/nueva-categoria/nueva-categoria.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    NuevaCategoriaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriModule { }
