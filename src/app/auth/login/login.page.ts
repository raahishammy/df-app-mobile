import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  url: string = 'https://disciplefirst.herokuapp.com/https://disciplefirst.com/'
  responseData:any;
  loading:any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
      public http: HttpClient,
      public Router: Router,
      public toastCtrl: ToastController,
      public LoadingController: LoadingController
  ) { 

    }
  
    async presentLoading() {
        this.loading = await this.LoadingController.create({
          //content: '',
          duration: 7000
        });
        return await this.loading.present();
    }

      // Http Options
    httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        })
    }
  

    login(form: { value: { username: any; password: any; }; }){
        this.presentLoading();
        //console.log(form.value);
        let formData = {"username":form.value.username, "password":form.value.password};
        console.log(formData);
        const route = this.url + 'wp-json/disciplefirst2019-child/v1/authenticate'
        return this.http.post(route, JSON.stringify(formData), this.httpOptions).subscribe({
          next: (res) => {
            this.responseData = res;
            //console.log(this.responseData);
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            //console.log(this.responseData.ID);
            
            this.Router.navigate(['home']).then(() => {
              window.location.reload();
            });
            
            this.loading.dismiss();
          },
          error: (error) => {
            console.log(error);
            this.presentToast("Username/Password incorrect");
            this.loading.dismiss();
          }
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
