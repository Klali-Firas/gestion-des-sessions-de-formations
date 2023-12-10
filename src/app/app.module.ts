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
    ShellCandidatComponent
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
