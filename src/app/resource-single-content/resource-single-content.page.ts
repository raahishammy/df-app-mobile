import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: "app-resource-single-content",
  templateUrl: "./resource-single-content.page.html",
  styleUrls: ["./resource-single-content.page.scss"],
})
export class ResourceSingleContentPage implements OnInit {
  id: any;
  data: any;
  week: any;
  day: any;
  type: any;
  url: string = "https://disciplefirst.herokuapp.com/https://disciplefirst.com/";
  loading: any;
  weekData: any;
  dayData: any;
  downloaded_flag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public LoadingController: LoadingController,
    private network: Network
  ) {
    
    let data = JSON.parse(this.route.snapshot.queryParams["book_content"]);
    this.id = data.id;
    this.weekData = data.select_week;
    this.dayData = data.select_day;

    console.log(data);
    // console.log(data.select_day);
    let localStoredBooks = localStorage.getItem("downloadedBooks");
    let downloadedBooks = (localStoredBooks!== null ) ? JSON.parse(localStoredBooks) : null;
    if (downloadedBooks){
      for (var i = 0; i < downloadedBooks.length; i++) {
        if (downloadedBooks[i].ID == this.id) {
          this.downloaded_flag = true;

          this.data = downloadedBooks[i];
          break;
        }
      }
      /*this.data.book_meta.forEach((element) => {
        // console.log("Loop Element ", element);
        if (
          element.select_week.value == this.weekData &&
          element.select_day.value == this.dayData
        ) {
            this.data.request_content = element.book_content;
        }
      });*/
    }

    // console.log("Network Type ", this.network.type);
    if(this.network.type == "none"){
      if (downloadedBooks) {
        // for (var i = 0; i < downloadedBooks.length; i++) {
        //   if (downloadedBooks[i].ID == this.id) {
        //     this.data = downloadedBooks[i];
        //     break;
        //   }
        // }
        // // console.log("Local Book Data ", this.data);
        // this.data.book_meta.forEach((element) => {
        //   // console.log("Loop Element ", element);
        //   if (
        //     element.select_week.value == this.weekData &&
        //     element.select_day.value == this.dayData
        //   ) {
        //       this.data.request_content = element.book_content;
        //   }
        // });
        if(this.downloaded_flag == true){
          // Variables are already defined
        }
      }
    }else{
      if(this.downloaded_flag == true){
        // Variables are already defined
      }else{
        this.presentLoading();
        
        this.getBookContent(data).subscribe((res) => {
          this.data = res;
          console.log("Result ", this.data); 
          this.loading.dismiss();
        });
      }
    }
  }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      // duration: 5000,
    });
    return await this.loading.present();
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      // "Content-Type": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    }),
  };

  getBookContent(data) {
    console.log(data);
    //let params = { request_type: "book_content", select_week: "Week 2", select_day: "Day 1" };
    const route =
      this.url +
      "wp-json/disciplefirst2019-child/v1/" +
      `book-content/${this.id}`;
    return this.http.post(route, JSON.stringify(data), this.httpOptions).pipe(
      map((post) => {
        console.log(post);
        return post;
      })
    );
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      cssClass: "normal-toast",
    });

    toast.present();
  }

  ngOnInit() {}
}
