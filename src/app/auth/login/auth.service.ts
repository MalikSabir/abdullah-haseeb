import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host=window.location.hostname;
  private isAuthentecated = false;
  public loggedIn = false;
  private token: string;
  private tokenTimer : any;
  private authStatusListener = new Subject<boolean>();
  private messageSource = new BehaviorSubject('false');
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

getToken(){
    return this.token;
}
getIsAuth() {
    return this.isAuthentecated;
}
getUser(){
    return localStorage.getItem("userId");
}

getAuthStatusListener(){
    return this.authStatusListener.asObservable();
}

logIn(email: string, password: string) {
    this.http.post<any>("http://"+this.host+":3000/api/signin",{email,password})
    .subscribe(response => {
       const token = response.token;
       this.token = token;
       this.authStatusListener.next(true);
      if(token){
        this.messageSource.next('true');
        const expiresInDuration = response .expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthentecated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, response, expirationDate,);
        setTimeout((router : Router) => {this.router.navigate(['/dashboard']);} , 500);
      }
    });
}
autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
        return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationData.getTime() - now.getTime();
    if(expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthentecated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
        this.messageSource.next('true');
    }
}
isLoggedIn(){
    return this.loggedIn;
}

logOut() {
    this.token = null;
    this.isAuthentecated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.messageSource.next('false');
    this.router.navigate(['/']);
}    

private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
        this.logOut();
    }, duration * 1000);
}

private saveAuthData(token: string, response:any, expirationData: Date) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationData.toISOString());
}

private clearAuthData() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}

private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate) {
        return;
    }
    return {
        token: token,
        expirationData: new Date(expirationDate)
    }
}

}
