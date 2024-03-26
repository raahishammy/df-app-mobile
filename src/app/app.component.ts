import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { FcmService } from "../app/fcm.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
  userDataLocal =  localStorage.getItem('userData');
  userData =  null;
  memory_verses: any;
  memoryData: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home/',
      icon: 'paper-plane'
    },
    {
      title: 'About',
      url: '/about/About',
      icon: 'paper-plane'
    },
    {
      title: 'Digital Resources',
      url: '/resources/',
      icon: 'paper-plane'
    },
    {
      title: 'Blog',
      url: '/blog/',
      icon: 'archive'
    },
    {
      title: 'Contact Us',
      url: '/contact/',
      icon: 'mail'
    },
    
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  loading:any;
  isAbout:any;

  fontClass: any = '';

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public http: HttpClient,
    public Router: Router,
    public LoadingController: LoadingController,
    public theInAppBrowser: InAppBrowser,
    // private FcmService: FcmService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController
  ) {
    
    platform.ready().then(() => {
      this.userData = (this.userDataLocal!== null ) ? JSON.parse(this.userDataLocal) : null;
      this.initializeApp();
      // this.notificationsSetting();
      // this.notificationSetup();
    });
  }

  /*private notificationsSetting(){
    console.log("firstRun", localStorage.getItem("firstRun"));
    if(localStorage.getItem("firstRun") == null){
      
      this.FcmService.topicSubscription("announcements");

      this.FcmService.topicSubscription("daily_listen");
      localStorage.setItem("daily_listen", "1");

      this.FcmService.topicSubscription("daily_memory_versus");
      localStorage.setItem("daily_memory_versus", "1");

      this.FcmService.topicSubscription("weekly_notifications");
      localStorage.setItem("weekly_notifications", "1");

      this.FcmService.topicSubscription("group_notifications");
      localStorage.setItem("group_notifications", "1");

      localStorage.setItem("firstRun", "1");
    }
  }*/
  /*private notificationSetup() {
    this.FcmService.getToken();
    this.FcmService.onNotifications().subscribe(
      (data) => {
        if(data.wasTapped){
          console.log("Recived in Background");
        }else{
          this.presentToast(data.body);
          console.log("Recived in Frontend", data);
        }
    });
  }*/

initializeApp() {
  this.platform.ready().then(() => {
    // this.splashScreen.hide();
    this.statusBar.styleDefault();
    var fontClassValue = localStorage.getItem("fontClass");
    console.log("fontClassValue ", fontClassValue);
    if(fontClassValue == '')
      fontClassValue = 'normal';

    this.fontClass = 'fs-'+fontClassValue;
  });
}
async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      duration: 1000
    });
    return await this.loading.present();
}

async presentToast(msg = '') {
  let toast = await this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'bottom',
    cssClass: 'normal-toast'
  });

  toast.present();
}
    
public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
}  
  
  logout(){
    this.presentLoading();
    localStorage.removeItem('userData');
    this.Router.navigate(['home']).then(() => {
        window.location.reload();
      });
    console.log("user logged out successfully..");
  }
  
  /*pageload(){
     this.Router.navigate(['home']).then(() => {
        window.location.reload();
      }); 
  }*/

  gotoHomePage (pageLink) {
    this.navCtrl.navigateForward(pageLink);
  }
  
  gotoLogin() {
    this.Router.navigate(["login"]);
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  updateFontSizeClass(className = ''){
    if(className != ''){
      localStorage.setItem("fontClass", className);
      window.location.reload();
    }
  }

  async fontManager() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Font Size',
      cssClass: 'font-manager-actions',
      buttons: [
        {
          text: 'Larger',
          // icon: 'trash',
          handler: () => { 
            this.updateFontSizeClass('larger');
          }
        },
        {
          text: 'Medium',
          // icon: 'share',
          handler: () => {
            this.updateFontSizeClass('medium');
          },
        },
        // {
        //   text: 'Normal',
        //   icon: 'caret-forward-circle',
        //   handler: () => {
        //     this.updateFontSizeClass('normal');
        //   },
        // },
        {
          text: 'Small',
          // icon: 'heart',
          handler: () => {
            this.updateFontSizeClass('small');
          },
        },
        {
          text: 'Cancel',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
