import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { MsnServiceService } from 'src/app/services/msn-service.service';
import { FunctionsService } from 'src/app/services/functions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  usuario = new Usuario
  userForm!: FormGroup
  formSubmited = false
  constructor(
    private readonly fb: FormBuilder,
    private functionsService: FunctionsService,
    private authService: AuthService,
    private msnService: MsnServiceService
  ) {
    this.createForm()
    this.setValue()
  }

  createForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]]

    });
  }
  setValue() {
    this.userForm.get('email')?.setValue('nuevo@mail.com')
    this.userForm.get('password')?.setValue('Oscar123')
  }
  onSubmit() {

    this.formSubmited = true

    this.usuario = {
      ...this.usuario,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    }

    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe((resp) => {
      console.log(resp)
      this.functionsService.setLocal('token', resp.token)
      this.functionsService.setLocal('uid', resp.uid)
      this.functionsService.setLocal('role', resp.role)
      this.functionsService.getLocal('role')
      this.functionsService.getLocal('uid')
      this.functionsService.getLocal('token')

      this.functionsService.navigate('core')
    },
      (err) => {
        console.log('err: ', err.error.errors);
        let error = `Correo o contraseña errónea`


        this.msnService.alerta('error', error)

      })



  }


  resetPassword(): void {
    this.functionsService.navigate('auth/reset-password')
  }
} 
