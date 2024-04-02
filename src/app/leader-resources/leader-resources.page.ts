import { Component, OnInit } from '@angular/core';

import { ToastController, LoadingController, NavController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-leader-resources',
  templateUrl: './leader-resources.page.html',
  styleUrls: ['./leader-resources.page.scss'],
})
export class LeaderResourcesPage implements OnInit {

  public resources: string;
  url: string = "https://disciplefirst.herokuapp.com/https://disciplefirst.com/";
  items: any = [];
  page: any = 1;
  public userData: any = localStorage.getItem("userData");
  public barcodes: any = localStorage.getItem("bookBarcodes");
  postData: any;
  loading: any;
  encodeData: any;
  arr: {};
  scannedData: {};
  scanBooks: boolean = false;

  barcodeScannerOptions: BarcodeScannerOptions;
  barcodeData: any;
  scannedBook: any;
  bookID: any;
  barcodeBookIdMap: {};
  local: Storage;


  constructor(
    public http: HttpClient,
    public Router: Router,
    public toastCtrl: ToastController,
    public LoadingController: LoadingController,
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private network: Network,
    private alertController: AlertController
  ) {     
    if(this.userData){
      this.userData = JSON.parse(this.userData);
    }
    if(this.barcodes){
      this.barcodes = JSON.parse(this.barcodes);
    }
    this.renderResourceData();
  }

  async instructionModal(){
    if(localStorage.getItem("viewInstructionsAlert") == null){
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Important message',
        message: 'To unlock digital access to these resources, scan the barcode on the bottom corner of the back cover of your book.',
        buttons: [
          {
            text: 'View Instructions',
            role: 'confirm',
            handler: () => {
              this.goToInstructionsPage();
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
  
      await alert.present();
      localStorage.setItem("viewInstructionsAlert", "1");
    }
  }

  validateSacnerAlertStatus(){
    for( let loop = 0; loop < this.items.length; loop++){
      let bookItem = this.items[loop];
      if(bookItem.has_access == false){
        if(localStorage.getItem("viewInstructionsAlert") == null){
          this.instructionModal();
        }
        this.scanBooks = true;
        return;
      }
    }
  }

  goToInstructionsPage() {
    this.Router.navigate(["resource-instructions"]);
  }

  renderResourceData(){

    let bookIdmap = {};
    if(this.network.type == "none"){
      let localBooksList = localStorage.getItem("downloadedBooks");
      let bookslist = (localBooksList!== null ) ? JSON.parse(localBooksList) : null;
      this.items = bookslist;
      this.validateSacnerAlertStatus();
    }else{
      if (this.barcodes) {
        for (var i = 0; i < this.barcodes.length; i++) {
          bookIdmap[this.barcodes[i]["bookId"]] = this.barcodes[i];
        }
      }
      this.barcodeBookIdMap = bookIdmap;

      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true,
      };

      if (this.userData) {
        this.loadProductbyUserId({ user_id: this.userData.ID }).subscribe(
          (res) => {
            this.items = res;
            this.validateSacnerAlertStatus();
            // this.loading.dismiss();
          }
        );
      } else {
        this.loadProduct(this.url, this.page, true);
      }
    }
  }

  getBookByBarcode(barcodeInfo) {
    barcodeInfo = JSON.parse(barcodeInfo);
    let book_barcode = { book_bar_code: barcodeInfo["text"] };

    let localbarcodes = localStorage.getItem("bookBarcodes");
    let barcodes = (localbarcodes!== null ) ? JSON.parse(localbarcodes) : null;
    if (barcodes) {
      let map = {};
      for (var i = 0; i < barcodes.length; i++) {
        map[barcodes[i]["text"]] = barcodes[i];
      }

      barcodes = map;
      if (barcodes[barcodeInfo["text"]] == undefined) {
        this.presentLoading();
        const route =
          this.url + "wp-json/disciplefirst2019-child/v1/verify-barcode/";
        return this.http
          .post(route, JSON.stringify(book_barcode), this.httpOptions)
          .subscribe({
            next: (res) => {
              this.scannedBook = res;
              this.bookID = this.scannedBook[0].ID;

              if (res) {
                barcodes = Object.values(map);
                barcodeInfo.bookId = this.bookID;
                barcodes.push(barcodeInfo);
                localStorage.setItem("bookBarcodes", JSON.stringify(barcodes));
                return this.gotoLeaderNotes(this.bookID, 'leader_notes');
              }
            },
            error: (error) => {
              alert("Invalid Barcode");
              this.loading.dismiss();
            },
            complete: () => {
              this.loading.dismiss();
            }
          });
      } else {
        let bookID = barcodes[barcodeInfo["text"]]["bookId"];
        return this.gotoLeaderNotes(bookID, 'leader_notes');
      }
    } else {
      this.presentLoading();
      const route =
        this.url + "wp-json/disciplefirst2019-child/v1/verify-barcode/";
      return this.http
        .post(route, JSON.stringify(book_barcode), this.httpOptions)
        .subscribe({
          next: (res) => {
            this.scannedBook = res;
            this.bookID = this.scannedBook[0].ID;

            if (res) {
              let temp : any = [];
              barcodeInfo.bookId = this.bookID;
              temp.push(barcodeInfo);
              localStorage.setItem(`bookBarcodes`, JSON.stringify(temp));
            }
            this.gotoLeaderNotes(this.bookID,'leader_notes');
          },
          error: (error) => {
            alert("Invalid Barcode");
            this.loading.dismiss();
          },
          complete: () => {
            this.loading.dismiss();
          }
        });
    }
  }

  scanBarcode() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        // this.getBookByBarcode('{"text":"9780999343913", "format":"QR_CODE","cancelled":false}');
        this.getBookByBarcode(JSON.stringify(barcodeData));
      })
      .catch((err) => {
      });
  }

  scanToUnlock() {
    alert("Scan Barcode To Unlock Book");
  }

  loadProductbyUserId(id) {
    this.presentLoading();
    const route =
      this.url + "wp-json/disciplefirst2019-child/v1/books-listing/";
    return this.http.post(route, JSON.stringify(id), this.httpOptions).pipe(
      map((post) => {
        this.loading.dismiss();
        return post;
      })
    );
  }

  async presentLoading() {
    this.loading = await this.LoadingController.create({
      //content: '',
      // duration: 4000,
    });
    return await this.loading.present();
  }

  httpOptions = {
    headers: new HttpHeaders({
      // "Content-Type": "application/json",
      'Content-Type': 'application/x-www-form-urlencoded'
      
    }),
  };

  async loadProduct(url: string, page, showLoading) {
    const loading = await this.LoadingController.create({
      message: "",
    });
    if (showLoading) {
      await loading.present();
    }

    const route =
      this.url + "wp-json/disciplefirst2019-child/v1/books-listing/";
    if (!page) {
      page = "1";
    }

    return new Promise((resolve, reject) => {
      var concat;
      if (url.indexOf("?") > 0) {
        concat = "&";
      } else {
        concat = "?";
      }

      this.http.post(route + concat, "page=" + page).subscribe(
        (data) => {
          if (showLoading) {
            loading.dismiss();
          }
          this.items = data;
          this.validateSacnerAlertStatus();
          resolve(this.items);
        },
        (error) => {
          if (showLoading) {
            loading.dismiss();
          }
          reject(error);
          this.presentToast(error.error.message);
        }
      );
    });
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

  gotoLeaderNotes(id, request_type) {
    let pageData = {
      id: id,
      request_type: request_type,
    };
    let navigationExtras: any = {
      queryParams: {
        leader_notes: JSON.stringify(pageData),
      },
    };
    this.Router.navigate(["leader-notes"], navigationExtras);
  }

  ngOnInit() {
  }

}
