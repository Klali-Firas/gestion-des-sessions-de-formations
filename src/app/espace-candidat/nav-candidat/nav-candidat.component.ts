import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-candidat',
  templateUrl: './nav-candidat.component.html',
  styleUrls: ['./nav-candidat.component.css']
})
export class NavCandidatComponent {
  constructor(private router: Router) { }
  deconnecter() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }
}
