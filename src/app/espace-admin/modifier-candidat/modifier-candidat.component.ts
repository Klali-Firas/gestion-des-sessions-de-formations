import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-modifier-candidat',
  templateUrl: './modifier-candidat.component.html',
  styleUrls: ['./modifier-candidat.component.css']
})
export class ModifierCandidatComponent implements OnInit {

  candidat!: Candidat;
  id!: string;
  deleteConfirmation: string = "";

  formDataCandidat!: FormGroup;
  formPassCandidat!: FormGroup;

  constructor(private aroute: ActivatedRoute, private candidatService: CandidatService, private formBuilder: FormBuilder, private titleCase: TitleCasePipe, private router: Router) { }
  async ngOnInit(): Promise<void> {
    this.aroute.params.subscribe(value => {
      this.id = value['id'];
    });
    await this.getCandidatById();
    this.formDataCandidat = this.formBuilder.group({
      nom: [this.candidat.nom, Validators.required],
      prenom: [this.candidat.prenom, Validators.required],
      email: [this.candidat.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      cin: [this.candidat.cin, [Validators.required, Validators.pattern('^[0-9]{8}$')]],

    });
    this.formPassCandidat = this.formBuilder.group({
      mdp: ['', [Validators.required, Validators.minLength(8)]],
      cmdp: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: this.ConfirmedValidator('mdp', 'cmdp')
    })
  }
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

  async getCandidatById() {
    this.candidat = await firstValueFrom(this.candidatService.getCandidatById(this.id))
  }

  updateCandidat() {
    if (this.formDataCandidat.invalid) {
      this.formDataCandidat.markAllAsTouched();
      return;
    }
    let candidatData = {
      nom: this.titleCase.transform(this.formDataCandidat.get('nom')!.value!.trim()),
      prenom: this.titleCase.transform(this.formDataCandidat.get('prenom')!.value!.trim()),
      email: this.formDataCandidat.get('email')!.value!.trim().toLowerCase(),
      cin: parseInt(this.formDataCandidat.get('cin')!.value!),
    }
    this.candidatService.updateCandidatData(this.candidat.id!.toString(), candidatData).subscribe({
      next: (res) => {
        this.candidat = res;
      }
    })
  }

  updatePassword() {
    if (this.formPassCandidat.invalid) {
      this.formPassCandidat.markAllAsTouched();
      return;
    }
    this.candidatService.updateCandidatPassword(this.candidat.id!.toString(), this.formPassCandidat.get('mdp')!.value!).subscribe({
      next: (res) => {
        this.candidat = res;
      }
    })
  }

  supprimerCandidat() {

    this.candidatService.deleteCandidat(this.candidat.id!.toString()).subscribe({
      next: (res) => {
        this.router.navigate(['/administrateur/gestion-candidats']);
      }
    })
  }

}
