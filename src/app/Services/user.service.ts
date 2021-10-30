import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { AppHttpService } from "../../appHttp.service";
import { PATH, SERVER_PATHS } from "../../app.constant";
import { HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class UserService extends AppHttpService {
  token: any;
  constructor(public http: Http) {
    super(http);
    this.token = this.getToken();
  }
  getAll(token) {
    let url = this.interpolateUrl(PATH.TRANCHE1_APPROVE, { token: this.token });
    console.log(token);
    return this.query(PATH.USER_ALL + "?access_token=" + token).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getReports(qt, year) {
    let url = this.interpolateUrl(PATH.REPORTS, {
      qt: qt,
      year: year,
      token: this.token,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getSubmittedRecord(qt, year, tracheType) {
    let url = this.interpolateUrl(PATH.SUBMITTEDRECORD, {
      qt: qt,
      year: year,
      trancheType: tracheType,
      token: this.token,
    });
    console.log('URZZZL:'+url)
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getUser() {
    console.log(this.token);
    let url = this.interpolateUrl(PATH.LOGIN_USER, { token: this.token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  validateUser() {
    return this.create(PATH.VALIDATE_USER, {}).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getRoles(token) {
    return this.query(PATH.USER_ROLES_ALL + "?access_token=" + token).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  //   getById(id):Observable<any> {
  //     let url=this.interpolateUrl(PATH.USER_GROUP_BY_ID,{id:id});
  //     return this.query(url).map(res => <any> res.json())
  //     .catch(this.handleError);
  //   }
  //   deleteById(id){
  //     let url=this.interpolateUrl(PATH.USER_GROUP_BY_ID,{id:id});
  //     return this.delete(url).map(res => <any> res.json())
  //       .catch(this.handleError);
  //   }
  createUserRole(data, token) {
    return this.create(
      PATH.USER_ROLES_ALL + "?access_token=" + token,
      data
    ).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  createUser(data, token) {
    return this.create(PATH.USER_ALL + "?access_token=" + token, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  //   updateData(data) {
  //     return this.update(PATH.USER_GROUP, data).map(res => <any> res.json()).catch(this.handleError);;
  //   }
  private handleError(error: Response) {
    return Observable.throw(error.json().error || "server error");
  }
}
