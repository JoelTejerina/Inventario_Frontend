import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './pages/dasboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ 
    DasboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
