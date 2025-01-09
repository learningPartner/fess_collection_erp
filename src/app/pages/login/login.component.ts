import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserObj } from '../../Model/login';
import { Constant } from '../../Constant/Constant';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginObj: IUserObj = {
    username: '',
    password: '',
  };

  router = inject(Router);

  onLogin(form: any) {
    if (form.invalid) {
      form.controls.username.markAsTouched();
      form.controls.password.markAsTouched();
      return;
    }
    if (this.loginObj.username == 'Admin' && this.loginObj.password == '1122') {
      this.router.navigateByUrl('admin/dashboard');
      // this.router.navigate(['admin/dashboard'])
    } else {
      alert('Wrong credential');
    }
  }

  get requiredMessage() {
    return Constant.VALIDATION_MESSAGE.REQUIRED;
  }
}
