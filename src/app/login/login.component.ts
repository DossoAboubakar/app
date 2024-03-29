import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  message : string;
  password: string;
  auth: AuthService;
  name: string;
  constructor( private authService : AuthService, private router : Router){


  }
ngOnInit(): void {
this.auth = this.authService
  
}
setMessage() {
  if(this.auth.isLoggedIn) {
    this.message = 'Vous êtes connecté.';
  } else {
    this.message = 'Indentifiant ou mot de passe incorrect.'
  }
}
  login() {
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }

}

