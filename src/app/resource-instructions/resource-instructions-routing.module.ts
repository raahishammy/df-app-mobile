import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceInstructionsPage } from './resource-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceInstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceInstructionsPageRoutingModule {}
