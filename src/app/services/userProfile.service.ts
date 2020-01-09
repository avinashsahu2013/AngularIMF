import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable({ providedIn: "root" })
export class UserProfileService {

    apiUrl: string = "api/Security/";

    constructor(private _http: HttpClient) {
    }

    getSecurityProfiles() {
        return this._http.get(this.apiUrl + 'GetSecurityProfiles');
    }

    saveUser(objUser) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'Save', objUser, { headers: headers });
    }

    deleteUser(userId) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'Delete?id=' + userId, { headers: headers });
    }

}