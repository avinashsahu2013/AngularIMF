import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmComponent } from '../pages/common/confirm.component';

@Injectable({ providedIn: "root" })
export class AlertService {

    constructor(public dialog: MatDialog) {
    }

    OpenConfirm(message, IsConfirmation, messageboxTitle, IsYesNo = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let dialogRef = this.dialog.open(ConfirmComponent, {
                width: '35%',
                data: { message: message, IsConfirmation: IsConfirmation, messageboxTitle: messageboxTitle, IsYesNo: IsYesNo }
            });
            dialogRef.afterClosed().subscribe(result => {
                resolve(result);
            });
        });
    }
}