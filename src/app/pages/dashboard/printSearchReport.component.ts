import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { DataTape, DataLog } from '../dashboard/dashboard.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'ngx-printSearchReport',
    templateUrl: './printSearchReport.component.html'
})
export class PrintSearchReportComponent {
    reportObj: any = {};
    reportSearchObj: any = {};

    constructor(public dialogRef: MatDialogRef<PrintSearchReportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public changeDetectorRef: ChangeDetectorRef) {
        if (data !== null) {
            console.log(data);
            this.reportObj = data.searchData;
            this.reportSearchObj = data.searchParameter;
        }
        else {

        }
    }

    closeModal() {
        this.dialogRef.close();
    }

    printReport() {
        const printContent = document.getElementById('print').innerHTML;
        var popupWin = window.open('', '_blank');

        popupWin.document.open();
        popupWin.document.write("<html><head></head><body onload='window.print()'>" + printContent + "</body></html>");
        popupWin.document.close();
    }
}