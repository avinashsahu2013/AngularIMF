import { Component, ViewChild } from '@angular/core';
import { LogDetailService } from '../../services/logDetail.service';
import { DatePipe } from '@angular/common';
import { DataTape, DataLog } from '../dashboard/dashboard.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddLogComponent } from './addLog.component';
import { PrintReportComponent } from './printReport.component';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { DashboardService } from '../../services/dashboard.service';
import { AlertService } from '../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { DashboardDataServiceService } from '../../services/dashboard-data-service.service';

@Component({
    selector: 'ngx-logDetail',
    templateUrl: './logDetail.component.html'
})
export class LogDetailComponent {

    @BlockUI() blockUI: NgBlockUI
    objSelectedCodes: any = [{ code: "" }];
    datalist: DataLog[] = [];
    limit = 30;
    offset = 0;
    endSearch = false;
    maxColumnWidth = 500;
    maxRowWidth = 500;
    windowMaxHeight = 500;
    totalCount = 0;
    objTapeDetails: any = {
        id: 0,
        loG_CODE: "",
        tapE_TITLE: "",
        subtitle: "",
        location: "",
        aiR_DATE: "",
        shooT_DATE: "",
        reeL_NUMBER: "",
        director: "",
        producer: "",
        loggeD_BY: "",
        other: "",
        showCode: "",
        venue: "",
        dataLogs: ""
    };

    objCodes: any = [{
        id: 0,
        code: ""
    }];
    displayedColumns = ['Actions', 'Time', 'Code', 'Story'];
    tapeLogSource: any = new MatTableDataSource<DataLog>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    jobId = 0;

    constructor(public logDetailService: LogDetailService, public dialog: MatDialog, public dashboardService: DashboardService,
        public route: Router, private toastr: ToastrService, public alertService: AlertService, public dashboardDataService: DashboardDataServiceService) {
        this.jobId = (this.jobId > 0 ? this.jobId : this.dashboardService.jobId);
        if (this.jobId === undefined) {
            this.route.navigate(["/dashboard"]);
        }
        else {
            //Print by Code option hidden 
            //this.getCodes();
            this.getTapeDetails(true);
        }
    }
    ngOnInit() {
        this.getWindowHeight();
    }

    getTapeDetails(loadUi) {
        if (loadUi == true) {
            this.blockUI.start();
        }
        if (this.endSearch == false) {
            this.logDetailService.getTapeDetails(this.jobId, this.limit, this.offset, false).subscribe((data: DataTape) => {

                if (data != null) {
                    this.objTapeDetails = data;
                    data.dataLogs.forEach(obj => {
                        if (obj.story != undefined) {
                            var length = this.getTextWidth(obj.story, "12px Ubuntu");
                            if (length > this.maxColumnWidth)
                                this.maxColumnWidth = length;
                        }
                        this.maxRowWidth = this.maxColumnWidth + 300;
                        this.datalist.push(obj);
                    });

                    this.tapeLogSource = new MatTableDataSource(this.datalist.sort((a, b) => a.time.localeCompare(b.time)));

                    this.getAllLogDetails();

                    if (loadUi == true) {
                        this.blockUI.stop();
                    }
                }
                else {
                    this.endSearch = true;
                }
            },
                error => {
                    console.log(error);
                    if (loadUi == true) {
                        this.blockUI.stop();
                    }
                });
            this.offset = this.offset + this.limit;
        }

    }

    getAllLogDetails() {
        this.logDetailService.getTapeDetails(this.jobId, this.limit, this.offset, true).subscribe((data: DataTape) => {
            if (data != null) {
                this.objTapeDetails = data;
                data.dataLogs.forEach(obj => {
                    if (obj.story != undefined) {
                        var length = this.getTextWidth(obj.story, "12px Ubuntu");
                        if (length > this.maxColumnWidth)
                            this.maxColumnWidth = length;
                    }
                    this.maxRowWidth = this.maxColumnWidth + 300;
                    this.datalist.push(obj);
                });
                this.tapeLogSource = new MatTableDataSource(this.datalist.sort((a, b) => a.time.localeCompare(b.time)));
                this.totalCount = this.tapeLogSource.filteredData.length;
            }
            else {
                if (this.tapeLogSource.filteredData.length > 0) {
                    this.totalCount = this.tapeLogSource.filteredData.length;
                }
            }
            
            this.endSearch = false;
        },
            error => {
                console.log(error);
            });
    }


