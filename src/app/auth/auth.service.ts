import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  AuthData
} from './auth-data.model';
import {
  Subject
} from 'rxjs';
import {
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  // private tokenTimer: any;
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject < boolean > ();

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post < {
        result: string,
        message: string
      } > ('https://psat.herokuapp.com/user/signup', authData)
      .subscribe(response => {
        console.log(response.message);
        if (response.message == 'User created!') {
          this.login(email, password);
        }
      });

  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post < {
        token: string,
        epiresIn: number
      } > ('https://psat.herokuapp.com/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        console.log(token);
        if (token) {
          // const expiresInDuration = response.epiresIn;
          // this.tokenTimer = setTimeout(() => {this.logout(); }, expiresInDuration * 1000);
          this.isAuthenticated = true;
          this.router.navigate(['/']);
          this.authStatusListener.next(true);

        }
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}