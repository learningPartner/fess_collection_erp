import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../Constant/Constant';
import { IUserObj } from '../../Model/interface/login';
import { CustomPipe } from '../../pipe/custom.pipe';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CustomPipe],
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
}
