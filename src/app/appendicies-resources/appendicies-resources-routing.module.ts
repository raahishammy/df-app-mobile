import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppendiciesResourcesPage } from './appendicies-resources.page';

const routes: Routes = [
  {
    path: '',
    component: AppendiciesResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppendiciesResourcesPageRoutingModule {}
