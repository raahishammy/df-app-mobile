import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.page.html',
  styleUrls: ['./speaking.page.scss'],
})
export class SpeakingPage implements OnInit {

  url: string = 'https://disciplefirst.com/'

  userinfo = {
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    eventType: {},
    startDate: "",
    endDate: "",
    eventLocation: "",
    eventPurpose: "",
    dressCode: "",
    eventSchedule: "",
    requirements: "",
    craigSpeakTime: "",
    eventTopic: "",
    eventTime: "",

    offerings: {},
    audience: {},
    screen: {},
    board: {},
    stand: {},
    additionalRequests: {},
  }

  eventTypes: any = [
    { eventValue: 1, eventLabel: "discipleFIRST Forum", eventName:"discipleFIRSTEvent", checked: false },
    { eventValue: 2, eventLabel: "Conference", eventName:"ConferenceEvent", checked: false },
    { eventValue: 3, eventLabel: "Sunday Preaching", eventName:"SundayEvent", checked: false },
    { eventValue: 4, eventLabel: "Staff Consultation", eventName:"StaffEvent", checked: false },
    { eventValue: 5, eventLabel: "Retreat", eventName:"RetreatEvent", checked: false },
    { eventValue: 6, eventLabel: "Interview, Video, or Podcast", eventName:"InterviewEvent", checked: false },
    { eventValue: 6, eventLabel: "Other", eventName:"otherEvent", checked: false },
  ];

  eventSelected: any = [];

  audienceType: any = [
    { label: "Pastors", inputName:"PastorsAudience", checked: false },
    { label: "Church Planters", inputName:"ChurchAudience", checked: false },
    { label: "Leaders/Teachers", inputName:"LeadersAudience", checked: false },
    { label: "Students", inputName:"StudentsAudience", checked: false },
  ];

  audienceSelected: any = [];
  
  requirementTypes: any = [
    { label: "Meetings", inputName:"MeetingsReq", checked: false },
    { label: "Interviews(blogs, videos, etc...)", inputName:"InterviewReq", checked: false },
    { label: "Special Promtions from discipleFIRST", inputName:"ProReq", checked: false },
    { label: "Other", inputName:"OtherReq", checked: false },
  ];

  requirementSelected: any = [];
  
  interestOptions: any = [
    { label: "Yes", inputName:"yesOption", checked: false },
    { label: "No", inputName:"noOption", checked: false },
    { label: "I do not know", inputName:"idkoption", checked: false },
  ];

  screenOptions: any = [
    { label: "Yes", inputName:"yesScreen", checked: false },
    { label: "No", inputName:"noScreen", checked: false },
    { label: "I do not know", inputName:"idkScreen", checked: false },
  ];

  boardOptions: any = [
    { label: "Yes", inputName:"yesBoard", checked: false },
    { label: "No", inputName:"noBoard", checked: false },
    { label: "I do not know", inputName:"idkBoard", checked: false },
  ];

  standOptions: any = [
    { label: "Yes", inputName:"yesStand", checked: false },
    { label: "No", inputName:"noStand", checked: false },
    { label: "I do not know", inputName:"idkStand", checked: false },
  ];

  offeringInterest: any = [];
  screenAvailable: any = [];
  broardAvailable: any = [];
  standAvailable: any = [];

  loading: any; 

