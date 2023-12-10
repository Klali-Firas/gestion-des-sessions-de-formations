import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../shell/shell.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { FormationsComponent } from '../formations/formations.component';
import { DetailsFormationComponent } from '../details-formation/details-formation.component';

const routes: Routes = [
  {
    path: "", component: ShellComponent,
    children: [{ path: "accueil", component: AccueilComponent },
    { path: "formations", component: FormationsComponent },
    { path: "formations/:id", component: DetailsFormationComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleEspacePublicRoutingModule { }
