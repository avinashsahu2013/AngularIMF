import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { UserProfileService } from '../../services/userProfile.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
    selector: 'ngx-addUserProfile',
    templateUrl: './addUserProfile.component.html'
})
export class AddUserProfileComponent {
    @BlockUI() blockUI: NgBlockUI
    userObj: any = {
        id: 0, userId: "", userName: "", isAuthorize: true, isAdmin: false, createdBy: "", createdDate: "", updatedBy: "", updatedDate: ""
    };

    constructor(public dialogRef: MatDialogRef<AddUserProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public userProfileService: UserProfileService,
        public changeDetectorRef: ChangeDetectorRef, private toastr: ToastrService) {
        if (data !== null) {
            this.userObj = data;
        }
    }

    closeModal() {
        this.dialogRef.close();
    }

    saveUser() {
        this.blockUI.start();
        this.userProfileService.saveUser(this.userObj).subscribe(data => {
            this.dialogRef.close();
            this.toastr.success('Saved Successfully!');
            this.blockUI.stop();
        },
            error => {
                this.toastr.error(error);
                this.blockUI.stop();
            });
    }
}