import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Session } from "../../commons/session";
import { PATH } from "../../app.constant";
import { SERVER_PATHS } from "../../app.constant";
import { Observable } from "rxjs/Rx";
import { AppHttpService } from "../../appHttp.service";
import { from } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class AuthService extends AppHttpService {
  constructor(public http: Http, private router: Router) {
    super(http);
  }

  public logIn(user) {
    // const httpOptions = {
    //   headers: new Headers({
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Access-Control-Allow-Methods": "POST,PUT, GET, OPTIONS, DELETE",
    //     "access-control-allow-headers": "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization",
    //     'Authorization': 'Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA=='
    //   })
    // };
    // const params = new HttpParams({
    //   fromObject: user
    // });
    let paramsNew = new URLSearchParams();
    // paramsNew.append("username", user.username);
    // paramsNew.append("password", user.password);
    // paramsNew.append("grant_type", "password");
    // paramsNew.append("client_id", "spring-security-oauth2-read-write-client");
    // return this.http.post(SERVER_PATHS.DEV + PATH.LOGIN_PATH, JSON.stringify(user), httpOptions).map(res => <any>res.json())
    // .catch(this.handleError);
    return this.create(PATH.SIGNIN, user).pipe( // this is sign in
      map((res) => {
        console.log("a");
        console.log(res);
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
    // const params = new HttpParams({
    //   fromObject: user
    // });

    // return this.http.post(SERVER_PATHS.DEV + PATH.LOGIN_PATH, JSON.stringify(params), httpOptions)
    //   .pipe(map((response) => {
    //     console.log(response.headers);
    //     var data = response.headers.get('authorization');
    //     console.log(data);

    //     if (data) {
    //       // store user details  in local storage to keep user logged in between page refreshes
    //       // localStorage.setItem('currentUserToken', data);
    //       Session.create(data)
    //     }
    //   }));
  }
  userByToken(): Observable<any> {
    return this.query(PATH.USER_BY_TOKEN).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  validateByToken(token): Observable<any> {
    let url = this.interpolateUrl(PATH.LOGIN_USER, { token: token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  logOut() {
    // remove user from local storage to log user out
    return this.http.post(SERVER_PATHS.DEV + PATH.LOGOUT, {}).pipe(
      map((response: Response) => {
        Session.deleteKey("token");
      })
    );
  }
  private handleError(error: Response) {
    console.log(error.json());
    if (error.json().error == "invalid_token") {
      this.router.navigate(["login"]);
    }
    return Observable.throw(error.json().error || "server error");
  }
}
