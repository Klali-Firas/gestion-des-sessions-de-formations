import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-formateur',
  templateUrl: './nav-formateur.component.html',
  styleUrls: ['./nav-formateur.component.css']
})
export class NavFormateurComponent {
  constructor(private router: Router) { }
  deconnecter() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }
}
