import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderResourcesPageRoutingModule } from './leader-resources-routing.module';

import { LeaderResourcesPage } from './leader-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderResourcesPageRoutingModule
  ],
  declarations: [LeaderResourcesPage]
})
export class LeaderResourcesPageModule {}
