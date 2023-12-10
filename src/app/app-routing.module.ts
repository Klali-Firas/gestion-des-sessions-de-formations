import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { candidatAuthGuard } from './guards/candidat-auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./espace-public/module-espace-public/module-espace-public-routing.module').then(m => m.ModuleEspacePublicRoutingModule) },
  { path: 'candidat', loadChildren: () => import('./espace-candidat/module-candidat/module-candidat.module').then(m => m.ModuleCandidatModule), canActivate: [candidatAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
