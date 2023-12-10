import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeFormation } from '../interfaces/demande-formation';

@Injectable({
  providedIn: 'root'
})
export class DemandeFormationService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000/demande-formation';

  addDemande(demande: DemandeFormation) {
    return this.http.post(`${this.apiUrl}`, demande);
  }

}
