import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FullComponent } from './layouts/full.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const AppRoutes: Routes = [
    //{ path: 'home', component: HomeComponent },
    {
      path: '',
        component: FullComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

