import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class MasterDataService {

    apiUrl: string = "http://localhost:54069/api/masterData/";

    constructor(private _http: HttpClient) {
    }

    getCountries(): Observable<any[]> {
        return this._http.get<any[]>(this.apiUrl + 'getCountries');
    }   

    exportExcel() :any     {
        let url_ = this.apiUrl + "ExportExcel";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };
        return this._http.request("post",url_, options_);

    }


    //getCountries(){
    //        this._http.get(this.apiUrl + 'getCountries').subscribe((data) => {                
    //                return data;                
    //        }, error => {
    //        window.location.reload();
    //    });
    //}

    //saveUser(objUser) {
    //    let headers = new HttpHeaders();
    //    headers = headers.set('Content-Type', 'application/json');
    //    return this._http.post(this.apiUrl + 'Save', objUser, { headers: headers });
    //}

    //deleteUser(userId) {
    //    let headers = new HttpHeaders();
    //    headers = headers.set('Content-Type', 'application/json');
    //    return this._http.post(this.apiUrl + 'Delete?id=' + userId, { headers: headers });
    //}

}