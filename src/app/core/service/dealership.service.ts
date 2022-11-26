import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {Dealership} from "../model/dealership.model";

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

  domain: string = "http://localhost:8080/dealership";

  constructor(private http: HttpClient) { }


  get(): Observable<Dealership[]> {
    return this.http.get<Dealership[]>(this.domain);
  }

  getById(id: string): Observable<Dealership> {
    return this.http.get<Dealership>(this.domain + "/" + id);
  }

  post(data: Dealership): Observable<Dealership> {
    return this.http.post<Dealership>(this.domain, data);
  }

  update(id: string, data: Dealership): Observable<Dealership> {
    return this.http.post<Dealership>(this.domain + "/" + id, data)
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }
}
