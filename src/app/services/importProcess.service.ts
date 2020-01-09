import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class ImportProcessService {
    apiUrl: string = "api/importProcess/";
    constructor(private _http: HttpClient) {

    }  
    importProcess(filedata){
        const endpoint = "api/importProcess/uploadFile";
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http
            .post(endpoint, filedata, { headers: headers });
    }
    logExist(logCode) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiUrl + 'logExist?logCode=' + logCode);
    }
}
