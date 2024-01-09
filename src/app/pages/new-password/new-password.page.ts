import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      { validators: confirmPasswordValidator }
    );
  }

  get errorControl() {
    return this.form?.controls;
  }

  onChangePassword() {
    if (this.form.valid) {
      this.authService.changePassword(
        this.route.snapshot.queryParams['oobCode'],
        this.form.controls['password'].value
      ).then((res) => {
        console.log("Successfull changed password");
        this.router.navigateByUrl('/login');
      }).catch(err => {
        console.log(err)
      });
    } else {
      console.log('Invalid form');
    }
  }
}
