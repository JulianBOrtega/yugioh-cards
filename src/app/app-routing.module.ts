import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';

const routes: Routes = [
  {
    path:'cards',
    component: CardListComponent
  },
  {
    path:'card/:id',
    component: CardDetailComponent,
  },
  {
    path:'**',
    redirectTo: 'cards'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
