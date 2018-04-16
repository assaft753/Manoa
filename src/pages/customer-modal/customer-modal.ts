import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsProvider } from '../../providers/clients/clients';

@IonicPage()
@Component({
  selector: 'page-customer-modal',
  templateUrl: 'customer-modal.html',
})
export class CustomerModalPage implements OnInit {
  @ViewChild('name') name;
  @ViewChild('city') city;
  @ViewChild('address') address;
  @ViewChild('cell') cell;
  @ViewChild('phone') phone;
  @ViewChild('id') id;
  @ViewChild('email') email;
  InputControl: FormGroup = null;
  DisableOKButton: boolean;
  client: any;

  ngOnInit(): void {
    this.InputControl = this.formBuilder.group({
      FullName: ['', Validators.compose([Validators.required])],
      ID: ['', Validators.compose([Validators.required])]
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public ViewCtrl: ViewController, public formBuilder: FormBuilder, public Clients: ClientsProvider) {
    this.DisableOKButton = true;
  }

  GoBack() {
    this.ViewCtrl.dismiss();
  }

  CheckOKbutton() {
    if (this.InputControl.controls.FullName.errors == null && this.InputControl.controls.ID.errors == null) {
      this.DisableOKButton = null;
    }
    else {
      this.DisableOKButton = true;
    }
  }

  OKButton() {
    this.client = {
      customer_name: this.name.value,
      customer_address: this.address.value,
      customer_city: this.city.value,
      customer_phone: this.phone.value,
      customer_cellular: this.cell.value,
      customer_idNumber: this.id.value,
      customer_email: this.email.value
    }
    this.Clients.insert_customer(this.client).subscribe(data => {
      this.client.customer_code = data[0].computed;
      this.ViewCtrl.dismiss(this.client);
    }
      , err => {
        console.log("err");
      });

  }

}
