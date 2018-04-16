import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SupplierProvider } from '../../providers/supplier/supplier';
import { CategoryProvider } from '../../providers/category/category';
import { ProductsProvider } from '../../providers/products/products';


@IonicPage()
@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage implements OnInit {
  @ViewChild('SupplierInput') SupplierInput;
  @ViewChild('CategoryInput') CategoryInput;
  @ViewChild('name') name;
  @ViewChild('barcode') barcode;
  @ViewChild('retail') retail;
  @ViewChild('cost') cost;
  @ViewChild('note') note;
  @ViewChild('amount') amount;
  @ViewChild('updatestock') updatestock;
  InputControl: FormGroup = null;
  BarcodeOK: boolean;
  DisableOKButton: boolean;
  supplier: number;
  category: number;
  product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ViewCtrl: ViewController, public formBuilder: FormBuilder, public Supplier: SupplierProvider, public Category: CategoryProvider, public product_provider: ProductsProvider, public toastCtrl: ToastController) {
    this.DisableOKButton = true;
    this.BarcodeOK = true;
    this.supplier = 1;
    this.category = 1;

  }
  ngOnInit(): void {
    this.InputControl = this.formBuilder.group({
      ProductName: ['', Validators.compose([Validators.required])],
      retail: ['', Validators.compose([Validators.required, minValidator(0)])],
      Barcode: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      cost: ['', Validators.compose([Validators.required, minValidator(0)])]
    });
  }
  GoBack() {
    this.ViewCtrl.dismiss();
  }

  OKButton() {
    var amount;
    if (this.updatestock.checked === true) {
      amount = this.amount.value;
    }
    else {
      amount = 0;
    }
    this.product = {
      name: this.name.value,
      barcode: this.barcode.value,
      retail: this.retail.value,
      cost: this.cost.value,
      amount: amount,
      supplier: this.supplier,
      category: this.category,
      note: this.note.value,
      updatestock: this.updatestock.checked
    }
    this.product_provider.insert_product(this.product).subscribe(data => {
      console.log(data);
      this.DisableOKButton = true;
      this.presentOKToast();
    }, err => {
      const error = JSON.parse(err._body);
      if (error['message'] == false) {
        this.DisableOKButton = true;
        this.BarcodeOK = false;
      }
      else {
        this.presentBADToast();
      }
    })
  }

  CheckOKbutton() {
    this.BarcodeOK = true;
    if (this.InputControl.controls.retail.errors == null && this.InputControl.controls.ProductName.errors == null && this.InputControl.controls.Barcode.errors == null && this.InputControl.controls.cost.errors == null && (!(this.updatestock.checked) || this.InputControl.controls.amount.errors == null)) {
      this.DisableOKButton = null;
    }
    else {
      this.DisableOKButton = true;
    }
  }
  onSelectedCategory(event) {
    this.category = event.category_code;
    console.log(this.category);
    this.CategoryInput.setValue(event.category_name);
  }

  onSelectedSupplier(event) {
    this.supplier = event.supplier_code;
    this.SupplierInput.setValue(event.supplier_name);
  }

  presentBADToast() {
    const toast = this.toastCtrl.create({
      message: 'אירעה תקלה, המוצר לא התווסף.',
      duration: 2500,
      position: 'bottom',
      cssClass: "showOKalert"
    });

    toast.present();
  }

  presentOKToast() {
    const toast = this.toastCtrl.create({
      message: 'המוצר נוצר בהצלחה.',
      duration: 2500,
      position: 'bottom',
      cssClass: "showOKalert"
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

}

export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value >= min)
      return null;
    return { "min": true };
  }
}
