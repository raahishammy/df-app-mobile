import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoryVersesPageRoutingModule } from './memory-verses-routing.module';

import { MemoryVersesPage } from './memory-verses.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MemoryVersesPageRoutingModule
  ],
  declarations: [MemoryVersesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class MemoryVersesPageModule {}
