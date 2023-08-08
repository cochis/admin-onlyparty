import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
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

  goToLogin(): void {
    this.router.navigateByUrl('auth/login', { replaceUrl: true });
  }
}
