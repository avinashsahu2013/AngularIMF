import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesComponent } from './pages.component';
import { routes } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { ImportProcessComponent } from './importProcess/importProcess.component';
import { AddUserProfileComponent } from './userProfile/addUserProfile.component';
import { AddLogComponent } from './dashboard/addLog.component';
import { PrintReportComponent } from './dashboard/printReport.component';
import { PrintSearchReportComponent } from './dashboard/printSearchReport.component';
import { LogDetailComponent } from './dashboard/logDetail.component';
import { AccessDeniedComponent } from './common/accessDenied.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import {
    MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { TextMaskModule } from 'angular2-text-mask';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';;
import { FullReportComponent } from './Reports/full-report/full-report.component';

const PAGES_COMPONENTS = [
    PagesComponent,
    DashboardComponent,
    UserProfileComponent,
    AddUserProfileComponent,
    LogDetailComponent,
    AddLogComponent,
    ImportProcessComponent,
    PrintReportComponent,
    AccessDeniedComponent,
    PrintSearchReportComponent
];
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        NgbModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatTableModule,
        PDFExportModule,
        TextMaskModule,
        ReactiveFormsModule,
        InfiniteScrollModule
    ],
    declarations: [
        ...PAGES_COMPONENTS
,
        FullReportComponent    ],
    entryComponents: [DashboardComponent, AddUserProfileComponent, AddLogComponent, PrintReportComponent, AccessDeniedComponent, PrintSearchReportComponent],
    bootstrap: [DashboardComponent],
    providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: DatePipe, useValue: {}}]

})

export class PagesModule { }
