import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppendiciesResourcesPageRoutingModule } from './appendicies-resources-routing.module';

import { AppendiciesResourcesPage } from './appendicies-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppendiciesResourcesPageRoutingModule
  ],
  declarations: [AppendiciesResourcesPage]
})
export class AppendiciesResourcesPageModule {}
