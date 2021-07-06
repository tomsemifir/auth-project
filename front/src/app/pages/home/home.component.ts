import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Récupère l'id de l'utilisateur stocké dans le localStorage
  currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.id;

  user : User;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    // Va chercher l'utilisateur dans la base de donnée grâce à son ID.
    this.userService.findById(this.currentUserId).subscribe(data => {
      this.user = data;
    })
  }

}
