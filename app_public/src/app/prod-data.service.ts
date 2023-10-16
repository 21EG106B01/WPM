import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './home-list/home-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProdDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getProducts(): Promise<Product[]> {
    const url: string = `${this.apiBaseUrl}/products`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error("Angular Retrieval Error: " + error);
    return Promise.reject(error.message | error);
  }
}
