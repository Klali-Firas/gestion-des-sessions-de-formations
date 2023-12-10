import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/interfaces/candidat';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.css']
})
export class MesFormationsComponent implements OnInit {
  formations!: Formation[];
  sessions!: Session[];
  user!: Candidat;
  constructor(private formationService: FormationsService, private sessionService: SessionService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);

    this.getAllSessions()
    this.getAllFormations()

  }


  getAllSessions() {
    this.sessionService.getAllSessions().subscribe({
      next: (res) => {
        this.sessions = res.filter(s => s.candidats.includes(this.user.id!));
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

}
