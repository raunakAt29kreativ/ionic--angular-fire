import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  user: any = this.authService.getProfile();
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.setUser();
  }

  async setUser() {
    this.authService.getProfile().then((user) => {
      this.user = user;
    })
  }

  sendVerificationMail() {
    this.authService.sendVerificationMail();
  }
}
