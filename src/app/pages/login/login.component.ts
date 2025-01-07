import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginObj: any = {
    username:'',
    password: ''
  };

  router =  inject(Router);

  onLogin() {
    if(this.loginObj.username == "Admin" && this.loginObj.password =="1122") {
      this.router.navigateByUrl("admin/dashboard");
     // this.router.navigate(['admin/dashboard'])
    } else {
      alert("Wrong credential")
    }
  }
}
