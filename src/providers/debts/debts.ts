import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DebtsProvider {

  constructor(public http: Http) {
  }

  get_debts(customerid, year) {
    return this.http.get("http://31.154.2.206:90/api/debts/by_costumer/costumer/" + customerid + "/year/" + year).map(res => {
      return res.json();
    });
  }

}
