import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value);

    if (!authForm.valid) {
      return;
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;

      this.isLoading = true;
      if (this.isLoginMode) {
        // login logic
      } else {
        // signup logic
        this.authService.signup(email, password)
          .subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
          }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          });
      }

      authForm.reset();
    }
  }
}
