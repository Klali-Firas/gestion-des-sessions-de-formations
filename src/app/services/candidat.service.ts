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

}
