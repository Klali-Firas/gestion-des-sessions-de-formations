import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from '../interfaces/formateur';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000';

  register(body: any) {
    return this.http.post<{ accessToken: string, user: Formateur }>(`${this.apiUrl}/register`, body)
  }
  login(email: string, password: string) {
    return this.http.post<{ accessToken: string, user: Formateur }>(`${this.apiUrl}/login`, { email, password })
  }
}
