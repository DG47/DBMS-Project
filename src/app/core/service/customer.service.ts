import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  domain: string = "http://localhost:8080/customer";

  constructor(private http: HttpClient) { }


  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.domain);
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.domain + "/" + id);
  }

  post(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.domain, data);
  }

  update(id: string, data: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.domain + "/" + id, data)
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }
}
