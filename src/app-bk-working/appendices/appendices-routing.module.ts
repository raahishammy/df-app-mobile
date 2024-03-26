import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppendicesPage } from './appendices.page';

const routes: Routes = [
  {
    path: '',
    component: AppendicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppendicesPageRoutingModule {}
