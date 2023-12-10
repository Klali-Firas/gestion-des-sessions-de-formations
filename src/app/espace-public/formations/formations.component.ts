import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeFormation } from 'src/app/interfaces/demande-formation';
import { Formation } from 'src/app/interfaces/formation';
import { DemandeFormationService } from 'src/app/services/demande-formation.service';
import { FormationsService } from 'src/app/services/formations.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent {
  formations: Formation[] = [];
  categories: string[] = [];
  filteredFormations: Formation[] = [];
  isDemanding: boolean = false;

  constructor(private formatioService: FormationsService, private demandeService: DemandeFormationService, private router: Router) { }
  ngOnInit(): void {
    this.formatioService.getAllFormation().subscribe({
      next: (res) => {
        this.formations = res;
        this.filteredFormations = res;
        this.formations.map(formation => {
          formation.categorie.map(category => {
            if (!this.categories.includes(category)) {
              this.categories.push(category);
            }
          });
        });
      }
    })
  }

  filterFormations(tag: string) {
    this.filteredFormations = this.formations.filter(f => f.tags.some(t => t.includes(tag.toLowerCase())));
  }

  togglePopUp() {
    if (this.isDemanding) {
      document.body.classList.remove('prevent-scroll');
      this.isDemanding = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.isDemanding = true
    }
  }

  addDemande(objet: string, desc: string) {
    if (objet != "" && desc != "") {
      let demande: DemandeFormation = { objet, description: desc }
      this.demandeService.addDemande(demande).subscribe({
        error: (error) => {
          console.error(error);
        }
      });
      this.togglePopUp();
    }
  }
  navigateToFormation(id: string) {
    this.router.navigate(['formations', id]);
  }

}
