import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './userProfile/userProfile.component'; 
import { ImportProcessComponent } from './importProcess/importProcess.component';
import { AccessDeniedComponent } from './common/accessDenied.component';
import { FullReportComponent } from './Reports/full-report/full-report.component';



export const routes: Routes = [{
    path: '',
    component: DashboardComponent
},
{
path: 'dashboard',
component: DashboardComponent
},
{
    path: 'fullReport',
    component: FullReportComponent
},
{
    path: 'userProfile',
    component: UserProfileComponent
}, 
{
    path: 'importProcess',
    component: ImportProcessComponent
},
{
    path: 'accessdenied',
    component: AccessDeniedComponent
}

];
