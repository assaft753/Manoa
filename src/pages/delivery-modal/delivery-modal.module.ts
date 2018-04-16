import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryModalPage } from './delivery-modal';

@NgModule({
  declarations: [
    DeliveryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryModalPage),
  ],
})
export class DeliveryModalPageModule {}
