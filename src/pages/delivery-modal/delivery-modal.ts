import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-delivery-modal',
  templateUrl: 'delivery-modal.html',
})
export class DeliveryModalPage implements OnInit {
  @ViewChild('product_quantity') product_quantity: any;
  @ViewChild('product_price') product_price: any;
  product: any;
  DisableOKButton: boolean;
  InputControl: FormGroup = null;

  ngOnInit(): void {
    this.InputControl = this.formBuilder.group({
      product_quantity_check: ['', Validators.compose([Validators.required])],
      product_price_check: ['', Validators.compose([Validators.required, minValidator(0)])]
    });
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
    this.product = this.navParams.get("product");
    console.log(this.product);
    this.DisableOKButton = true;
  }

  CheckOKbutton() {
    if (this.InputControl.controls.product_price_check.errors === null && this.InputControl.controls.product_quantity_check.errors === null) {
      this.DisableOKButton = null;
    }
    else {
      this.DisableOKButton = true;
    }
  }

  GoBack() {
    this.viewCtrl.dismiss();
  }

  OKButton() {
    this.product.product_info.product_price = this.product_price.value;
    if (this.product_quantity.value === "") {
      this.product.amount = 0;
    }
    else {
      this.product.amount = this.product_quantity.value;
    }

    this.viewCtrl.dismiss({ product: this.product, Index: this.navParams.get("Index") });
  }
}

export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value >= min)
      return null;
    return { "min": true };
  }
}

export function maxValidator(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value <= max)
      return null;
    return { "max": true };
  }
}
