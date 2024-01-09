import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  constructor(public ngFireAuth: AngularFireAuth) { 
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
         JSON.parse(localStorage.getItem('user')!);
      } else{
        localStorage.setItem('user', 'null');
         JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  registerUser(name: string, email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email,password).then((res) => {
      return res.user?.updateProfile({
        displayName: name!
      })
    })
  }

  async sendVerificationMail() {
    return (await this.ngFireAuth.currentUser)?.sendEmailVerification();
  }

  loginUser(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email,password);
  }

  resetPassword(email: string) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }
  
  singOut() {
    return this.ngFireAuth.signOut();
  }

  verifyEmail(code: any) {
    return this.ngFireAuth.applyActionCode(code)
  }

  changePassword(code: any, password: string) {
    return this.ngFireAuth.confirmPasswordReset(code,password);
  }

  async getProfile() {
    const user = await this.ngFireAuth.currentUser;
    return user;
  }
}
