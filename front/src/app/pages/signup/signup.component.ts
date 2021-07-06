import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm : FormGroup;

  showAlert = false;

  constructor(
    private authenticationService : AuthenticationService,
    private fb : FormBuilder,
    private router : Router
    ) { 
      this.userForm = this.fb.group({
        firstName : ["", Validators.required],
        lastName : ["", Validators.required],
        age : [0, Validators.required],
        username : ["", Validators.required],
        email : ["", Validators.required],
        password : ["", Validators.required]
      })
    }
  
  ngOnInit(): void {
  }

  /**
   * Appelle la méthode signup de AuthenticationService
   */
  signup = () => {
    this.authenticationService.signup(this.userForm.value).subscribe( () => {
      this.router.navigateByUrl("/home");
    }, (err) => {
      this.showAlert = true;
    })
  }

}
