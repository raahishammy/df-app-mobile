import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

import { Network } from '@awesome-cordova-plugins/network/ngx';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-memory-verses',
  templateUrl: './memory-verses.page.html',
  styleUrls: ['./memory-verses.page.scss'],
})
export class MemoryVersesPage implements OnInit {
  
  swiperModules = [IonicSlides];

  data:any;
  book_weekly_memory_verse:any;
  weeks:any;
  id:any;
  type:any;
  url: string = 'https://disciplefirst.herokuapp.com/https://disciplefirst.com/';
  bookData: any;
  loading:any;
  downloaded_flag: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public http: HttpClient,
    public LoadingController: LoadingController,
    private network: Network
  ) { 
    // this.renderMemoryVerseContent();   
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.downloaded_flag = false;
    this.renderMemoryVerseContent();
  }

  renderMemoryVerseContent(){
    this.data = '';;
    this.book_weekly_memory_verse= '';
    
    let data = JSON.parse(this.route.snapshot.queryParams['memory_verses']);
    this.id = data.id;
    console.log("Query String Data ", this.id);

    let localStoredBooks = localStorage.getItem("downloadedBooks");
    let downloadedBooks = (localStoredBooks!== null ) ? JSON.parse(localStoredBooks) : null;
    console.log("downloadedBooks ", downloadedBooks);
    if (downloadedBooks){
      for (var i = 0; i < downloadedBooks.length; i++) {
        if (downloadedBooks[i].ID == this.id) {
          console.log("Donwloaded Book ", this.id, downloadedBooks[i]);
          this.downloaded_flag = true;
          this.data = downloadedBooks[i];
          this.book_weekly_memory_verse = this.data.book_weekly_memory_verse;
          break;
        }
      }
    }

    console.log("Network Type ", this.network.type);
    if (this.network.type == "none") {
      if (downloadedBooks) {
        if(this.downloaded_flag == true){
          // variables are already defined
          console.log(this.data);
        }
      }
    }else{
      if(this.downloaded_flag == true){
        // variables are already defined
        console.log(this.data);
      }else{
        this.presentLoading(); 
        this.getMemoryVerses(this.id).subscribe(res => {
          this.data = res;
          this.book_weekly_memory_verse = this.data.book_weekly_memory_verse;
          console.log(this.data);
          this.loading.dismiss();
        });
      }
    }
  }
  
  async presentLoading() {
        this.loading = await this.LoadingController.create({
          //content: '',
          // duration: 8000
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

  getMemoryVerses(id) {    
    const route = this.url + 'wp-json/disciplefirst2019-child/v1/' + `book-content/${id}`
    return this.http.post(route, JSON.stringify(id), this.httpOptions).pipe(
      map(post => {        
        //console.log(post);
        return post;
      })
    )
  }

  covertTitletoLower(title){
    return title.replace(/\s+/g, '-').toLowerCase();
  }  

  ngOnInit() {
    if (this.route.snapshot.queryParams['memory_verses']) {
      let data = JSON.parse(this.route.snapshot.queryParams['memory_verses']);
      this.id = data.id;
      // console.log("resourceType", this.resourceType);
    }else{
      this.id = '';
    }
  }

}
