import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidat } from '../interfaces/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000';

  register(body: any) {
    return this.http.post<{ accessToken: string, user: Candidat }>(`${this.apiUrl}/register`, body)
  }
  login(email: string, password: string) {
    return this.http.post<{ accessToken: string, user: Candidat }>(`${this.apiUrl}/login`, { email, password })
  }

  getAllCandidats() {
    return this.http.get<Candidat[]>(`${this.apiUrl}/users?type=candidat`);
  }


  getCandidatById(id: string) {
    return this.http.get<Candidat>(`${this.apiUrl}/users/${id}`);
  }

  updateCandidatPassword(id: string, password: string) {
    return this.http.patch<Candidat>(`${this.apiUrl}/users/${id}`, { password });
  }

  updateCandidatData(id: string, data: any) {
    return this.http.patch<Candidat>(`${this.apiUrl}/users/${id}`, data);
  }

  deleteCandidat(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

}
