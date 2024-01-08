import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    try {
      if (this.loginForm?.valid) {
        const loading = await this.loadingCtrl.create();
        loading.present();
        await this.authService
          .loginUser(
            this.loginForm.controls['email']?.value,
            this.loginForm.controls['password']?.value
          )
          .then((res) => {
            console.log(res);
            this.router.navigate(['/home']);
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
