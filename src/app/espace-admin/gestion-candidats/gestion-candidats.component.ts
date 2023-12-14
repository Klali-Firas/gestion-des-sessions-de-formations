import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from 'src/app/interfaces/candidat';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-gestion-candidats',
  templateUrl: './gestion-candidats.component.html',
  styleUrls: ['./gestion-candidats.component.css']
})
export class GestionCandidatsComponent implements OnInit {
  candidats!: Candidat[];

  constructor(private candidatService: CandidatService, private router: Router, private aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCandidats()
  }

  getAllCandidats() {
    this.candidatService.getAllCandidats().subscribe({
      next: (res) => {
        this.candidats = res;
      }
    })
  }
  navigateToCandiatDetails(id: string) {
    this.router.navigate(["../modifier-candidat", id], { relativeTo: this.aroute });
  }

}
