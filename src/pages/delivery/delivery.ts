import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { DeliveryProvider } from '../../providers/delivery/delivery';
import { DeliveryModalPage } from '../delivery-modal/delivery-modal';

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  client: any;
  productsArr: any[];
  alert: any;
  disableButton: boolean;
  @ViewChild('AutoInput') AutoInput: AutoCompleteComponent;
  @ViewChild('note') note;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Products: ProductsProvider, public delivery: DeliveryProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.client = this.navParams.data;
    this.productsArr = [];
  }

  onSelectedProduct(event) {
    var duplicate = false;
    for (var i = 0; i < this.productsArr.length && duplicate == false; i++) {
      if (this.productsArr[i].product_info.product_code === event.product_code) {
        duplicate = true;
      }
    }
    if (duplicate == false) {
      event.product_price = event.product_price.toFixed(2)
      this.productsArr.push({ product_info: event, amount: 1 });
    }
    this.AutoInput.clearValue();
  }

  Remove_Product(i, item) {
    this.productsArr.splice(i, 1);
  }
  Edit_Product(i, item) {
    this.presentDeliveryEditModal(i);
    item.close();
  }

  insert_delivery() {
    this.delivery.insert_product(this.client.customer_code,this.note.value).toPromise().then(deliveryid => {
      this.delivery.insert_product_details(this.productsArr, deliveryid).subscribe(res => {
        this.disableButton = true;
        this.presentOKToast();
      }
        , err => {//delivery_details
          this.presentBADToast();
        })
    }).catch(err => {//delivery
      this.presentBADToast();
    })
  }

  presentBADToast() {
    const toast = this.toastCtrl.create({
      message: '.אירעה תקלה, התעודה לא נוצרה',
      duration: 2500,
      position: 'bottom',
      cssClass: "showOKalert"
    });

    toast.present();
  }

  presentOKToast() {
    const toast = this.toastCtrl.create({
      message: '.תעודת המשלוח נוצרה בהצלחה',
      duration: 2500,
      position: 'bottom',
      cssClass: "showOKalert"
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

  presentDeliveryEditModal(index) {
    const DeliveryEditModal = this.modalCtrl.create(DeliveryModalPage, { product: this.productsArr[index], Index: index }, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    DeliveryEditModal.onDidDismiss(data => {
      if (data != null) {
        this.productsArr[data.Index] = data.product;
      }
    });

    DeliveryEditModal.present();
  }

}
