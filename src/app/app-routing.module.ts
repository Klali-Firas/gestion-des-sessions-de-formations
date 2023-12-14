import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { candidatAuthGuard } from './guards/candidat-auth.guard';
import { formateurAuthGuard } from './guards/formateur-auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./espace-public/module-espace-public/module-espace-public.module').then(m => m.ModuleEspacePublicModule) },
  { path: 'candidat', loadChildren: () => import('./espace-candidat/module-candidat/module-candidat.module').then(m => m.ModuleCandidatModule), canActivate: [candidatAuthGuard] },
  { path: 'formateur', loadChildren: () => import('./espace-formateur/module-formateur/module-formateur.module').then(m => m.ModuleFormateurModule), canActivate: [formateurAuthGuard] },
  { path: 'administrateur', loadChildren: () => import('./espace-admin/module-admin/module-admin.module').then(m => m.ModuleAdminModule), canActivate: [adminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
