import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/interfaces/formation';
import { Session } from 'src/app/interfaces/session';
import { FormationsService } from 'src/app/services/formations.service';
import { SessionService } from 'src/app/services/session.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.css']
})
export class DetailsFormationComponent implements OnInit {
  constructor(private aroute: ActivatedRoute, private formationService: FormationsService, private sessionService: SessionService, private datePipe: DatePipe) { }

  formation!: Formation;
  sessions: Session[] = [];
  id!: string;
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


}
