import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Inventory} from "../core/model/inventory.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  domain: string = "http://localhost:8080/inventory";

  constructor(private http: HttpClient) { }


  get(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.domain);
  }

  getById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(this.domain + "/" + id);
  }

  post(data: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.domain, data);
  }

  update(id: string, data: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.domain + "/" + id, data)
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(this.domain + "/" + id);
  }

}
