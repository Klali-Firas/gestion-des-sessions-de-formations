import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellFormateurComponent } from '../shell-formateur/shell-formateur.component';
import { MesFormationsFormateurComponent } from '../mes-formations-formateur/mes-formations-formateur.component';
import { DetailsSessionComponent } from '../details-session/details-session.component';

const routes: Routes = [
  {
    path: "", component: ShellFormateurComponent, children: [
      { path: "mes-formations", component: MesFormationsFormateurComponent },
      { path: "details-session/:id", component: DetailsSessionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleFormateurRoutingModule { }
