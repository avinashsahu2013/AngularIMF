import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButton } from '@angular/material';

@Component({
    selector: 'ngx-confirm',
    templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
    modalHeader: string = "";
    modalContent: string = "";
    showCancel: boolean = false;
    trueButton: string = "Yes";
    falseButton: string = "No";

    constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalContent = data.message;
        this.showCancel = data.IsConfirmation;
        this.modalHeader = data.messageboxTitle;
        if (data.IsYesNo) {
            this.trueButton = "Ok";
            this.falseButton = "Cancel";
        }
    }

    cancelDialog() {
        this.dialogRef.close(false);
    }
    okDialog() {
        this.dialogRef.close(true);
    }
}