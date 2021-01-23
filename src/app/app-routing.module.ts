import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', redirectTo: 'clients', pathMatch: 'full' },
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: '**', redirectTo: 'clients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
