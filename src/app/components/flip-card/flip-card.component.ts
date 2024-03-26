import { Component, OnInit, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
})
export class FlipCardComponent implements OnInit {

  flipped: boolean = false;

  constructor() { }
  
  flip(){
    this.flipped = !this.flipped;
    // console.log("Flip Clicked");
  }
  
  ngOnInit() {}

}
