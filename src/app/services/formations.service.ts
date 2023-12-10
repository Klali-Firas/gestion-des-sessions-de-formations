import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from '../interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000/formations/';

  getAllFormation(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}`);
  }

  getFormationById(id: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}${id}`);
  }
}
