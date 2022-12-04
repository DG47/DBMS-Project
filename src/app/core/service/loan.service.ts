import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Inventory} from "../model/inventory.model";
import {Observable} from "rxjs";
import {Loan} from "../model/loan.model";

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  domain: string = "http://localhost:8080/loan";


  constructor(private http: HttpClient) { }

  get(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.domain);
  }

  post(data: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.domain, data);
  }

  getLenders(): Observable<any> {
    return this.http.get("http://localhost:8080/lender")
  }
}
