import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryResourcesPageRoutingModule } from './memory-resources-routing.module';

import { MemoryResourcesPage } from './memory-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryResourcesPageRoutingModule
  ],
  declarations: [MemoryResourcesPage]
})
export class MemoryResourcesPageModule {}
