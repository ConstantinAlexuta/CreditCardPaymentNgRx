import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ccp } from '../model/ccp.model';
import { CCPS_PATH } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class CcpService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getCcps(): Observable<Ccp[]> {
    return this.httpClient.get<Ccp[]>(CCPS_PATH);
  }

  getCcp(ccpId: string | number): Observable<Ccp> {
    return this.httpClient.get<Ccp>(CCPS_PATH + '/' + ccpId);
  }

  createCcp(ccp: Ccp): Observable<Ccp> {
    return this.httpClient.post<Ccp>(CCPS_PATH, ccp);
  }

  deleteCcp(ccpId: string | number): Observable<any> {
    return this.httpClient.delete(CCPS_PATH + '/' + ccpId);
  }

  updateCcp(ccpId: string | number, changes: Partial<Ccp>): Observable<any> {
    return this.httpClient.put(CCPS_PATH + '/' + ccpId, changes);
  }
}
