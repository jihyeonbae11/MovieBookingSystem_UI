import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";
import {Movie} from "../../movies/services/movies.service";
import {User} from "../../user/services/user.service";

export interface Booking {
  bookingId: number;
  userId: string;
  movieId: number;
  movie: Movie;
  user: User;
  cinema: string;
  persons: number;
  showTime: string | number | Date;
}

const URL = '/dna/practice/booking';

@Injectable()
export class BookingsService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}/list`, {params: params as any});
  }

  find(bookingId: number): Observable<Booking> {
    return this.http.get<any>(`${URL}/${bookingId}`);
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<any>(`${URL}`, booking);
  }

  update(bookingId: number, booking: Booking): Observable<Booking> {
    return this.http.put<any>(`${URL}/${bookingId}`, booking);
  }

  delete(bookingId: number): Observable<Booking> {
    return this.http.delete<any>(`${URL}/${bookingId}`);
  }

}