    getCodes() {
        this.logDetailService.getCodes().subscribe((data) => {
            if (data != null) {
                this.objCodes = data;
            }
        },
            error => {
            });
    }

    OpenEdit(log, eventName: string): void {
        let dialogRef;
        if (eventName == "Edit") {
            dialogRef = this.dialog.open(AddLogComponent, {
                width: '40%',
                data: log
            });
        }
        else {
            this.logDetailService.jobId = this.dashboardService.jobId;
            dialogRef = this.dialog.open(AddLogComponent, {
                width: '40%'
            });
        }
        dialogRef.afterClosed().subscribe(result => {
            this.datalist = []; this.offset = 0;
            this.getTapeDetails(true);
        });
    }

    SaveDetails(detail) {
        this.logDetailService.saveDataTape(this.objTapeDetails).subscribe(data => {
            this.toastr.success('Saved Successfully!');
        },
            error => {
                this.toastr.error(error);
                //
            });
    }

    Print(detail) {
        let dialogRef;
        detail.dataLogs = this.datalist;
        dialogRef = this.dialog.open(PrintReportComponent, {
            width: '50%',
            height: '80%',
            data: detail
        });
    }

    PrintByCodes(detail) {
        detail.dataLogs = this.datalist;
        if (this.objSelectedCodes.length > 0) {
            let dialogRef;
            var detailsByCodes = Object.assign({}, detail);
            detailsByCodes.dataLogs = [];
            this.objSelectedCodes.forEach(function (code) {
                detail.dataLogs.forEach(function (dataLog) {
                    if (dataLog.code.trim().toLowerCase().includes(code.trim().toLowerCase())) {
                        detailsByCodes.dataLogs.push(dataLog);
                    }
                });
            });

            if (detailsByCodes.dataLogs.length > 0) {
                dialogRef = this.dialog.open(PrintReportComponent, {
                    width: '50%',
                    height: '80%',
                    data: detailsByCodes
                });
            }
            else {
                this.alertService.OpenConfirm("No matching record found", false, "Log Detail Confirmation");
            }
        }
        else {
            this.alertService.OpenConfirm("Please select the code & try again", false, "Log Detail Confirmation")
        }
    }

    DeleteLog(row, id) {
        this.alertService.OpenConfirm("Are you sure you want to delete?", true, "Log Detail Confirmation").then(x => {
            if (x == true) {
                this.logDetailService.deleteLog(id).subscribe(data => {
                    if (data == true) {
                        this.toastr.success('Deleted Successfully!');
                        this.datalist.splice(this.datalist.indexOf(row), 1);
                        this.tapeLogSource = new MatTableDataSource(this.datalist.sort((a, b) => a.time.localeCompare(b.time)));
                        this.totalCount = this.tapeLogSource.filteredData.length;
                    }
                    else {
                        //
                    }
                },
                    error => {
                        this.toastr.error(error);
                    });
            }
        });
    }

    DeleteTape(dataTape) {
        this.alertService.OpenConfirm('Really delete ' + dataTape.loG_CODE.trim() + ' Log?', true, "Log Detail Confirmation").then(x => {
            if (x == true) {
                this.blockUI.start();
                this.dashboardService.DeleteDataTape(dataTape.id).subscribe((data) => {
                    if (data == true) {
                        this.toastr.success('LOG ' + dataTape.loG_CODE.trim() + ' DELETED');
                        this.route.navigate(["/dashboard"]);
                    }
                    this.blockUI.stop();
                },
                    error => {
                        this.toastr.error(error);
                        this.blockUI.stop();
                    });
            }
            else {
                //do nothing
            }
        });
    }
    onScroll() {
        //hide scroll functionality
        //this.getTapeDetails(false);
    }

    getTextWidth(text, font) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }

    getWindowHeight = function () {
        var windowHeight = $(window).innerHeight();
        this.windowMaxHeight = windowHeight - 180;
    };
    goBackToTapeList() {
        this.dashboardDataService.isSearch = true;
        this.route.navigate(["/dashboard"]);
    }
}