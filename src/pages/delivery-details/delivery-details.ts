import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-delivery-details',
  templateUrl: 'delivery-details.html',
})
export class DeliveryDetailsPage {
  client: any;
  deliveries: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = this.navParams.get('client');
    this.deliveries = this.navParams.get('deliveries');
    console.log(this.deliveries);
  }

}
