import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppendicesPageRoutingModule } from './appendices-routing.module';

import { AppendicesPage } from './appendices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppendicesPageRoutingModule
  ],
  declarations: [AppendicesPage]
})
export class AppendicesPageModule {}
