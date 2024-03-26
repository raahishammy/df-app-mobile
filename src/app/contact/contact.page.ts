import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  url: string = 'https://disciplefirst.herokuapp.com/https://disciplefirst.com/'
  
  userinfo = {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    comment: "",
  }

  loading: any; 


  public contact: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public Router: Router,
    public toastCtrl: ToastController,
    public LoadingController: LoadingController
    ) { }

  ngOnInit() {
    //this.contact = this.activatedRoute.snapshot.paramMap.get('id');
  }

  contactForm() {
    if (this.userinfo.firstName != '' && this.userinfo.lastName != '' && this.userinfo.email != '') {
      if (this.validEmail(this.userinfo.email)) {
        this.presentLoading();
        const route = this.url + 'wp-json/disciplefirst2019-child/v1/contact-enquiry/'
        this.http.post(route, this.userinfo, this.httpOptions).subscribe((val) => {
          console.log("POST call successful value returned in body", val);
          this.userinfo.firstName = '';
          this.userinfo.lastName = '';
          this.userinfo.email = '';
          this.userinfo.street = '';
          this.userinfo.city = '';
          this.userinfo.state = '';
          this.userinfo.postalCode = '';
          this.userinfo.comment = '';
          this.presentToast("Your message has been sent Successfully.")
        },
          response => {
            console.log("POST call in error", response);
          },
          () => {
            console.log("The POST observable is now completed.");
          });

      } else {
        this.presentToast("Please enter a Valid Email Address.")
      }
    } else {
      this.presentToast("First Name, Last Name and Email is required to Submit the Contact Form.")
    }
  }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      // content: '',
      duration: 8000
    });
    return await this.loading.present();
  }

  async presentToast(msg) {

    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      cssClass: 'normal-toast'
    });

    toast.present();
  }

  validEmail(emailAddress) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailPattern.test(emailAddress)) {
      return false;
    }
    return true;
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      this.presentToast("Only Numbers are allowed in Postal Code.")
    }
  }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

}
