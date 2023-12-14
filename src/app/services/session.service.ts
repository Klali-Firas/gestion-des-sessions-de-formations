import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000/sessions';

  getAllSessions() {
    return this.http.get<Session[]>(`${this.apiUrl}`);
  }

  getSessionsByFormationId(id: string) {
    return this.http.get<Session[]>(`${this.apiUrl}?formation=${id}`)
  }
  getSessionsById(id: string) {
    return this.http.get<Session>(`${this.apiUrl}/${id}`)
  }

  updateSession(id: string, body: any) {
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }
  addSession(body: any) {
    return this.http.post(`${this.apiUrl}`, body);
  }
}
