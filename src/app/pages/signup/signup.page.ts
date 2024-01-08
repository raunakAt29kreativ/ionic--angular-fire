import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      // name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    try {
      if (this.regForm?.valid) {
        const loading = await this.loadingCtrl.create();
        loading.present();
        await this.authService
          .registerUser(
            this.regForm.controls['email']?.value,
            this.regForm.controls['password']?.value
          )
          .then((res) => {
            this.authService.sendVerificationMail()
            this.router.navigate(['/verify-email']);
          })
          .catch((err) => {
            console.log('Registration Failed!');
            console.log(err);
          });
        loading.dismiss();
      } else {
        console.log('Form invalid');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
