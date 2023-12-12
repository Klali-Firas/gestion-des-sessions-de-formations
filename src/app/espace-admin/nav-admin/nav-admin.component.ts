import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent {
  constructor(private router: Router) { }
  deconnecter() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }
}
