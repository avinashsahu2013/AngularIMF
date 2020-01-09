import { Component, ViewChild, OnInit, HostListener } from '@angular/core'; 
import 'rxjs/add/operator/debounceTime';  
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from "@angular/router"; 
import { ToastrService } from 'ngx-toastr'; 
import { saveAs } from 'file-saver';
import { DashboardService } from '../../../services/dashboard.service';
import { Country } from '../../../Models/Country';
import { PeriodicElement } from '../../../Models/PeriodicElement';
import { MasterDataService } from '../../../services/MasterData.service'; 

@Component({
  selector: 'app-full-report',
  templateUrl: './full-report.component.html',
  styleUrls: ['./full-report.component.css']
})
export class FullReportComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI
  countries: any[]; 
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  datalist: any = [];

  obj: any = {}; 
 
countriesList: Country[]; 


 ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
displayedColumnsPeriodicElement: string[] = ['position', 'name', 'weight', 'symbol'];
dataSourcePeriodicElement = new MatTableDataSource(this.ELEMENT_DATA);



  constructor(
      public dashboardService: DashboardService,
      public masterDataService: MasterDataService,
      private router: Router, 
      private toastr: ToastrService, 
      public dialog: MatDialog 
  ) {

  }

  ngOnInit() { 
      console.log("Dashboard");
      this.masterDataService.getCountries().subscribe((data) => {
           this.countries = data;
           console.log(this.countries);
       });      

      // this.masterDataService.exportExcel().subscribe(res => { 
      //     let a:any = res;
      //     saveAs(a.body, 'Amenity.xlsx')
      // })
          
      this.countriesList = [
          new Country(1, 'USA' ),
          new Country(2, 'India' ),
          new Country(3, 'Australia' ),
          new Country(4, 'Brazil')
       ]; 

       this.dataSourcePeriodicElement.sort = this.sort;     

  }
  

  GetSelectedRow(row) {
      this.dashboardService.jobId = row.id;
      //this.NavigateToLog();

      this.router.navigate(['/log']);
  } 

  Print() {
   
  }

  GeneratePdf() {
      

  }

  DownloadPDF(data) {
 
  } 

  onMultipleDeleteSelection(Type, Flag) {
      
  }

  DeleteLog(row) {     
 
  }
 
}
  