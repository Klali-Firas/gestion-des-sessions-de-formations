import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Formateur } from 'src/app/interfaces/formateur';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-mes-formations-formateur',
  templateUrl: './mes-formations-formateur.component.html',
  styleUrls: ['./mes-formations-formateur.component.css']
})
export class MesFormationsFormateurComponent {
  formations!: Formation[];
  sessions!: Session[];
  user!: Formateur;
  constructor(private formationService: FormationsService, private sessionService: SessionService, private datePipe: DatePipe, private router: Router, private aroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);

    this.getAllSessions()
    this.getAllFormations()

  }


  getAllSessions() {
    this.sessionService.getAllSessions().subscribe({
      next: (res) => {
        this.sessions = res.filter(s => s.formateurs.includes(this.user.id!));
        console.log(this.sessions)
      }
    })
  }

  getAllFormations() {
    this.formationService.getAllFormation().subscribe({
      next: (res) => {
        this.formations = res;
      }
    })
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'd MMM') + ', ' + this.datePipe.transform(date, 'shortTime')
  }

  navigateToSessionDetails(id: string) {
    this.router.navigate(["../details-session", id], { relativeTo: this.aroute });
  }

}
