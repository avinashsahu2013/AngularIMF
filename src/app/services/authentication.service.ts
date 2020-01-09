//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';

//@Injectable({ providedIn: "root" })
//export class AuthenticationService {

//    apiUrl: string = "api/Security/";
//    currentData: any;

//    constructor(private _http: HttpClient, public route: Router) {
//    }

//    getCurrentUser() {
//        this._http.get(this.apiUrl + 'authorize').subscribe((data) => {
//            if (data != null) {
//                this.currentData = data;
//            }
//        }, error => {
//            window.location.reload();
//        });
//    }

//    keepAlive() {
//        return this._http.get(this.apiUrl + 'KeepAlive');
//    }


//    getCurrentAuthentication() {
//        return this._http.get(this.apiUrl + 'authorize');
//    }

//    getCurrentVersion() {
//        return this._http.get(this.apiUrl + 'version');
//    }

//    IsAllowedToVisible(): boolean {
//        if (this.currentData != undefined && this.currentData.length != 0) {
//            if (this.currentData.isAdmin == true) {
//                return true;
//            }
//            else {
//                return false;
//            }
//        }
//        else {
//            setTimeout(x => {
//                if (this.currentData.isAdmin == true) {
//                    return true;
//                }
//                return false
//            }, 2000);
//        }
//    }


//    IsAuthorize(section) {
//        let time = 0;
//        if (this.currentData === undefined) {
//            time = 5000;
//        }
//        setTimeout(x => {
//            if (this.currentData.authenticated == false) {
//                return false;
//            }
//            else {
//                if ((section.includes("userProfile") || section.includes("importProcess")) && this.IsAllowedToVisible() === false) {
//                    this.route.navigate(["/accessdenied"]);
//                }
//            }
//        }, time);
//    }
//}