import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu9GPEe7TPc_LroSCaX2vEdIqu01feToI'
      , {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(
      error => {
        let errorMessage = 'An unknown error occurred!';
        // handle network errors
        if (!error.error || !error.error.error) {
          return throwError(errorMessage);
        }
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.';
        }
        return throwError(errorMessage);
      }
    ));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu9GPEe7TPc_LroSCaX2vEdIqu01feToI'
      , {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(
      error => {
        let errorMessage = 'An unknown error occurred!';
        // handle network errors
        if (!error.error || !error.error.error) {
          return throwError(errorMessage);
        }
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.';
        }
        return throwError(errorMessage);
      }
    ));
  }
}
