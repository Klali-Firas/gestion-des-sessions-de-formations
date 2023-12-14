import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/interfaces/formation';
import { FormationsService } from 'src/app/services/formations.service';

@Component({
  selector: 'app-gestion-formations',
  templateUrl: './gestion-formations.component.html',
  styleUrls: ['./gestion-formations.component.css']
})
export class GestionFormationsComponent implements OnInit {
  formations!: Formation[];
  creatingNewFormation: boolean = false;
  constructor(private router: Router, private formationService: FormationsService, private formBuilder: FormBuilder, private titleCase: TitleCasePipe) { }
  courseForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    chargeHoraire: ['', [Validators.required, Validators.min(0)]],
    programme: ['', Validators.required],
    difficulte: ['débutant', Validators.required],
    tags: ['', [Validators.required]],
    categorie: ['', [Validators.required]],
    imageRefernce: ['', Validators.required]
  });



  onSubmit() {
    let formation: Formation = {
      titre: this.courseForm.get('titre')!.value!.trim(),
      difficulte: this.courseForm.get('difficulte')!.value! as "débutant" | "intermédiare" | "avancé",
      description: this.courseForm.get('description')!.value!.trim(),
      imageRefernce: this.courseForm.get('imageRefernce')!.value!.trim(),
      programme: this.courseForm.get('programme')!.value!.trim(),
      chargeHoraire: parseInt(this.courseForm.get('chargeHoraire')!.value!),
      categorie: this.titleCase.transform(this.courseForm.get('categorie')!.value!.trim()).split(" "),
      tags: this.courseForm.get('tags')!.value!.trim().toLowerCase().split(" "),

    }
    this.formationService.addFormation(formation).subscribe({
      next: (res) => {
        this.getAllFormations();
        this.courseForm.reset();
        this.togglePopUp();
      }
    })
  }
  ngOnInit(): void {

    this.getAllFormations();
    this.courseForm.valueChanges.subscribe(value =>
      console.log())
  }


  getAllFormations() {
    this.formationService.getAllFormation().subscribe({
      next: (res) => {
        this.formations = res;
      }
    })
  }
  togglePopUp() {
    if (this.creatingNewFormation) {
      document.body.classList.remove('prevent-scroll');
      this.creatingNewFormation = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.creatingNewFormation = true
    }
  }

  navigateToSessions(id: string) {
    this.router.navigate(['administrateur/gestion-sessions', id],)
  }
}
