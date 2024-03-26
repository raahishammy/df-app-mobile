import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionResourcesPageRoutingModule } from './introduction-resources-routing.module';

import { IntroductionResourcesPage } from './introduction-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionResourcesPageRoutingModule
  ],
  declarations: [IntroductionResourcesPage]
})
export class IntroductionResourcesPageModule {}
