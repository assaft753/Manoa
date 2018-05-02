import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DeliveryProvider {

  customer_json: string;
  constructor(public http: Http) {
  }

  insert_product(customerId, note) {
    return this.http.get("http://31.154.2.206:90/api/delivery/insert_delivery/?customerid=" + customerId + "&note=" + note)
      .map(
      result => {
        return result.json();
      });
  }
  insert_product_details(products, deliveryId) {
    this.customer_json = JSON.stringify(products);
    return this.http.get("http://31.154.2.206:90/api/delivery/insert_delivery_details/?products=" + this.customer_json + "&deliveryid=" + deliveryId)
      .map(
      result => {
        return result.json();
      });
  }

  get_deliveries(customerid) {
    return this.http.get("http://31.154.2.206:90/api/delivery/delivery_name/customerid/" + customerid)
      .map(
      result => {
        return result.json();
      });
  }
}
