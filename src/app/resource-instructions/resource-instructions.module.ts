import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceInstructionsPageRoutingModule } from './resource-instructions-routing.module';

import { ResourceInstructionsPage } from './resource-instructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceInstructionsPageRoutingModule
  ],
  declarations: [ResourceInstructionsPage]
})
export class ResourceInstructionsPageModule {}
