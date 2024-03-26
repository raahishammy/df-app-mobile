import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: "app-leader-notes",
  templateUrl: "./leader-notes.page.html",
  styleUrls: ["./leader-notes.page.scss"],
})
export class LeaderNotesPage implements OnInit {
  data: any;
  weeks: any;
  id: any;
  type: any;
  url: string = "https://disciplefirst.herokuapp.com/https://disciplefirst.com/";
  bookData: any;
  loading: any;
  downloaded_flag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public LoadingController: LoadingController,
    private network: Network
  ) {
    let data = JSON.parse(this.route.snapshot.queryParams["leader_notes"]);
    let id = data.id;
    // console.log(data);

    let localStoredBooks = localStorage.getItem("downloadedBooks");
    let downloadedBooks = (localStoredBooks!== null ) ? JSON.parse(localStoredBooks) : null;
    if (downloadedBooks){
      for (var i = 0; i < downloadedBooks.length; i++) {
        if (downloadedBooks[i].ID == id) {
          this.downloaded_flag = true;
          this.data = downloadedBooks[i];
          break;
        }
      }
    }

    // console.log("Network Type ", this.network.type);
    if (this.network.type == "none") {
      if (downloadedBooks) {
        /*for (var i = 0; i < downloadedBooks.length; i++) {
          if (downloadedBooks[i].ID == id) {
            this.data = downloadedBooks[i];
            break;
          }
        }*/
        if(this.downloaded_flag == true){
          // Variables are already defined
        }
      }
      // console.log(this.data);
    }else{
      if(this.downloaded_flag == true){
        // Variables are already defined
      }else{ 
        this.presentLoading();
        this.getLeaderNotes(id).subscribe((res) => {
          this.data = res;
          //console.log(this.bookData);
          this.loading.dismiss();
        });
      }
    }
  }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      // duration: 8000,
    });
    return await this.loading.present();
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      // "Content-Type": "application/json",
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
  };

  getLeaderNotes(id) {
    const route =
      this.url + "wp-json/disciplefirst2019-child/v1/" + `book-content/${id}`;
    return this.http.post(route, JSON.stringify(id), this.httpOptions).pipe(
      map((post) => {
        //console.log(post);
        return post;
      })
    );
  }

  ngOnInit() {}
}
