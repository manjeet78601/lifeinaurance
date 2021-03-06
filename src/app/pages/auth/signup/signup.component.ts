import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { properties } from '../../../properties/auth.constant';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Signup } from 'src/app/models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  htmlText = properties;
  isSignup = false;
  isAccountVerified = false;
  prevZipcodeVal = 10001;
  signupForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    userName: ['', [Validators.required, Validators.email]],
    signupPwd: ['', Validators.required],
    location: [10001, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    termsAndCond: ['', [Validators.required, Validators.requiredTrue]]
  });
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private loader: LoaderService) { }

  ngOnInit() {
    this.isSignup = false;
    this.isAccountVerified = false;
    this.getUserName();
  }
  ionViewDidEnter() {
    this.isSignup = false;
    this.isAccountVerified = false;
  }
  getUserName() {
    this.authService.subj.subscribe((data) => {
      if (!!data.name || !!data.emailId) {
        this.signupForm.patchValue({
          firstName: data.name || '',
          userName: data.emailId || ''
        });
      }
    });
  }
  checkZipCode(event: any) {
    if (this.signupForm.controls.location.value && this.signupForm.controls.location.value.toString().length > 5) {
      this.signupForm.patchValue({location: this.prevZipcodeVal});
      event.preventDefault();
      return false;
    }
    this.prevZipcodeVal = this.signupForm.controls.location.value;
  }
  onFormsubmit() {
    this.isSignup = true;
    this.isAccountVerified = true;
  }
  signin() {
    const signUpObj = new Signup(
      this.signupForm.controls.firstName.value,
      this.signupForm.controls.userName.value,
      this.signupForm.controls.signupPwd.value,
      this.signupForm.controls.location.value as string,
      '02/21/1988'
      );
    this.authService.signup(signUpObj).subscribe(() => {
      this.loader.showAutoHideLoader('', 1000);
      this.router.navigate(['/auth/signin']);
    }, (error) => {
      alert(error);
    });
    }
    gotoHomePage() {
      this.router.navigate(['/home']);
    }
}
