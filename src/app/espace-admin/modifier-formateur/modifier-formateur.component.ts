import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Formateur } from 'src/app/interfaces/formateur';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
  selector: 'app-modifier-formateur',
  templateUrl: './modifier-formateur.component.html',
  styleUrls: ['./modifier-formateur.component.css']
})
export class ModifierFormateurComponent {
  formateur!: Formateur;
  id!: string;
  deleteConfirmation: string = "";

  formDataFormateur!: FormGroup;
  formPassFormateur!: FormGroup;

  constructor(private aroute: ActivatedRoute, private formateurService: FormateurService, private formBuilder: FormBuilder, private titleCase: TitleCasePipe, private router: Router) { }
  async ngOnInit(): Promise<void> {
    this.aroute.params.subscribe(value => {
      this.id = value['id'];
    });
    await this.getFormateurById();
    this.formDataFormateur = this.formBuilder.group({
      nom: [this.formateur.nom, Validators.required],
      prenom: [this.formateur.prenom, Validators.required],
      email: [this.formateur.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      tel: [this.formateur.tel, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      cin: [this.formateur.cin, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      specialite: [this.formateur.specialite, Validators.required],

    });
    this.formPassFormateur = this.formBuilder.group({
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

  async getFormateurById() {
    this.formateur = await firstValueFrom(this.formateurService.getFormateurById(this.id))
  }

  updateFormateur() {
    if (this.formDataFormateur.invalid) {
      this.formDataFormateur.markAllAsTouched();
      return;
    }
    let formateurData = {
      nom: this.titleCase.transform(this.formDataFormateur.get('nom')!.value!.trim()),
      prenom: this.titleCase.transform(this.formDataFormateur.get('prenom')!.value!.trim()),
      email: this.formDataFormateur.get('email')!.value!.trim().toLowerCase(),
      cin: parseInt(this.formDataFormateur.get('cin')!.value!),
      tel: this.formDataFormateur.get('tel')!.value!,
      specialite: this.formDataFormateur.get('specialite')!.value!.trim(),
    }
    this.formateurService.updateFormateurData(this.formateur.id!.toString(), formateurData).subscribe({
      next: (res) => {
        this.formateur = res;
      }
    })
  }

  updatePassword() {
    if (this.formPassFormateur.invalid) {
      this.formPassFormateur.markAllAsTouched();
      return;
    }
    this.formateurService.updateFormateurPassword(this.formateur.id!.toString(), this.formPassFormateur.get('mdp')!.value!).subscribe({
      next: (res) => {
        this.formateur = res;
      }
    })
  }

  supprimerFormateur() {

    this.formateurService.deleteFormateur(this.formateur.id!.toString()).subscribe({
      next: (res) => {
        this.router.navigate(['/administrateur/gestion-formateurs']);
      }
    })
  }
}
