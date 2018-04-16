import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';

@Injectable()
export class ClientsProvider implements AutoCompleteService {
  temp: any;
  constructor(private http: Http) {
  }

  getResults(keyword: string) {
    return this.http.get("http://31.154.2.206:90/api/customer/by_name/name/" + keyword)
      .map(
      result => {
        return result.json()
      });

  }

  insert_customer(customer) {
    this.temp = JSON.stringify(customer);
    return this.http.get("http://31.154.2.206:90/api/customer/insert_customer/?customer=" + this.temp)
      .map(
      result => {
        return result.json();
      });
  }



}
