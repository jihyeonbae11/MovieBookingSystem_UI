import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";

export interface BookingList {
  bookingId: number;
  cinema: string;
  persons: number;
  showTime: string | number | Date;
  userId: string;
  movieName: string;
  // user: User;
  // movie: Movie;
}

const URL = '/dna/practice/bookinglist';

@Injectable()
export class BookingListService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(userId: string): Observable<BookingList> {
    return this.http.get<any>(`${URL}/${userId}`);
  }

  create(bookingList: BookingList): Observable<BookingList> {
    return this.http.post<any>(`${URL}`, bookingList);
  }

  update(bookingId: number, bookingList: BookingList): Observable<BookingList> {
    return this.http.put<any>(`${URL}/${bookingId}`, bookingList);
  }

  delete(bookingId: number): Observable<BookingList> {
    return this.http.delete<any>(`${URL}/${bookingId}`);
  }

}


