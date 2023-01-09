import { CookieService } from 'ngx-cookie-service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CurrentUserDTO } from './../../DTOs/Account/CurrentUserDTO';
import { AuthService } from './../../services/auth.service';
import { LoginUserDTO } from './../../DTOs/Account/loginUserDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  @ViewChild('sweetAlert') private sweetAlert!: SwalComponent;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService){}
  ngOnInit(): void {
     this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)])
     });
  }
  submitLoginForm(){

    if(this.loginForm.valid){
      const loginData = new LoginUserDTO(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );

        this.authService.loginUser(loginData).subscribe(res=>{
          const currentUser = new CurrentUserDTO(
            res.data.userId,
            res.data.firstName,
            res.data.lastName,
            res.data.address
          );

          if(res.status === 'Success'){
            this.cookieService.set('eshop-cookie', res.data.token, res.data.expireTime * 60);
            this.authService.setCurrentUser(currentUser);
            this.loginForm.reset();
            this.router.navigate(['/'])
          }

          if(res.status === 'Error'){
            this.sweetAlert.text = res.data.message;
            this.sweetAlert.fire();
          } else if(res.status === 'NotFound'){
            this.sweetAlert.text = res.data.message;
            this.sweetAlert.fire();
          }

        });
    }
  }
}
