import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DeliveryPage } from '../pages/delivery/delivery';
import { DeliveryModalPage } from '../pages/delivery-modal/delivery-modal';
import { CustomerModalPage } from '../pages/customer-modal/customer-modal';
import { DeliveryDetailsPage } from '../pages/delivery-details/delivery-details';
import { ProductModalPage } from '../pages/product-modal/product-modal';
import { DebtsPage } from '../pages/debts/debts';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { ClientsProvider } from '../providers/clients/clients';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductsProvider } from '../providers/products/products';
import { DeliveryProvider } from '../providers/delivery/delivery';
import { SupplierProvider } from '../providers/supplier/supplier';
import { CategoryProvider } from '../providers/category/category';
import { DebtsProvider } from '../providers/debts/debts';
import { WheelSelector } from '@ionic-native/wheel-selector';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DeliveryPage,
    DeliveryModalPage,
    CustomerModalPage,
    ProductModalPage,
    DebtsPage,
    DeliveryDetailsPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    HttpModule,
    Ng2SmartTableModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DeliveryPage,
    DeliveryModalPage,
    CustomerModalPage,
    ProductModalPage,
    DebtsPage,
    DeliveryDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ClientsProvider,
    ProductsProvider,
    DeliveryProvider,
    SupplierProvider,
    CategoryProvider,
    DebtsProvider,
    WheelSelector
  ]
})
export class AppModule { }
