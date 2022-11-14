import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";

export interface User {
  userId: string;
  pw: string;
  email: string;
  birth: string | number | Date;
}

const URL = '/dna/practice/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}/list`, {params: params as any});
  }

  find(userId: string): Observable<User> {
    return this.http.get<any>(`${URL}/${userId}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<any>(`${URL}`, user);
  }

  update(userId: string, user: User): Observable<User> {
    return this.http.put<any>(`${URL}/${userId}`, user);
  }

  delete(userId: string): Observable<User> {
    return this.http.delete<any>(`${URL}/${userId}`);
  }



}


