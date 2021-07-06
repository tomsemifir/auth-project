import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Création d'un formGroup
  loginForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private authenticationService : AuthenticationService,
    private router : Router
    ) {
    // Définition du formGroup
    this.loginForm = this.fb.group({
      email : "",
      password : ""
    })
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecter, rediriger vers la page d'accueil.
    // Pas besoin de se logger si on est déjà logger.
    if(this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/home');
    }
  }

  /**
   * Appelle la méthode login(email, password) de AuthenticationService puis redirige vers la page d'accueil
   */
  login = () => {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe( () => {
      this.router.navigateByUrl("/home");
    })
  }

}
