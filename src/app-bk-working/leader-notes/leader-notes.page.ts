import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

import { Network } from "@awesome-cordova-plugins/network/ngx";

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
  url: string = "https://disciplefirst.com/";
  bookData: any;
  loading: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public LoadingController: LoadingController,
    private network: Network
  ) {
    let data = JSON.parse(this.route.snapshot.queryParams["leader_notes"]);
    let id = data.id;

    console.log(data);
    console.log("Network Type ", this.network.type);
    if (this.network.type == "none") {
      let localStoredBooks = localStorage.getItem("downloadedBooks");
      let downloadedBooks = (localStoredBooks!== null ) ? JSON.parse(localStoredBooks) : null;
      if (downloadedBooks) {
        for (var i = 0; i < downloadedBooks.length; i++) {
          if (downloadedBooks[i].ID == id) {
            this.data = downloadedBooks[i];
            break;
          }
        }
        // this.bookData = this.data.leader_notes;
        // this.data.book_meta.forEach((element, index) => {
        //   let day = element.select_day.value;
        //   let week = element.select_week.value;
        //   let leaderNotes = element.leader_notes;

        //   let key = week + " | " + day;
        //   let temp = {
        //     day: day,
        //     week: week,
        //     leader_notes: leaderNotes,
        //   };
        //   this.bookData[key] = temp;
        //   // this.bookData.push(element);
        //   console.log(temp);
        // });
      }
      console.log(this.data);
    }else{
      this.presentLoading();
      this.getLeaderNotes(id).subscribe((res) => {
        this.data = res;
        // this.bookData = {};
        // this.bookData = this.data;

        // this.weeks.forEach((element, index) => {
        //   let day = element.select_day.value;
        //   let week = element.select_week.value;
        //   let leaderNotes = element.leader_notes;

        //   let key = week + " | " + day;
        //   let temp = {
        //     day: day,
        //     week: week,
        //     leader_notes: leaderNotes,
        //   };
        //   this.bookData[key] = temp;
        //   // this.bookData.push(element);
        //   console.log(temp);
        // });
        //console.log(this.bookData);
        this.loading.dismiss();
      });
    }
  }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      duration: 8000,
    });
    return await this.loading.present();
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
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
