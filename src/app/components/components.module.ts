import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

//Important section
import { FlipCardComponent } from './flip-card/flip-card.component';

@NgModule({
  declarations: [FlipCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FlipCardComponent
  ]
})
export class ComponentsModule { }
