import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ccp } from '../model/ccp.model';

@Injectable({
  providedIn: 'root',
})
export class CcpService {
  httpClient: HttpClient;

  ccpsPath: string = 'assets/database-json/ccps-db.json';

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getCcps(): Observable<Ccp[]> {
    return this.httpClient.get<Ccp[]>(this.ccpsPath);
  }

  getCcp(ccpId: string | number): Observable<Ccp> {
    return this.httpClient.get<Ccp>(this.ccpsPath + '/' + ccpId);
  }

  createCcp(ccp: Ccp): Observable<Ccp> {
    return this.httpClient.post<Ccp>(this.ccpsPath, ccp);
  }

  deleteCcp(ccpId: string | number): Observable<any> {
    return this.httpClient.delete(this.ccpsPath + '/' + ccpId);
  }

  updateCcp(ccpId: string | number, changes: Partial<Ccp>): Observable<any> {
    return this.httpClient.put(this.ccpsPath + '/' + ccpId, changes);
  }
}
