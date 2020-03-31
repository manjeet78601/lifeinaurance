import { Injectable } from '@angular/core';
import { Profile } from '../properties/auth.constant';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Signup, Signin} from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
financeURL =  '../../assets/json/profile/financial-details.json';
userInfo: Signup = new Signup('', '', '', '', '');
bDate: string;
  constructor(private http: HttpClient) { }
  login(loginObj: Signin): Observable<boolean> {
    if (loginObj.userName === this.userInfo.userName && loginObj.password === this.userInfo.password) {
     return  of(true);
    } else {
      return throwError('Invaid Credentials');
    }
  }
  signup(user: Signup): Observable<boolean>  {
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
         this.userInfo[key] = user[key];
      }
    }
    return of(true);
  }
  get userName() {
    return this.userInfo.firstName;
  }
  get userBirthDate() {
    return this.userInfo.birthDate;
  }
  getUserFinancialDetails() {
    return this.http.get(this.financeURL);
  }
}
