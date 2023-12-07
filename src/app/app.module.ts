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

@NgModule({
  declarations: [
    AppComponent,
    NavPublicComponent,
    AccueilComponent,
    FormationsComponent,
    DetailsFormationComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
