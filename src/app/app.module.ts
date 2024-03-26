import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";
import { InAppBrowser} from '@awesome-cordova-plugins/in-app-browser/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
// import { FcmService } from "../app/fcm.service";
// import { FCM } from '@awesome-cordova-plugins/fcm/ngx';

import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  // entryComponents: [],
  imports: [
    BrowserModule, HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    // SplashScreen,
    // InAppBrowser,LocalNotifications,BarcodeScanner,Network,FCM,
    // InAppBrowser,BarcodeScanner,Network,FCM, FcmService,
    InAppBrowser,BarcodeScanner,Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
