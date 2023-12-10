import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellCandidatComponent } from '../shell-candidat/shell-candidat.component';
import { MesFormationsComponent } from '../mes-formations/mes-formations.component';

const routes: Routes = [
  {
    path: "", component: ShellCandidatComponent, children: [
      { path: "mes-formations", component: MesFormationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleCandidatRoutingModule { }
