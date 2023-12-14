import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-footer-public',
  templateUrl: './footer-public.component.html',
  styleUrls: ['./footer-public.component.css']
})
export class FooterPublicComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }
  tryconnect: boolean = false;

  formAdmin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    mdp: ['', [Validators.required, Validators.minLength(8)]],
  });







  togglePopUp() {
    if (this.tryconnect) {
      document.body.classList.remove('prevent-scroll');
      this.tryconnect = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.tryconnect = true
    }
  }
  loginAdmin() {
    if (this.formAdmin.invalid) {
      this.formAdmin.markAllAsTouched();
      return
    }
    let email = this.formAdmin.get('email')!.value!.trim().toLowerCase();
    let password = this.formAdmin.get('mdp')!.value!.trim();
    this.adminService.login(email, password).subscribe({
      next: (res) => {
        console.log(res)
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.user))
        this.togglePopUp()
        this.router.navigate(['/administrateur'])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
