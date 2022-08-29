import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './pages/dasboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ 
    DasboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
