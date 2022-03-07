import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {UserModel} from './user.model';

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

  user = new Subject<UserModel>();

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu9GPEe7TPc_LroSCaX2vEdIqu01feToI'
      , {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(
          this.handleError
        ),
        tap(responseData => {
          // firebase returns expire data bu seconds
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu9GPEe7TPc_LroSCaX2vEdIqu01feToI'
      , {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(
          this.handleError
        ),
        tap(responseData => {
          // firebase returns expire data bu seconds
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        })
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // handle network errors
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break
    }
    return throwError(errorMessage);
  }
}
