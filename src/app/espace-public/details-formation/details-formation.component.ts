import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.css']
})
export class DetailsFormationComponent implements OnInit {
  constructor(private candidatService: CandidatService, private formBuilder: FormBuilder, private aroute: ActivatedRoute, private formationService: FormationsService, private sessionService: SessionService, private datePipe: DatePipe, private titleCase: TitleCasePipe) { }

  formation!: Formation;
  sessions: Session[] = [];
  id!: string;
  sessionAChanger!: Session;
  ngOnInit(): void {
    this.aroute.params.subscribe(value => {
      this.id = value['id'];
    });
    this.getFormationById();
    this.getSessionsByFormationid();
  }
  getFormationById() {
    this.formationService.getFormationById(this.id).subscribe({
      next: (res) => {
        this.formation = res;
      },
      error: (error) => {
        console.error(error)
      }
    })

  }
  getSessionsByFormationid() {
    this.sessionService.getSessionsByFormationId(this.id).subscribe({
      next: (res) => {
        this.sessions = res;

      }
    })
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'd MMM') + ', ' + this.datePipe.transform(date, 'shortTime')
  }

  signupForSession() {
    this.sessionService.updateSession(this.sessionAChanger.id!.toString(), this.sessionAChanger).subscribe({
      next: (res) => {
        this.toggleCandidatPopUp();
        this.getSessionsByFormationid();
      }
    })
  }

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
      nom: this.titleCase.transform(this.formInscrireCandidat.get('nom')!.value!.trim()),
      prenom: this.titleCase.transform(this.formInscrireCandidat.get('prenom')!.value!.trim()),
      email: this.formInscrireCandidat.get('email')!.value!.trim().toLowerCase(),
      cin: parseInt(this.formInscrireCandidat.get('cin')!.value!),
      password: this.formInscrireCandidat.get('mdp')!.value!.trim(),
      type: "candidat"
    }

    this.candidatService.register(candidat).subscribe({
      next: (res) => {
        if (!this.sessionAChanger.candidats.includes(res.user.id!) && this.sessionAChanger.candidats.length < 15)
          this.sessionAChanger.candidats.push(res.user.id!);
        this.signupForSession();
      }
    })
  }

  loginCandidat() {
    if (this.formConnecterCandidat.invalid) {
      this.formConnecterCandidat.markAllAsTouched();
      return
    }
    let email = this.formConnecterCandidat.get('email')!.value!.trim().toLowerCase();
    let password = this.formConnecterCandidat.get('mdp')!.value!.trim();
    this.candidatService.login(email, password).subscribe({
      next: (res) => {
        if (!this.sessionAChanger.candidats.includes(res.user.id!) && this.sessionAChanger.candidats.length < 15)
          this.sessionAChanger.candidats.push(res.user.id!);
        this.signupForSession();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
