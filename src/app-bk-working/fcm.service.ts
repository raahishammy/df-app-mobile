import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Platform } from '@ionic/angular';
// import { FCM } from '@awesome-cordova-plugins/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  
  url: string = 'https://disciplefirst.com/';

  constructor( 
    private platform: Platform, 
    private http: HttpClient,
    // private fcm: FCM 
  ) { }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      // token = await this.fcm.getToken();
      console.log("FCM Token ", token);
    }
    // this.saveFCMToken(token);
  }

  topicSubscription(topic = '') {
    /*this.fcm.subscribeToTopic(topic).then((res: any) => {
      console.log('Subscribed to topic: ' + topic, res);
    });*/
  }

  topicUnsubscription(topic = '') {
    /*this.fcm.unsubscribeFromTopic(topic).then((res: any) => {
      console.log('Unsubscribed from topic: ' + topic, res)
    });*/
  }

  onNotifications() {
    // return this.fcm.onNotification();
  }

  // private saveToken(token) {
  //   if (!token) return;
  //   // const devicesDatabaseReference = this.angularFirestore.collection('device-tokens');
  //   const data = {
  //     token,
  //     userId: 'user-' + new Date().toISOString(),
  //   };
  //   // return devicesDatabaseReference.doc(token).set(data);
  // }

  saveFCMToken(token = ''){
    const route = this.url + 'wp-json/disciplefirst2019-child/v1/update-fcm-token/';
    let data = {
      fcm_token: token
    };
    this.http.post(route, data, this.httpOptions).subscribe((val) => {
      console.log();
    });

  }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
}
