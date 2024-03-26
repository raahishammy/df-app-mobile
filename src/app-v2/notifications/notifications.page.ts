import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController} from '@ionic/angular';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

// import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { FcmService } from "../fcm.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notifications: string;
  isToggled:any;
  isMemoryVerse: any;
  isWeekly: any;
  isWeeklyGrowGroup: any;
  clickSub:any;
  
  constructor(
        private activatedRoute: ActivatedRoute,
        public toastCtrl: ToastController,
        // private localNotifications: LocalNotifications,
        private FcmService: FcmService
      ) 
    {
    
    let isToggledNotification = localStorage.getItem('daily_listen');
    if(isToggledNotification == "1"){
      this.isToggled = true;
    }else{
      this.isToggled = false;
    }
    
    let isMemoryVerseNotification = localStorage.getItem('daily_memory_versus');
    if(isMemoryVerseNotification == "1"){
      this.isMemoryVerse = true;
    }else{
      this.isMemoryVerse = false;
    }
    
    let isWeeklydNotification = localStorage.getItem('weekly_notifications');
    if(isWeeklydNotification == "1"){
      this.isWeekly = true;
    }else{
      this.isWeekly = false;
    }

    let isWeeklyGrowGroupdNotification = localStorage.getItem('group_notifications');
    if(isWeeklyGrowGroupdNotification == "1"){
      this.isWeeklyGrowGroup = true;
    }else{
      this.isWeeklyGrowGroup = false;
    }

  }
  
  public handleFCMtopicSubscription(subscribed, topic) {
    if (subscribed) {
      this.FcmService.topicSubscription(topic);
      localStorage.setItem(topic,"1");
    } else {
      this.FcmService.topicUnsubscription(topic);
      localStorage.setItem(topic,"");
    }
  }
  
  async presentToast(msg) {

    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      cssClass: 'normal-toast'
    });

    toast.present();

  }

  ngOnInit() {
    //this.notifications = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
