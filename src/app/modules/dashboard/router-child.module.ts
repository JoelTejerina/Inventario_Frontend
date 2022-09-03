import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from '../categoria/components/categoria/categoria.component';
import { ProductoComponent } from '../producto/producto/producto.component';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'categoria', component: CategoriaComponent },
    { path: 'producto', component: ProductoComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
