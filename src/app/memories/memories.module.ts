import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoriesPageRoutingModule } from './memories-routing.module';

import { MemoriesPage } from './memories.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MemoriesPageRoutingModule
  ],
  declarations: [MemoriesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class MemoriesPageModule {}
