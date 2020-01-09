import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full.component';
import { AppHeaderComponent } from './layouts/header/header.component';
import { AppSidebarComponent } from './layouts/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmComponent } from '../app/pages/common/confirm.component';

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,

        AppHeaderComponent,
        SpinnerComponent,
        AppSidebarComponent,
        ConfirmComponent
    ],
    entryComponents: [ConfirmComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(AppRoutes),
        BlockUIModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            closeButton: true
        }), // ToastrModule added
        ReactiveFormsModule        
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
