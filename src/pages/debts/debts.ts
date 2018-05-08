import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage {
  year: number;
  years: Number[];
  client: any = null;
  debts: any = null;
  hova: number = 0;
  zikui: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.years=new Array<Number>();
    this.year=new Date().getFullYear();
    for(var i=2016;i<=this.year;i++)
    {
      this.years.push(i);
    }
    let data = this.navParams.data;
    this.client = data.client;
    if (data.debts != null) {
      this.debts = data.debts.debts_arr;
      this.hova = data.debts.hova;
      this.zikui = data.debts.zikui;
    }
  }

}
