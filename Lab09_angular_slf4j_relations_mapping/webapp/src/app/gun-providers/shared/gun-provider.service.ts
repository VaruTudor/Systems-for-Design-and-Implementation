import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GunProvider} from './gun-provider.model';
import {Client} from '../../clients/shared/client.model';


@Injectable()
export class GunProviderService {
  private gunProviderUrl = 'http://localhost:8080/api/gun-providers';

  constructor(private httpClient: HttpClient) {
  }

  getGunProviders(): Observable<GunProvider[]> {
    return this.httpClient
      .get<Array<GunProvider>>(this.gunProviderUrl);
  }

  // getStudent(id: number): Observable<Student> {
  //   return this.getStudents()
  //     .pipe(
  //       map(students => students.find(student => student.id === id))
  //     );
  // }
  //
  // update(student): Observable<Student> {
  //   const url = `${this.studentsUrl}/${student.id}`;
  //   return this.httpClient
  //     .put<Student>(url, student);
  // }

  saveGunProvider(gunProvider: GunProvider): Observable<GunProvider> {
    return this.httpClient
      .post<GunProvider>(this.gunProviderUrl, gunProvider);
  }

  deleteGunProvider(selectedGunProviderId: number): Observable<any> {
    const url = `${this.gunProviderUrl}/${selectedGunProviderId}`;
    return this.httpClient
      .delete(url);
  }
}
