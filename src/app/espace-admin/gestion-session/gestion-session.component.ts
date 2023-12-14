import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Formateur } from 'src/app/interfaces/formateur';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormateurService } from 'src/app/services/formateur.service';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-gestion-session',
  templateUrl: './gestion-session.component.html',
  styleUrls: ['./gestion-session.component.css']
})
export class GestionSessionComponent implements OnInit {
  ISOToday = new Date().toISOString();
  id!: string;
  formation!: Formation;
  sessions!: Session[];
  creatingNewSession: boolean = false;
  formateurs!: Formateur[];
  selectedFormateurs: number[] = []
  sessionForm = this.formBuilder.group
    ({
      formateurs: [[], Validators.required],
      dateDeb: ['', Validators.required],
      dateFin: ['', Validators.required, this.isDateFinAvailable.bind(this)],
      planning: ['', Validators.required]
    });
  constructor(private formBuilder: FormBuilder, private titleCase: TitleCasePipe, private aroute: ActivatedRoute, private formationService: FormationsService, private sessionService: SessionService, private formateurService: FormateurService, private datePipe: DatePipe) { }
  async ngOnInit(): Promise<void> {
    this.aroute.params.subscribe(value => {
      this.id = value['id'];
    });
    await this.getFormationById();
    await this.getSessionsByFormationId();
    this.getAllFormateurs();
  }
  async getFormationById() {
    this.formation = await firstValueFrom(this.formationService.getFormationById(this.id))
  }

  async getSessionsByFormationId() {
    this.sessions = await firstValueFrom(this.sessionService.getSessionsByFormationId(this.formation.id!.toString()))
  }
  getAllFormateurs() {
    this.formateurService.getAllFormateurs().subscribe({
      next: (res) => {
        this.formateurs = res.map(formateur => ({
          ...formateur,
          nomPrenom: `${formateur.nom} ${formateur.prenom}`
        }));

      }
    })
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'd MMM') + ', ' + this.datePipe.transform(date, 'shortTime')
  }
  togglePopUp() {
    if (this.creatingNewSession) {
      document.body.classList.remove('prevent-scroll');
      this.creatingNewSession = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.creatingNewSession = true
    }
  }
  onSubmit() {

    let session: Session = {
      candidats: [],
      dateDeb: new Date(this.sessionForm.get('dateDeb')!.value!),
      dateFin: new Date(this.sessionForm.get('dateFin')!.value!),
      formateurs: this.sessionForm.get('formateurs')!.value!,
      formation: this.formation.id!,
      planning: this.sessionForm.get('planning')!.value!,

    }
    this.sessionService.addSession(session).subscribe({
      next: () => {
        this.getSessionsByFormationId()
        this.sessionForm.reset();
        this.togglePopUp();
      }
    })
  }


  isDateFinAvailable(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const selectedDateFin = control.value;


      if (
        selectedDateFin <= this.sessionForm.get('dateDeb')!.value!
      ) {
        resolve({ dateUnavailable: true });
        return;
      }


      resolve(null); // Resolve with null if the date is available
    });
  }

  resetFinDate() {
    if (this.sessionForm.get('dateFin')?.value! <= this.sessionForm.get('dateDeb')?.value!)
      this.sessionForm.get('dateFin')?.setValue('');
  }
}
