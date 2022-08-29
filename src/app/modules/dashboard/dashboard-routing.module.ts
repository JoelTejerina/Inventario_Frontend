import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './pages/dasboard.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DasboardComponent, 
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
