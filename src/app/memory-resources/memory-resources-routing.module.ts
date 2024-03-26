import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoryResourcesPage } from './memory-resources.page';

const routes: Routes = [
  {
    path: '',
    component: MemoryResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryResourcesPageRoutingModule {}
