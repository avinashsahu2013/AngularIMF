import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MenuItems } from '../shared/menu-items/menu-items';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: [],
}) 
export class FullComponent implements OnDestroy, AfterViewInit {
    mobileQuery: MediaQueryList;  
    version = "";
    server = ""; 
    isProd = false;  
  
  
  constructor(public menuItems: MenuItems) {
    //this.mobileQuery = media.matchMedia('(min-width: 768px)');
    //this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    //this.mobileQuery.addListener(this._mobileQueryListener);
    //authenticationService.getCurrentVersion().subscribe((data) => {
    //    this.version = data[0];
    //    console.log(window.location.host);  
    //    switch (window.location.host) {

    //        case "localhost":
    //            this.server = 'Local Dev. Machine';
    //            break;
                
    //        case "dnwkwswebs01":
    //        case "dev-sporttrack.cbs.com":
    //            this.server = 'Development System';
    //            break;

    //        case "awcsnwssptrk01":
    //        case "test-sporttrack.cbs.com":
    //            this.server = 'Test System';
    //            break;
                
    //        case "pwcsnwssptrk01":
    //        case "sporttrack.cbs.com":
    //        case "sporttrackweb.cbs.com":

    //            this.server = 'Production System';
    //            this.isProd = true;
    //            break;

    //        default:
    //            this.server = 'Unknown System';
    //    }
    //});
  }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 ngAfterViewInit() {
     
 } 
   
}
