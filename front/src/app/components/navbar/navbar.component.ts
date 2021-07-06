import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  /**
   * Appelle la méthode logout() de AuthenticationService
   */
  logout = () => {
    this.authenticationService.logout();
  }

}
