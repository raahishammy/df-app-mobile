import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionResourcesPage } from './introduction-resources.page';

const routes: Routes = [
  {
    path: '',
    component: IntroductionResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroductionResourcesPageRoutingModule {}
