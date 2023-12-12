import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavPublicComponent } from './espace-public/nav-public/nav-public.component';
import { AccueilComponent } from './espace-public/accueil/accueil.component';
import { FormationsComponent } from './espace-public/formations/formations.component';
import { DetailsFormationComponent } from './espace-public/details-formation/details-formation.component';
import { ShellComponent } from './espace-public/shell/shell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavCandidatComponent } from './espace-candidat/nav-candidat/nav-candidat.component';
import { MesFormationsComponent } from './espace-candidat/mes-formations/mes-formations.component';
import { ShellCandidatComponent } from './espace-candidat/shell-candidat/shell-candidat.component';
import { ShellFormateurComponent } from './espace-formateur/shell-formateur/shell-formateur.component';
import { MesFormationsFormateurComponent } from './espace-formateur/mes-formations-formateur/mes-formations-formateur.component';
import { DetailsSessionComponent } from './espace-formateur/details-session/details-session.component';
import { NavFormateurComponent } from './espace-formateur/nav-formateur/nav-formateur.component';
import { ShellAdminComponent } from './espace-admin/shell-admin/shell-admin.component';
import { NavAdminComponent } from './espace-admin/nav-admin/nav-admin.component';
import { GestionCandidatsComponent } from './espace-admin/gestion-candidats/gestion-candidats.component';
import { GestionFormateursComponent } from './espace-admin/gestion-formateurs/gestion-formateurs.component';
import { GestionFormationsComponent } from './espace-admin/gestion-formations/gestion-formations.component';
import { ModifierCandidatComponent } from './espace-admin/modifier-candidat/modifier-candidat.component';
import { ModifierFormateurComponent } from './espace-admin/modifier-formateur/modifier-formateur.component';
import { GestionSessionComponent } from './espace-admin/gestion-session/gestion-session.component';

@NgModule({
  declarations: [
    AppComponent,
    NavPublicComponent,
    AccueilComponent,
    FormationsComponent,
    DetailsFormationComponent,
    ShellComponent,
    NavCandidatComponent,
    MesFormationsComponent,
    ShellCandidatComponent,
    ShellFormateurComponent,
    MesFormationsFormateurComponent,
    DetailsSessionComponent,
    NavFormateurComponent,
    ShellAdminComponent,
    NavAdminComponent,
    GestionCandidatsComponent,
    GestionFormateursComponent,
    GestionFormationsComponent,
    ModifierCandidatComponent,
    ModifierFormateurComponent,
    GestionSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
