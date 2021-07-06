import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>;
  isConnect: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // Fait référence au getter
    if (this.currentUserValue) {
      this.isConnect = true;
    } else {
      this.isConnect = false;
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Connexion utilisateur
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string) {
    // Envoie une méthode HTTP post au BACK
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { email, password }).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isConnect = true;
      return user;
    }));
  }

  /**
   * Déconnexion utilisateur
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isConnect = false;
    this.router.navigate(['/login']);
  }
}
