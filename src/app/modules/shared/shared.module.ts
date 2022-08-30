import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmacionComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
