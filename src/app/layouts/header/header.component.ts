import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert.service';
import { DashboardService } from '../../services/dashboard.service';
import { ImportProcessService } from '../../services/importProcess.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class AppHeaderComponent {
    UserName = "";
    @BlockUI() blockUI: NgBlockUI
    @ViewChild('myInput')
    myInputVariable: any;
    isAdmin = false;
    mobileQuery: MediaQueryList;
    fileToUpload: File = null;
    dataTape: any = [];
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


    constructor(public importProcessService: ImportProcessService,
         public route: Router, private toastr: ToastrService, public alertService: AlertService, public dashboardService: DashboardService) {        
    }


    readFile(index) {
        var reader = new FileReader();
        if (index >= this.files.length) return true;
        var file = this.files[index];
        var filedir = file.name.split('.');
        this.fileName.push(file.name);
        this.fileDate.push(file.lastModifiedDate);
        reader.onload = (e) => {
            var fileRead = reader.result;
            this.fileData.push(fileRead);
            if (this.readFile(index + 1)) {
                this.ProcessFiles(this.fileData[0], this.fileName[0], this.fileDate[0]);
            }
        }
        reader.readAsText(file);
    }

    handleFileInput(event: any) {
        this.fileName = [];
        this.fileDate = [];
        this.fileData = [];
        this.index = 0;
        this.path = "";
        let pathroute = [];
        this.path = window.location.hash.toString();
        pathroute = this.path.split("#/");
        if (pathroute[1] != "userProfile") {
            this.route.navigate(["/"]);
        }
        this.files = event.srcElement.files;
        this.blockUI.start();
        this.readFile(0);
    }

    ProcessFiles(fileData, fileName, fileDate) {
        var result = this.validateFile(fileData, fileDate);
        if (result.length > 0) {
            this.importProcessService.logExist(this.importProcess.LOG_CODE).subscribe(data => {
                this.dataTape = data;
                if (this.dataTape.length > 0) {
                    this.glShootDate = new Date(this.dataTape[0].shooT_DATE);
                    fileDate = new Date(fileDate);
                    this.importProcess.Id = this.dataTape[0].id;
                    this.importProcess.SHOOT_DATE = this.dataTape[0].shooT_DATE;
                    if (this.formatDate(this.glShootDate) < this.formatDate(fileDate)) {
                        this.blockUI.stop();
                        this.alertService.OpenConfirm("The Information in " + fileName + " is newer then the existing information!.. Overwrite? Y/N", true, "Import Process Confirmation").then(x => {
                            if (x == true) {
                                this.confirmMessage = "updated Successfully.";
                                this.blockUI.start();
                                this.processFile(this.importProcess);
                            } else {
                                if (this.index + 1 < this.fileData.length) {
                                    this.blockUI.start();
                                    this.index += 1;
                                    this.ProcessFiles(this.fileData[this.index], this.fileName[this.index], this.fileDate[this.index]);
                                }
                                else {
                                    this.refreshPage();
                                }
                            }
                        });
                    }
                    if (this.formatDate(this.glShootDate) > this.formatDate(fileDate)) {
                        this.blockUI.stop();
                        this.alertService.OpenConfirm("The Information in " + fileName + " is older then the existing information!.. Overwrite? Y/N", true, "Import Process Confirmation").then(x => {
                            if (x == true) {
                                this.confirmMessage = "updated Successfully.";
                                this.blockUI.start();
                                this.processFile(this.importProcess);
                            } else {
                                if (this.index + 1 < this.fileData.length) {
                                    this.blockUI.start();
                                    this.index += 1;
                                    this.ProcessFiles(this.fileData[this.index], this.fileName[this.index], this.fileDate[this.index]);
                                }
                                else {
                                    this.refreshPage();
                                }
                            }
                        });
                    }
                    if (this.formatDate(this.glShootDate) == this.formatDate(fileDate)) {
                        this.blockUI.stop();
                        this.alertService.OpenConfirm("The Information in " + fileName + " is same then the existing information!.. Overwrite? Y/N", true, "Import Process Confirmation").then(x => {
                            if (x == true) {
                                this.confirmMessage = "updated Successfully.";
                                this.blockUI.start();
                                this.processFile(this.importProcess);
                            } else {
                                if (this.index + 1 < this.fileData.length) {
                                    this.blockUI.start();
                                    this.index += 1;
                                    this.ProcessFiles(this.fileData[this.index], this.fileName[this.index], this.fileDate[this.index]);
                                }
                                else {
                                    this.refreshPage();
                                }
                            }
                        });
                    }
                }
                else {
                    this.confirmMessage = "imported Successfully.";
                    this.processFile(this.importProcess);
                }
            }, error => {
                this.toastr.error(error);
            });
        }
    }

    validateFile(file, fileDate) {
        this.textLine = "";
        this.importProcess.DataLogs = [];
        var lines = file.split("\r\n");
        for (let line of lines) {
            if (line.includes("=")) {
                var text = line.split('=');
                var title = text[0];
                var value = text.length > 1 ? text[1] : "";
            }
            else {
                if (line.length > 0) {
                    var datalog = line.split("\t");
                    this.importProcess.DataLogs.push({ "TIME": datalog[0], "CODE": datalog[1], "STORY": datalog[2] });
                }
            }
            if (this.importValues[0] == title) {
                this.importProcess.TAPE_TITLE = value;
            }
            else if (this.importValues[1] == title) {
                this.importProcess.SUBTITLE = value;
            }
            else if (this.importValues[2] == title) {
                if (value != "" && value != undefined) {
                    this.importProcess.AIR_DATE = value;
                }
            }
            else if (this.importValues[3] == title) {
                if (value != "" && value != undefined) {
                    this.importProcess.SHOOT_DATE = value;
                }
                else {
                    this.importProcess.SHOOT_DATE = fileDate;
                }
            }
            else if (this.importValues[4] == title) {
                this.importProcess.VENUE = value;
            }
            else if (this.importValues[5] == title) {
                this.importProcess.LOCATION = value;
            }
            else if (this.importValues[6] == title) {
                this.importProcess.LOGGED_BY = value;
            }
            else if (this.importValues[7] == title) {
                this.importProcess.PRODUCER = value;
            }
            else if (this.importValues[8] == title) {
                this.importProcess.DIRECTOR = value;
            }
            else if (this.importValues[9] == title) {
                this.importProcess.REEL_NUMBER = value;
            }
            else if (this.importValues[10] == title) {
                if (value == "") {
                    this.toastr.error("The LOG CODE in " + this.fileName[this.index] + " can not contain a Null Value Fix the file and try again!..");
                    this.blockUI.stop();
                    return "";
                }
                else {
                    this.importProcess.LOG_CODE = value;
                }
            }
            else if (this.importValues[11] == title) {
                this.importProcess.OTHER = value;
            }
            else if (this.importValues[12] == title) {
                this.importProcess.ShowCode = value;
            }
            this.textLine = this.textLine + title + "\r\n";
        }
        this.process.push(this.importProcess);
        return this.textLine;
    }

    processFile(fileProcessData) {
        this.importProcessService.importProcess(fileProcessData).subscribe(data => {
            if (this.confirmMessage.indexOf("imported") >= 0) {
                this.toastr.success(this.fileName[this.index] + " " + this.confirmMessage);
            }
            else {
                this.toastr.info(this.fileName[this.index] + " " + this.confirmMessage);
            }
            if (this.index + 1 >= this.fileData.length) {
                this.blockUI.stop();
                this.refreshPage();
            }
            else {
                this.index += 1;
                this.ProcessFiles(this.fileData[this.index], this.fileName[this.index], this.fileDate[this.index]);
            }
        }, error => {
            this.toastr.error(error);

        });

    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    refreshPage() {
        this.myInputVariable.nativeElement.value = "";
        this.route.navigate(["/dashboard"]);
    }
}
