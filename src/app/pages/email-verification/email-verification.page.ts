import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {
  message: string = "Verifying..."
  isVerified: boolean = false;
  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit() {
    this.verifyEmail();
  }
  async verifyEmail() {
    try {
      const code = this.route.snapshot.queryParams['oobCode'];
      const mode = this.route.snapshot.queryParams['mode'];
      if (mode === "resetPassword")  {
        this.router.navigateByUrl(`/new-password?mode=${mode}&oobCode=${code}&apiKey=${environment.firebaseConfig.apiKey}`)
        return;
      }
      const loading = await this.loadingCtrl.create();
      loading.present();
      this.authService
        .verifyEmail(code)
        .then(() => {
          this.message = 'Email verification succesful!';
          this.isVerified = true;
          loading.dismiss();
        })
        .catch((err) => {
          this.message = 'Something went wrong: ' + err.code;
          loading.dismiss();
        });
    } catch (error) {
      console.log(error)
    }
  }
}
