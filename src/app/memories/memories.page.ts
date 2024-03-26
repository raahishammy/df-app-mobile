import { Component, OnInit} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})

export class MemoriesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  data:any;
  book_weekly_memory_verse:any;
  url: string = 'https://disciplefirst.herokuapp.com/https://disciplefirst.com/';
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public http: HttpClient,
    public LoadingController: LoadingController,
    private network: Network
  ) { 

    this.getMemoryVerses(669).subscribe(res => {
      this.data = res;
      this.book_weekly_memory_verse = this.data.book_weekly_memory_verse;
      console.log(this.book_weekly_memory_verse);
    });

  }

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  getMemoryVerses(id) {    
    const route = this.url + 'wp-json/disciplefirst2019-child/v1/' + `book-content/${id}`
    return this.http.post(route, JSON.stringify(id), this.httpOptions).pipe(
      map(post => {
        return post;
      })
    )
  }

  ngOnInit() {
  }
  
}
