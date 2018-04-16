import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';


@Injectable()
export class ProductsProvider implements AutoCompleteService {
  temp: any;
  constructor(public http: Http) {
  }

  getResults(keyword: string) {
    return this.http.get("http://31.154.2.206:90/api/product/by_name/name/" + keyword)
      .map(
      result => {
        return result.json()
      });
  }

  insert_product(product) {
    this.temp = JSON.stringify(product);
    return this.http.get("http://31.154.2.206:90/api/product/insert_product/?product=" + this.temp)
      .map(
      result => {
        return result.json();
      });
  }

}
