import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  domain: string = "http://localhost:8080/employee";

  constructor(private http: HttpClient) { }

  get(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.domain);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.domain + "/" + id);
  }

  post(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.domain, data);
  }

  update(id: string, data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.domain + "/" + id, data)
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }
}
