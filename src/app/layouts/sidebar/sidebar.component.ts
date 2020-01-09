import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ImportProcessService } from '../../services/importProcess.service';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class AppSidebarComponent {
    @BlockUI() blockUI: NgBlockUI
    @ViewChild('myInput')
    myInputVariable: any;
    isAdmin = false;
    mobileQuery: MediaQueryList;
    fileToUpload: File = null; 
    fileData: any = [];
    fileDate: any = [];
    fileName: any = [];
    files: any = [];
    emptyFiles: any = [];
    confirmMessage: any = "";
    textLine = "";
    path = "";
    noOfFiles = "";
    index = 0;
    isUpdated: boolean = false;
    glShootDate: Date;
    filedata: any = [];
    process: any = [];
    importValues = ["TAPE_TITLE", "SUBTITLE", "AIR_DATE", "SHOOT_DATE", "VENUE", "LOCATION", "LOGGED_BY", "PRODUCER", "DIRECTOR", "REEL_NUMBER", "LOG_CODE", "OTHER", "TIMECODE_SOURCE"];
    importProcess = { "Id": 0, "TAPE_TITLE": "", "SUBTITLE": "", "AIR_DATE": "", "SHOOT_DATE": "", "VENUE": "", "LOCATION": "", "LOGGED_BY": "", "PRODUCER": "", "DIRECTOR": "", "REEL_NUMBER": "", "LOG_CODE": "", "OTHER": "", "ShowCode": "", "DataLogs": [] };
    private _mobileQueryListener: () => void;

    constructor(public menuItems: MenuItems, public route: Router, private toastr: ToastrService, public dashboardService: DashboardService) {
        
    } 
}
