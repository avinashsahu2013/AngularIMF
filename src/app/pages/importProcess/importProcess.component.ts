import { Component, ViewChild } from '@angular/core';
import { ImportProcessService } from '../../services/importProcess.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
//import { AuthenticationService } from '../../services/authentication.service';


@Component({
    selector: 'ngx-importProcess',
    templateUrl: './importProcess.component.html'
})
export class ImportProcessComponent {
    fileToUpload: File = null;
    fileUrl = "C:\CBS\Sports Track\Main\Source\LTI.IMF\LTI.IMF.Web";
    constructor(public importProcessService: ImportProcessService, public dialog: MatDialog) {
        //this.authenticationService.IsAuthorize("importProcess");
        //this.importProcessService.importProcess(this.fileUrl).subscribe(data => {
        //   alert(data);
        //}, error => {
        //    console.log(error);
        //});
    }
    //fileChange(event) {
    //    var formdata = new FormData();
    //    let fileList: FileList = event.target.files;
    //    if (fileList.length > 0) {
    //        let file: File = fileList[0];

    //        var reader = new FileReader();
    //        reader.readAsDataURL(fileList[0]);

    //        var fil = (event.srcElement || event.target).fileList[0];

    //    }
    //}
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.uploadFileToActivity();
    }
    uploadFileToActivity() {
        this.importProcessService.importProcess(this.fileToUpload).subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }
}

