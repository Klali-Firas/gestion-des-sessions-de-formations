import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/interfaces/formation';
import { FormationsService } from 'src/app/services/formations.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  formations: Formation[] = [];
  categories: string[] = [];

  constructor(private formatioService: FormationsService) { }
  ngOnInit(): void {
    this.formatioService.getAllFormation().subscribe({
      next: (res) => {
        this.formations = res;
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

  findFirstFormationByCategorie(cat: string) {
    return this.formations.find((form) => form.categorie.includes(cat));
  }
  findAllFormationByCategorie(cat: string) {
    return this.formations.filter((form) => form.categorie.includes(cat));
  }


}
