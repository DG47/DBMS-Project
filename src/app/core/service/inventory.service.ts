import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inventory} from "../model/inventory.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  domain: string = "http://localhost:8080/inventory";

  constructor(private http: HttpClient) {
  }


  get(pageIndex: number, pageSize: number, minPrice: number, maxPrice: number, minMileage: number, maxMileage: number, transmissionToggle: string[], driveToggle: string[], fuelToggle: string[], dealershipToggle: string[], sortBy: string, sortDir: string, make: string): Observable<Inventory[]> {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    params = params.append('minPrice', minPrice);
    params = params.append('maxPrice', maxPrice);
    params = params.append('minMileage', minMileage);
    params = params.append('maxMileage', maxMileage);
    params = params.append('transmissionToggle', transmissionToggle.toString());
    params = params.append('driveToggle', driveToggle.toString());
    params = params.append('fuelToggle', fuelToggle.toString());
    params = params.append('dealershipToggle', dealershipToggle.toString());
    params = params.append('sortBy', sortBy);
    params = params.append('sortDir', sortDir);
    params = params.append('make', make);
    return this.http.get<Inventory[]>(this.domain, {params: params});
  }

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(this.domain + "/makes");
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
