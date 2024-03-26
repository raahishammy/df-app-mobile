import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderResourcesPage } from './leader-resources.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderResourcesPageRoutingModule {}
