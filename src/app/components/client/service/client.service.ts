import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable()
export class ClientService {
  httpClient: HttpClient;

  clientsPath: string = 'assets/database-json/clients-db.json';

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.clientsPath);
  }

  getClient(clientId: string | number): Observable<Client> {
    return this.httpClient.get<Client>(this.clientsPath + '/' + clientId);
  }

  createClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.clientsPath, client);
  }

  deleteClient(clientId: string | number): Observable<any> {
    return this.httpClient.delete(this.clientsPath + '/' + clientId);
  }

  updateClient(
    clientId: string | number,
    changes: Partial<Client>
  ): Observable<any> {
    return this.httpClient.put(this.clientsPath + '/' + clientId, changes);
  }
}
