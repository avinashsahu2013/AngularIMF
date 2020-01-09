import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardDataServiceService {

    constructor() { }
    logcode: any;
    tapeTitle: any;
    loggedBy: any;
    subtitle: any;
    producer: any;
    venue: any;
    director: any;
    location: any;
    other: any;
    reelNumber: any;
    showCode: any;
    airDate: any = null;
    shootDate: any = null;
    selectedLog: any = "Logs";
    searchType: any = "AND";
    BytextCode: any = true;
    storyCode: any;
    shootFrom1: any = null;
    shootFrom2: any = null;
    shootFrom3: any = null;
    shootFrom4: any = null;
    shootTo1: any = null;
    shootTo2: any = null;
    shootTo3: any = null;
    shootTo4: any = null;

    totalCount = 0;
    totalCountLog = 0;
    limit = 20;
    offset = 0;
    endSearch = false;
    DataTapeLogLimit = 20;
    DataTapeLogOffset = 0;
    DataTapeLogendSearch = false;
    datalist: any = [];
    datalistDataTapeLogend: any = [];

    IsPrintDisable = true;

    isSearch: any = false;
}
