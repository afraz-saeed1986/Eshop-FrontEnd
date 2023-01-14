import { AuthService } from './../../services/auth.service';
import { RegisterUserDTO } from './../../DTOs/Account/RegisterUserDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

public registerForm!: FormGroup;
@ViewChild('sweetAlert') public readonly sweetAlert!: SwalComponent;
@ViewChild('successRegisterAlert') public readonly successRegisterAlert!: SwalComponent;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      firstName: new FormControl( null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      lastName: new FormControl( null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password: new FormControl( null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      confirmPassword: new FormControl( null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      address: new FormControl( null,
        [
          Validators.required,
          Validators.maxLength(500)
        ])
    });
  }


  submitRegisterForm(){
    //console.log(this.registerForm);
    const registerData = new RegisterUserDTO(
      this.registerForm.controls["email"].value,
      this.registerForm.controls["firstName"].value,
      this.registerForm.controls["lastName"].value,
      this.registerForm.controls["password"].value,
      this.registerForm.controls["confirmPassword"].value,
      this.registerForm.controls["address"].value,
    );


    this.authService.registerUser(registerData).subscribe(res => {
      console.log(res);
      if(res.status === 'Success'){
        this.successRegisterAlert.fire();
        this.registerForm.reset();
      }
      if(res.status === 'Error'){
        if(res.data.info === 'EmailExist'){
          this.sweetAlert.fire();
        }
      }
    });
  }

}
