import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/interfaces/candidat';
import { Formateur } from 'src/app/interfaces/formateur';
import { CandidatService } from 'src/app/services/candidat.service';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
  selector: 'app-nav-public',
  templateUrl: './nav-public.component.html',
  styleUrls: ['./nav-public.component.css']
})


export class NavPublicComponent {
  inscrireOuConnecter: boolean = false;
  candidat: boolean = false;
  formateur: boolean = false;
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

  formInscrireFormateur = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    specialite: ['', Validators.required],
    mdp: ['', [Validators.required, Validators.minLength(8)]],
    cmdp: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validator: this.ConfirmedValidator('mdp', 'cmdp')
  });

  formConnecterFormateur = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    mdp: ['', [Validators.required, Validators.minLength(8)]],
  });


  constructor(private formBuilder: FormBuilder, private candidatService: CandidatService, private router: Router, private formateurService: FormateurService) { }

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
  toggleFormateurPopUp() {
    if (this.formateur) {
      document.body.classList.remove('prevent-scroll');
      this.formateur = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.formateur = true
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


  addFormateur() {

    if (this.formInscrireFormateur.invalid) {
      this.formInscrireFormateur.markAllAsTouched();
      return
    }
    let formateur: Formateur = {
      nom: this.formInscrireFormateur.get('nom')!.value!,
      prenom: this.formInscrireFormateur.get('prenom')!.value!,
      email: this.formInscrireFormateur.get('email')!.value!,
      tel: this.formInscrireFormateur.get('tel')!.value!,
      cin: parseInt(this.formInscrireFormateur.get('cin')!.value!),
      specialite: this.formInscrireFormateur.get('specialite')!.value!,
      password: this.formInscrireFormateur.get('mdp')!.value!,
      type: "formateur"
    }

    this.formateurService.register(formateur).subscribe({
      next: (res) => {
        console.log(res)
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.user))
        this.router.navigate(['/formateur'])
      }
    })
  }

  loginFormateur() {
    if (this.formConnecterFormateur.invalid) {
      this.formConnecterFormateur.markAllAsTouched();
      return
    }
    let email = this.formConnecterFormateur.get('email')!.value!;
    let password = this.formConnecterFormateur.get('mdp')!.value!;
    this.formateurService.login(email, password).subscribe({
      next: (res) => {
        console.log(res)
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.user))
        this.router.navigate(['/formateur'])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
