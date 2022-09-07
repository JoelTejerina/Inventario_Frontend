import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './pages/dasboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriModule } from '../categoria/categoria.module';
import { ProductoModule } from '../producto/producto.module';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ 
    DasboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoriModule,
    ProductoModule,
    MaterialModule,
    FlexLayoutModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
