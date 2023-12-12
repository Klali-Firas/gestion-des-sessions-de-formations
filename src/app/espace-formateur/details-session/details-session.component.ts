import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';
import { firstValueFrom } from 'rxjs';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
  styleUrls: ['./details-session.component.css']
})
export class DetailsSessionComponent {

  constructor(private candidatService: CandidatService, private aroute: ActivatedRoute, private formationService: FormationsService, private sessionService: SessionService, private datePipe: DatePipe) { }

  formation!: Formation;
  session!: Session;
  id!: string;
  candidats!: Candidat[];
  async ngOnInit(): Promise<void> {
    this.aroute.params.subscribe(value => {
      this.id = value['id'];
    });
    this.getAllCandidats();
    await this.getSessionsByid();
    await this.getFormationById();


  }
  async getFormationById() {
    this.formation = await firstValueFrom(this.formationService.getFormationById(this.session.formation.toString()));

  }
  async getSessionsByid() {
    this.session = await firstValueFrom(this.sessionService.getSessionsById(this.id));

  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'd MMM') + ', ' + this.datePipe.transform(date, 'shortTime')
  }

  getAllCandidats() {
    this.candidatService.getAllCandidats().subscribe({
      next: (res) => {
        this.candidats = res;
        console.log(res)
      }
    })
  }
}
