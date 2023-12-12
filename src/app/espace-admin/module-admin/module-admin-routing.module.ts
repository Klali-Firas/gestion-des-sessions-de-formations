import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellAdminComponent } from '../shell-admin/shell-admin.component';
import { GestionCandidatsComponent } from '../gestion-candidats/gestion-candidats.component';
import { GestionFormateursComponent } from '../gestion-formateurs/gestion-formateurs.component';
import { GestionFormationsComponent } from '../gestion-formations/gestion-formations.component';
import { GestionSessionComponent } from '../gestion-session/gestion-session.component';
import { ModifierCandidatComponent } from '../modifier-candidat/modifier-candidat.component';
import { ModifierFormateurComponent } from '../modifier-formateur/modifier-formateur.component';

const routes: Routes = [
  {
    path: "", component: ShellAdminComponent, children: [
      { path: "gestion-candidats", component: GestionCandidatsComponent },
      { path: "gestion-formateurs", component: GestionFormateursComponent },
      { path: "gestion-formations", component: GestionFormationsComponent },
      { path: "gestion-sessions/:id", component: GestionSessionComponent },
      { path: "modifier-candidat/:id", component: ModifierCandidatComponent },
      { path: "modifier-formateur/:id", component: ModifierFormateurComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAdminRoutingModule { }
