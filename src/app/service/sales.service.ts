import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sales} from "../core/model/sales.model";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  domain: string = "http://localhost:8080/sales";

  constructor(private http: HttpClient) { }


  get(): Observable<Sales[]> {
    return this.http.get<Sales[]>(this.domain);
  }

  getById(id: string): Observable<Sales> {
    return this.http.get<Sales>(this.domain + "/" + id);
  }

  post(data: Sales): Observable<Sales> {
    return this.http.post<Sales>(this.domain, data);
  }

  update(id: string, data: Sales): Observable<Sales> {
    return this.http.post<Sales>(this.domain + "/" + id, data)
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }
}
