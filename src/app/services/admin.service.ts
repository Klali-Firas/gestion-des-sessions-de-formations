import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000';

  login(email: string, password: string) {
    return this.http.post<{ accessToken: string, user: Admin }>(`${this.apiUrl}/login`, { email, password })
  }

}
