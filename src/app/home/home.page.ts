import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getProfile().then((user: any) =>console.log(user?.email))
  }

}
