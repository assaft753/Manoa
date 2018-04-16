import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage {

  client: any;
  debts: any;
  hova: number;
  zikui: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = this.navParams.data.client;
    this.debts = this.navParams.data.debts.debts_arr;
    this.hova = this.navParams.data.debts.hova;
    this.zikui = this.navParams.data.debts.zikui;
  }

}
