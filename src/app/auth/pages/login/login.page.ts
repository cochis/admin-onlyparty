import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  submit(): void {
    console.log(this.form);
    this.router.navigateByUrl('core', { replaceUrl: true });
  }

  resetPassword(): void {
    this.router.navigateByUrl('auth/reset-password', { replaceUrl: true });
  }
}
