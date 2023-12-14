import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formateur } from 'src/app/interfaces/formateur';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
  selector: 'app-gestion-formateurs',
  templateUrl: './gestion-formateurs.component.html',
  styleUrls: ['./gestion-formateurs.component.css']
})
export class GestionFormateursComponent {
  formateurs!: Formateur[];

  constructor(private formateurService: FormateurService, private router: Router, private aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCandidats()
  }

  getAllCandidats() {
    this.formateurService.getAllFormateurs().subscribe({
      next: (res) => {
        this.formateurs = res;
      }
    })
  }
  navigateToCandiatDetails(id: string) {
    this.router.navigate(["../modifier-formateur", id], { relativeTo: this.aroute });
  }
}
