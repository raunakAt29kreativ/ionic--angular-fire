import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  get errorControl() {
    return this.resetForm?.controls;
  }

  async resetPassword() {
    try {
      if (this.resetForm?.valid) {
        const loading = await this.loadingCtrl.create();
        loading.present();
        await this.authService
          .resetPassword(
            this.resetForm.controls['email']?.value,
          )
          .then((res) => {
            console.log(res);
            this.router.navigate(['/login']);
          })
          .catch((err) => console.log(err.message));
        loading.dismiss();
      } else {
        console.log('Form invalid');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