  constructor(
    private activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public Router: Router,
    public toastCtrl: ToastController,
    public LoadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  selectEvent(data){
    if (data.checked == true) {
      this.eventSelected.push(data.eventLabel);
    } else {
      let newArray = this.eventSelected.filter(function(el) {
        return el !== data.eventLabel;
      });
      this.eventSelected = newArray;
    }
    console.log("Choices Array ", this.eventSelected);
  }

  selectAudience(data){
    if (data.checked == true) {
      this.audienceSelected.push(data.label);
    } else {
      let newArray = this.audienceSelected.filter(function(el) {
        return el !== data.label;
      });
      this.audienceSelected = newArray;
    }
    console.log("Choices Array ", this.audienceSelected);
  }
  
  selectRequirement(data){
    if (data.checked == true) {
      this.requirementSelected.push(data.label);
    } else {
      let newArray = this.requirementSelected.filter(function(el) {
        return el !== data.label;
      });
      this.requirementSelected = newArray;
    }
    console.log("Choices Array ", this.requirementSelected);
  }

  selectOffering(data){
    if (data.checked == true) {
      this.offeringInterest.push(data.label);
    } else {
      let newArray = this.offeringInterest.filter(function(el) {
        return el !== data.label;
      });
      this.offeringInterest = newArray;
    }
    console.log("Choices Array ", this.offeringInterest);
  }

  selectScreening(data){
    if (data.checked == true) {
      this.screenAvailable.push(data.label);
    } else {
      let newArray = this.screenAvailable.filter(function(el) {
        return el !== data.label;
      });
      this.screenAvailable = newArray;
    }
    console.log("Choices Array ", this.screenAvailable);
  }

  selectBoard(data){
    if (data.checked == true) {
      this.broardAvailable.push(data.label);
    } else {
      let newArray = this.broardAvailable.filter(function(el) {
        return el !== data.label;
      });
      this.broardAvailable = newArray;
    }
    console.log("Choices Array ", this.broardAvailable);
  }
  
  selectStand(data){
    if (data.checked == true) {
      this.standAvailable.push(data.label);
    } else {
      let newArray = this.standAvailable.filter(function(el) {
        return el !== data.label;
      });
      this.standAvailable = newArray;
    }
    console.log("Choices Array ", this.standAvailable);
  }

  speakingRequest() {
    if (this.userinfo.firstName == "") {
      this.presentToast("First Name is required to Enter.");
      return false;
    } else if (this.userinfo.lastName == "") {
      this.presentToast("Last Name is required to");
      return false;
    } else if (this.userinfo.email == "") {
      this.presentToast("Email Address is required to Enter.");
      return false;
    } else if (this.userinfo.mobilePhone == "") {
      this.presentToast("Mobile Phone is required to Enter.");
      return false;
    } else if (this.userinfo.street == "") {
      this.presentToast("Street Address is required to Enter.");
      return false;
    } else if (this.userinfo.city == "") {
      this.presentToast("City is required to Enter.");
      return false;
    } else if (this.userinfo.state == "") {
      this.presentToast("State is required to Enter.");
      return false;
    } else if (this.userinfo.postalCode == "") {
      this.presentToast("Postal Code is required to Enter.");
      return false;
    } else if (this.eventSelected.length <= 0){
      this.presentToast("Event Type is required to select.");
      return false;
    } else if (this.userinfo.startDate == "") {
      this.presentToast("Event Start Date is required to Enter.");
      return false;
    } else if (this.userinfo.endDate == "") {
      this.presentToast("Event End Date is required to Enter.");
      return false;
    } else if (this.userinfo.eventLocation == "") {
      this.presentToast("Location of Event is required to Enter.");
      return false;
    } else if (this.userinfo.eventPurpose == "") {
      this.presentToast("Purpose of Event is required to Enter.");
      return false;
    } else if (this.audienceSelected.length <= 0) {
      this.presentToast("Prospective Audience is required to select.");
      return false;    
    } else if (this.userinfo.dressCode == "") {
      this.presentToast("Dress Code is required to Enter.");
      return false;
    } else if (this.requirementSelected.length <= 0) {
      this.presentToast("Additional Requests is required to select.");
      return false;
    } else if (this.userinfo.eventSchedule == "") {
      this.presentToast("Overall Schedule of Event is required to Enter.");
      return false;
    } else if (this.offeringInterest.length <= 0) {
      this.presentToast("Would You Be Interested in Offering a Grow Series Cohort As A Next Step For Attendees, is required to select.");
      return false;
    } else if (this.userinfo.requirements == "") {
      this.presentToast("Other Requirements is required to Enter.");
      return false;
    } else if (this.userinfo.craigSpeakTime == "") {
      this.presentToast("Event Craig Speask Time is required to Enter.");
      return false;
    } else if (this.userinfo.eventTopic == "") {
      this.presentToast("Event Topic/passage of Scripture is required to Enter.");
      return false;
    } else if (this.userinfo.eventTime == "") {
      this.presentToast("Time of Event is required to Enter.");
      return false;
    } else if (this.screenAvailable.length <= 0) {
      this.presentToast("Would a Screen, Projector or Large T.V. Be Available To Display a Powerpoint.");
      return false;
    } else if (this.broardAvailable.length <= 0) {
      this.presentToast("Would a Large Dry Erase Board Be Available, is required to select.");
      return false;
    } else if (this.standAvailable.length <= 0) {
      this.presentToast("Would a Music Stand or Podium Be Available, is required to Select.");
      return false;
    } else{
      if (this.validEmail(this.userinfo.email)) {
        this.presentLoading();
        this.userinfo.eventType = this.eventSelected;
        this.userinfo.offerings = this.offeringInterest;
        this.userinfo.audience = this.audienceSelected;
        this.userinfo.screen = this.screenAvailable;
        this.userinfo.board = this.broardAvailable;
        this.userinfo.stand = this.standAvailable;
        this.userinfo.additionalRequests = this.requirementSelected;

        const route = this.url + 'wp-json/disciplefirst2019-child/v1/speaking-form/'
        this.http.post(route, this.userinfo, this.httpOptions).subscribe((val) => {
          console.log("POST call successful value returned in body", val);
          this.presentToast("Your message has been sent Successfully.")
        },
          response => {
            console.log("POST call in error", response);
          },
          () => {
            console.log("The POST observable is now completed.");
          });
          return true;
      } else {
        this.presentToast("Please enter a Valid Email Address.");
        return true;
      }
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
      'Content-Type': 'application/json'
    })
  }

}
