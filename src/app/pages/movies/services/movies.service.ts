import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";
import {Employee} from "../../employee/services/employee.service";

export interface Movie {
  movieId: number;
  movieName: string;
  director: string;
  genre: string;
  viewingLevel: string;
}

const URL = '/dna/practice/movies';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(movieId: number): Observable<Movie> {
    return this.http.get<any>(`${URL}/${movieId}`);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<any>(`${URL}`, movie);
  }

  update(movieId: number, movie: Movie): Observable<Employee> {
    return this.http.put<any>(`${URL}/${movieId}`, movie);
  }

  delete(movieId: number): Observable<Movie> {
    return this.http.delete<any>(`${URL}/${movieId}`);
  }



}


