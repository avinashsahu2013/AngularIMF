import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class LogDetailService {
    apiUrl: string = "api/datatape/";
    apiLogUrl: string = "api/log/";
    jobId: any;
    constructor(private _http: HttpClient) {

    }

    getTapeDetails(jobId, limit, offset, isLoadAll) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiUrl + 'GetTapedetails?jobId=' + jobId + '&limit=' + limit + '&offset=' + offset + '&isLoadAll=' + isLoadAll);
    }

    saveLog(objLog) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiLogUrl + 'SaveLog', objLog, { headers: headers });
    }

    deleteLog(logId) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiLogUrl + 'DeleteLog?id=' + logId, { headers: headers });
    }

    saveDataTape(objDataTape) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'SaveDataTape', objDataTape, { headers: headers });
    }

    getCodes() {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiLogUrl + 'GetCodes');
    }

    getAvailableSequence(id, jobId, time, interval) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiLogUrl + "GetAvailableSequence?id=" + id + "&jobId=" + jobId + "&time=" + time + "&interval=" + interval);
    }

    ValidateTime(jobId, time) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this._http.get(this.apiLogUrl + "ValidateTime?jobId=" + jobId + "&time=" + time);
    }
}
