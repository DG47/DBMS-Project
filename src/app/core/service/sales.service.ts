import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sales} from "../model/sales.model";

@Injectable({
  providedIn: 'root'
})

export class SalesService {
  domain: string = "http://localhost:8080/sales";

  constructor(private http: HttpClient) { }

  get(): Observable<Sales[]> {
    return this.http.get<Sales[]>(this.domain);
  }

  get_sales_details(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/sales-detail");
  }

  get_salesperson_agg(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/sales-detail/agg/sales-person");
  }

  get_dealership_agg(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/sales-detail/agg/dealership");
  }

  get_region_agg(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/sales-detail/agg/region");
  }

  get_lender_agg(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/sales-detail/agg/lender");
  }

  getById(id: string): Observable<Sales> {
    return this.http.get<Sales>(this.domain + "/" + id);
  }

  post(data: Sales): Observable<Sales> {
    return this.http.post<Sales>(this.domain, data);
  }

  update(id: string, data: Sales): Observable<Sales> {
    return this.http.post<Sales>(this.domain + "/" + id, data);
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }

  getSalesPerson(id: string): Observable<any> {
    return this.http.get(this.domain + "person/" + id);
  }
}

