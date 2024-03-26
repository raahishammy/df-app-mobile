import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  url: string = 'https://disciplefirst.herokuapp.com/https://disciplefirst.com/'
  responseData:any;
  loading:any;

  constructor(
    private activatedRoute: ActivatedRoute,
      public http: HttpClient,
      public Router: Router,
      public toastCtrl: ToastController,
      public LoadingController: LoadingController,
      public theInAppBrowser: InAppBrowser
  ) { }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      duration: 7000
    });
        return await this.loading.present();
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
  

      // Http Options
    httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        })
    }

    register(form){
      this.presentLoading();
      //console.log(form.value);
      let formData = {"username":form.value.username, "email":form.value.email, "password":form.value.password};

      const route = this.url + 'wp-json/disciplefirst2019-child/v1/register'
      return this.http.post(route, JSON.stringify(formData), this.httpOptions).subscribe(res => {      
        this.responseData = res;
        console.log(this.responseData);
        this.presentToast("User registered successfully..");
        this.Router.navigate(['login']);
        // this.Router.navigate(['home']).then(() => {
        //   window.location.reload();
        // });
        
        this.loading.dismiss();
      },
      error => {
        this.presentToast("Error: " + error.error.message);
        // console.log("Something went wrong", error.error.message);
        this.loading.dismiss();
      });
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
  }

}
