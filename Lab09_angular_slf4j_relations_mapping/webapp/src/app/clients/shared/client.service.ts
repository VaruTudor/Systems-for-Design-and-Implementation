import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Client} from './client.model';
import {GunType} from '../../gun-types/shared/gun-type.model';


@Injectable()
export class ClientService {
  private clientsUrl = 'http://localhost:8080/api/clients';

  constructor(private httpClient: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    return this.httpClient
      .get<Array<Client>>(this.clientsUrl);
  }

  getClient(id: number): Observable<Client> {
    return this.getClients()
      .pipe(
        map(clients => clients.find(clients => clients.id === id))
      );
  }

  getGunTypesOfClient(id: number): Observable<GunType[]> {
    const url = `${this.clientsUrl}/gun-types/${id}`;
    return this.httpClient
      .get<Array<GunType>>(url);
  }

  addGunTypeToClient(id: number,
                     name: string,
                     price: number): Observable<GunType> {
    const url = `${this.clientsUrl}/gun-types/${id}`;
    const data = {name: name, price: price};
    console.log(id, data);
    return this.httpClient
      .post<GunType>(url, data);
  }

  update(client: Client): Observable<Client> {
    const url = `${this.clientsUrl}/${client.id}`;
    return this.httpClient
      .put<Client>(url, client);
  }

  saveClient(client: Client): Observable<Client> {
    return this.httpClient
      .post<Client>(this.clientsUrl, client);
  }

  deleteClient(id: number): Observable<any> {
    const url = `${this.clientsUrl}/${id}`;
    return this.httpClient
      .delete(url);
  }

}
