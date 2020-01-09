import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class DashboardService {
    apiUrl: string = "http://localhost:54069/api/values/";
    jobId: any;
    
    constructor(private _http: HttpClient) {

    }

    getFullReport(postObject: any): Observable<any[]> { 
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            })
        }  
        const person: any = {Id: 202, Name: 'Thaliva'}
        return this._http.post<any[]>(this.apiUrl + 'callPost', person, httpOptions);
    }  

    getdatatape(obj: any, limit, offset, ) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'getdatatape?limit=' + limit + '&offset=' + offset, obj);
    }

    getDataTapeByCodeStory(obj: any, limit, offset) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'GetDataTapeByCodeStory?limit=' + limit + '&offset=' + offset, obj);
    }

    DeleteDataTape(jobIds) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'DeleteDataTape', jobIds, { headers: headers });
    }

    Search(searchText: any, searchColumn: any) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiUrl + 'Search?searchText=' + searchText + '&searchColumn=' + searchColumn);
    }
    GeneratePdfDataTapeList(obj: any, totRecord) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'GeneratePdfDataTapeList?totRecord=' + totRecord, obj);
    }
}
