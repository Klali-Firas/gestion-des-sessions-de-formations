import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'express';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-nav-public',
  templateUrl: './nav-public.component.html',
  styleUrls: ['./nav-public.component.css']
})


export class NavPublicComponent {
  inscrireOuConnecter: boolean = false;
  candidat: boolean = false;
  formInscrireCandidat = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    mdp: ['', [Validators.required, Validators.minLength(8)]],
    cmdp: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validator: this.ConfirmedValidator('mdp', 'cmdp')
  });

  formConnecterCandidat = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    mdp: ['', [Validators.required, Validators.minLength(8)]],
  });


  constructor(private formBuilder: FormBuilder, private candidatService: CandidatService, private router: Router) { }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  toggleCandidatPopUp() {
    if (this.candidat) {
      document.body.classList.remove('prevent-scroll');
      this.candidat = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.candidat = true
    }
  }

  addCandidat() {

    if (this.formInscrireCandidat.invalid) {
      this.formInscrireCandidat.markAllAsTouched();
      return
    }
    let candidat: Candidat = {
      nom: this.formInscrireCandidat.get('nom')!.value!,
      prenom: this.formInscrireCandidat.get('prenom')!.value!,
      email: this.formInscrireCandidat.get('email')!.value!,
      cin: parseInt(this.formInscrireCandidat.get('cin')!.value!),
      password: this.formInscrireCandidat.get('mdp')!.value!,
      type: "candidat"
    }

    this.candidatService.register(candidat).subscribe({
      next: (res) => {
        console.log(res)
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.user))
        this.router.navigate(['/candidat'])
      }
    })
  }

  loginCandidat() {
    if (this.formConnecterCandidat.invalid) {
      this.formConnecterCandidat.markAllAsTouched();
      return
    }
    let email = this.formConnecterCandidat.get('email')!.value!;
    let password = this.formConnecterCandidat.get('mdp')!.value!;
    this.candidatService.login(email, password).subscribe({
      next: (res) => {
        console.log(res)
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.user))
        this.router.navigate(['/candidat'])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
