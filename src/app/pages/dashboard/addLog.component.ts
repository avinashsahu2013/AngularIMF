import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { LogDetailService } from '../../services/logDetail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'ngx-addLog',
    templateUrl: './addLog.component.html'
})
export class AddLogComponent {
    public mask: any
    logObj: any = {
        id: 0, jobId: 0, time: "", code: "", story: ""
    };
    intervalObj: any = [5, 10, 15, 20, 25, 30];
    selectedInterval: any = 5;
    availableSequence: any = [];
    selectedSequence: any;
    public maskTime = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
    public regtime: any = new RegExp('/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)');

    constructor(public dialogRef: MatDialogRef<AddLogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public logDetailService: LogDetailService,
        public changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService, public alertService: AlertService) {
        if (data !== null) {
            this.logObj = data;
        }
        else {
            this.logObj.jobId = logDetailService.jobId;
        }
    }

    closeModal() {
        this.dialogRef.close();
    }

    saveLog() {
        if (this.logObj.time != "") {
            if (this.logObj.time.length == 8) {
                this.logDetailService.saveLog(this.logObj).subscribe(data => {
                    this.toastr.success('Saved Successfully!');
                    this.dialogRef.close();
                },
                    error => {
                        this.toastr.error(error);
                    });
            }
            else {
                this.alertService.OpenConfirm("Enter valid time", false, "Log Detail Confirmation");
                return false;
            }
        }
        else {
            this.alertService.OpenConfirm("Enter time", false, "Log Detail Confirmation");
            document.getElementById('txtTime').focus();
            return false;
        }
    }
    calculate() {
        if (this.logObj.time != "") {
            if (this.logObj.time.length == 8) {
                this.logDetailService.getAvailableSequence(this.logObj.id, this.logObj.jobId, this.logObj.time, this.selectedInterval).subscribe(data => {
                    this.availableSequence = data;
                }, error => {
                    //
                });
            }
            else {
                this.alertService.OpenConfirm("Enter valid time", false, "Log Detail Confirmation");
            }
        }
        else {
            this.alertService.OpenConfirm("Enter time", false, "Log Detail Confirmation");
            document.getElementById('txtTime').focus();
        }
    }

    ChangeTime(obj) {
        this.logObj.time = obj.value;
    }

    validateTime(time) {
        if (this.logObj.time.length == 0) {
            return false;
        }
        if (this.logObj.time.length != 8) {
            this.logObj.time = "";
            this.alertService.OpenConfirm("Enter valid time", false, "Log Detail Confirmation");
            document.getElementById('txtTime').focus();
            return false;
        }

        this.logDetailService.ValidateTime(this.logObj.jobId, this.logObj.time).subscribe(data => {
            if (data[0].validateMessage != "") {
                this.logObj.time = "";
                this.alertService.OpenConfirm(data[0].validateMessage, false, "Log Detail Confirmation");
                document.getElementById('txtTime').focus();
                return false;
            }
        }, error => {
            //
        });
    }
}