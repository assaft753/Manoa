import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';

@Injectable()
export class CategoryProvider implements AutoCompleteService {

  constructor(public http: Http) {
  }

  getResults(keyword: string) {
    return this.http.get("http://31.154.2.206:90/api/category/category_name/name/" + keyword)
      .map(
      result => {
        return result.json()
      });
  }

}
