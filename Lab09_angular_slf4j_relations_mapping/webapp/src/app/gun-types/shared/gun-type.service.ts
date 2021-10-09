import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GunType} from './gun-type.model';
import {GunProvider} from '../../gun-providers/shared/gun-provider.model';


@Injectable()
export class GunTypeService {
  private gunTypeUrl = 'http://localhost:8080/api/gun-types';
  private getAllGunProvidersUrl = 'http://localhost:8080/api/gun-providers';
  private filterGunTypeUrl = 'http://localhost:8080/api/gun-types/filter/';

  constructor(private httpClient: HttpClient) {
  }

  getGunTypes(): Observable<GunType[]> {
    return this.httpClient
      .get<Array<GunType>>(this.gunTypeUrl);
  }

  filterGunTypesByCategory(category: string): Observable<GunType[]> {
    return this.httpClient
      .get<Array<GunType>>(this.filterGunTypeUrl + category);
  }

  saveGunType(gunType: GunType): Observable<GunType> {
    console.log(gunType);
    return this.httpClient
      .post<GunType>(this.gunTypeUrl, gunType);
  }

  getGunProviders() {
    return this.httpClient
      .get<Array<GunProvider>>(this.getAllGunProvidersUrl);
  }

  deleteGunType(id: number): Observable<any> {
    const url = `${this.gunTypeUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
