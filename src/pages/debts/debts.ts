import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { DebtsProvider } from '../../providers/debts/debts';


@IonicPage()
@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage implements AfterViewInit {
  year: number;
  years: any;
  client: any = null;
  debts: any = null;
  hova: number = 0;
  zikui: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, private debtsProvider: DebtsProvider) {
    this.years = new Array();
    this.year = new Date().getFullYear();
    for (var i = 2016; i <= this.year; i++) {
      this.years.push({ description: i });
    }
    this.client = this.navParams.data.client;

  }

  ngAfterViewInit(): void {
    this.debtsProvider.get_debts(this.client.customer_code).subscribe(
      data => {
        this.UpdateDebtsUI(data);
        this.debtsProvider.get_debts_details(this.client.customer_code, this.year).subscribe(
          data => this.UpdateDebtsDetailsUI(data),
          err => this.UpdateDebtsDetailsUI(null)
        );

      },
      err => this.UpdateDebtsUI(null)
    );
  }

  ChooseYear() {
    this.selector.show({
      title: "בחר שנה",
      items: [
        this.years
      ],
    }).then(
      result => {
        this.year = result[0].description;
        this.debtsProvider.get_debts_details(this.client.customer_code, this.year).subscribe(
          data => this.UpdateDebtsDetailsUI(data),
          err => this.UpdateDebtsDetailsUI(null));
      });
  }
  UpdateDebtsUI(data) {
    if (data != null) {
      this.debts = data.debts_arr;
      this.hova = data.hova;
    }
    else {
      this.hova = 0;
      this.zikui = 0;
    }
  }
  UpdateDebtsDetailsUI(data) {
    if (data != null) {
      this.debts = data.debts_arr;
    }
    else {
      this.debts = null;
    }
  }
}
