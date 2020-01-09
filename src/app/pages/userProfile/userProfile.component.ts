import { Component, ViewChild } from '@angular/core';
import { UserProfileService } from '../../services/userProfile.service';
import { AddUserProfileComponent } from './addUserProfile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AlertService } from '../../services/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngx-userProfile',
    templateUrl: './userProfile.component.html'
})
export class UserProfileComponent {
    @BlockUI() blockUI: NgBlockUI
    displayedColumns = ['Actions', 'UserId', 'UserName', 'IsAdmin', 'CreatedBy', 'CreatedDate', 'UpdatedBy','UpdatedDate'];
    userDataSource: any = new MatTableDataSource<IUserProfile>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public userProfileService: UserProfileService, public dialog: MatDialog, private datePipe: DatePipe,
        private toastr: ToastrService,
        public alertService: AlertService) {
       
        this.GetUserProfile();
    }

    GetUserProfile() {
        this.blockUI.start();
        this.userProfileService.getSecurityProfiles().subscribe((data: Array<object>) => {
            if (data != null) {
                this.userDataSource = new MatTableDataSource(data);
                this.userDataSource.paginator = this.paginator;
                this.blockUI.stop();
            }
        },
            error => {
                console.log(error);
                this.blockUI.stop();
            });
    }

    ngOnInit() {
        this.userDataSource.paginator = this.paginator;
    }

    OpenEdit(user, eventName: string): void {
        let dialogRef;
        if (eventName == "Edit") {
            dialogRef = this.dialog.open(AddUserProfileComponent, {
                width: '40%',
                data: user
            });
        }
        else {
            dialogRef = this.dialog.open(AddUserProfileComponent, {
                width: '40%'
            });
        }
        dialogRef.afterClosed().subscribe(result => {
            this.GetUserProfile();
        });
    }

    DeleteUser(userId) {
        this.alertService.OpenConfirm("Are you sure you want to delete?", true, "UserProfile Confirmation").then(x => {
            if (x == true) {
                this.userProfileService.deleteUser(userId).subscribe(data => {
                    if (data == true) {
                        this.GetUserProfile();
                        this.toastr.success('Deleted Successfully!');
                    }
                    else {
                        //
                    }

                });
            }
        });
    }
}

export interface IUserProfile {
    id: number;
    userId: string;
    userName: string;
    isAdmin: boolean;
    authenticated: boolean;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;

}
