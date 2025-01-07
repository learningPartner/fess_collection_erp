import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(private http: HttpClient) { }

  get(url: string):Observable<T[]> {
    return this.http.get<T[]>("")
  }

  getSingle(url: string):Observable<T> {
    return this.http.get<T>("")
  }

  post(obj: T) {

  }
}
