import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { DataTape, DataLog } from '../dashboard/dashboard.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'ngx-printReport',
    templateUrl: './printReport.component.html'
})
export class PrintReportComponent {
    reportObj: DataTape;
    isVisible: boolean = true;
    constructor(public dialogRef: MatDialogRef<PrintReportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public changeDetectorRef: ChangeDetectorRef) {
        if (data !== null) {
            this.reportObj = data;
        }
        else {

        }
    }

    closeModal() {
        this.dialogRef.close();
    }
    savePDF(pdfObj) {
        //this.isVisible = true;
        pdfObj.saveAs('Report.pdf')
    }

    printReport() {
        //this.isVisible = false;
        const printContent = document.getElementById('print').innerHTML;
        var popupWin = window.open('', '_blank');

        popupWin.document.open();
        popupWin.document.write("<html><head></head><body onload='window.print()'>" + printContent + "</body></html>");
        popupWin.document.close();
    }
}