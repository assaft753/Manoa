import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { DeliveryPage } from '../delivery/delivery';
import { CustomerModalPage } from '../customer-modal/customer-modal';
import { ProductModalPage } from '../product-modal/product-modal';
import { DebtsProvider } from '../../providers/debts/debts';
import { DebtsPage } from '../debts/debts';
import { DeliveryProvider } from '../../providers/delivery/delivery';
import { DeliveryDetailsPage } from '../delivery-details/delivery-details';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  client: any;
  @ViewChild('AutoInput') AutoInput: AutoCompleteComponent;

  constructor(public Deliveries: DeliveryProvider, public alertCtrl: AlertController, public navCtrl: NavController, public Clients: ClientsProvider, public ModalCtrl: ModalController, public Debts: DebtsProvider) {
  }
  ShowDeliveryPage() {
    this.navCtrl.push(DeliveryPage, this.client);
  }

  onSelectedClient(event) {
    console.log(event);
    this.client = event;
    this.AutoInput.setValue(this.client.customer_name);
  }

  OpenModalCustomer() {
    const modal = this.ModalCtrl.create(CustomerModalPage, null, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.onDidDismiss(data => {
      if (data != null) {
        this.onSelectedClient(data);
      }
    });
    modal.present();
  }
  OpenModalProduct() {
    const modal = this.ModalCtrl.create(ProductModalPage, null, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.onDidDismiss(data => {
      if (data != null) {
        console.log(data);
      }
    });
    modal.present();
  }

  ShowDebtsPage() {
    /*this.Debts.get_debts(this.client.customer_code, new Date().getFullYear()).subscribe(debts => 
      {*/
    //this.navCtrl.push(DebtsPage, { debts: debts, client: this.client });
    //  }, 
    //err => 
    //{
    /*if (err.json().message === "THERE_ARE_NO_DEBTS_MSG") {
      this.presentAlert('בהנה"ח', 'אין חובות ללקוח');*/
    this.navCtrl.push(DebtsPage, { client: this.client });
    //}
    //})
  }

  presentAlert(title: string, text: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK'],
      cssClass: 'showOKalert'
    });
    alert.present();
  }
  ShowDeliveryDetailsPage() {
    this.Deliveries.get_deliveries(this.client.customer_code).subscribe(deliveries_details => {
      this.navCtrl.push(DeliveryDetailsPage, { client: this.client, deliveries: deliveries_details })
    }, err => {
      if (err.json().message === 'NO_DELIVERIES_MSG') {
        this.presentAlert('תעודת משלוח', 'אין תעודות ללקוח זה');
      }
    })
  }

}
