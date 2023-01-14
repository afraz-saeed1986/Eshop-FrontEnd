import { ICheckUserAuthResult } from './../DTOs/Account/ICheckUserAuthResult';
import { CurrentUserDTO } from './../DTOs/Account/CurrentUserDTO';
import { ILoginUserAccount } from './../DTOs/Account/ILoginUserAccount';
import { LoginUserDTO } from './../DTOs/Account/loginUserDTO';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterUserDTO } from './../DTOs/Account/RegisterUserDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private currentUser?: CurrentUserDTO;
  private currentUser: BehaviorSubject<CurrentUserDTO> = new BehaviorSubject<CurrentUserDTO>(null!);

  constructor(private http: HttpClient) { }

setCurrentUser(user: CurrentUserDTO) : void {
  this.currentUser.next(user);
}

getCurrentUser(): Observable<CurrentUserDTO>{
  return this.currentUser;
}

  registerUser(registerData: RegisterUserDTO) : Observable<any> {
    return this.http.post<any>('/account/register', registerData);
  }

  loginUser(loginUserDTO: LoginUserDTO): Observable<ILoginUserAccount>{
    return this.http.post<ILoginUserAccount>('/account/login', loginUserDTO);
  }

  checkUserAuth(): Observable<ICheckUserAuthResult>{
     return this.http.post<ICheckUserAuthResult>('/account/checked-auth', null);
  }

  logOutUser(): Observable<any> {
   return this.http.get('/account/sign-out');
  }

  activateUser(emailActiveCode: string): Observable<any>{
    return this.http.get('/account/activate-account/'+ emailActiveCode);
  }
}
