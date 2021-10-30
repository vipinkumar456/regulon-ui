import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { AppHttpService } from "../../appHttp.service";
import { PATH, SERVER_PATHS } from "../../app.constant";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class Tranche2Service extends AppHttpService {
  token: any;
  constructor(public http: Http) {
    super(http);
    this.token = this.getToken();
  }
  getAll(page, size, qt, tt, year, ttn) {
    let url = this.interpolateUrl(PATH.TRANCHE2_GET_ALL, {
      token: this.token,
      ttn: ttn,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getMaker( qt,rf, tt, year) {
    let url = this.interpolateUrl(PATH.TRANCHE2_MAKER, {
      token: this.token,
      qt: qt,
      rf:rf,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getChecker( qt, tt, year) {
    let url = this.interpolateUrl(PATH.TRANCHE2_CHECKER, {
      token: this.token,

      qt: qt,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getRejected( qt, rf, tt, year) {
    let url = this.interpolateUrl(PATH.TRANCHE2_MAKER, {
      token: this.token,

      qt: qt,
      rf:rf,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMakerAll(page, size, qt,rejectedFlag, tt, year, sort,) {
    let url = this.interpolateUrl(PATH.TRANCHE2_MAKER_ALL, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      rejectedFlag:rejectedFlag,
      tt: tt,
      year: year,
      sort: sort,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMakerSearchAll(page, size, qt, tt, type, word, year, ttn) {
    let url = this.interpolateUrl(PATH.TRANCHE2_MAKER_SEARCH, {
      token: this.token,
      ttn: ttn,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getCheckerAll(page, size, qt, tt, year,) {
    let url = this.interpolateUrl(PATH.TRANCHE2_CHECKER_ALL, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getCheckerSearchAll(page, size, qt, tt, type, word, year, ttn) {
    let url = this.interpolateUrl(PATH.TRANCHE2_CHECKER_SEARCH, {
      token: this.token,
      ttn: ttn,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getInfoAll(page, size, qt, tt, year, ttn) {
    let url = this.interpolateUrl(PATH.TRANCHE2_INFO_ALL, {
      token: this.token,
      page: page,
      ttn: ttn,
      size: size,
      qt: qt,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getInfoSearchAll(page, size, qt, tt, type, word, year, ttn) {
    let url = this.interpolateUrl(PATH.TRANCHE2_INFO_SEARCH, {
      token: this.token,
      page: page,
      ttn: ttn,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
      year: year,
    });

    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getRoles() {
    return this.query(PATH.USER_ROLES_ALL + "?access_token=" + this.token).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
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
  uploadDocs(formData: FormData, id, tt) {
    const url = this.interpolateUrl(PATH.TRANCHE1_FILE_UPLOAD, {
      token: this.token,
      id: id,
      tt: tt,
    });
    return this.upload(url, formData).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  import(formData: FormData, qt, year, tt) {
    const url = this.interpolateUrl(PATH.IMPORT, {
      token: this.token,
      qt: qt,
      year: year,
      tt: tt,
    });
    return this.upload(url, formData).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  downloadDocs(id) {
    const url = this.interpolateUrl(PATH.TRANCHE1_FILE_DOWNLOAD, {
      token: this.token,
      id: id,
    });
    return this.queryDownload(url).pipe(
      catchError(this.handleError.bind(this))
    );
    // return this.query(url).map(res => <any>res.json());
  }
  createUserRole(data, token) {
    return this.create(
      PATH.USER_ROLES_ALL + "?access_token=" + token,
      data
    ).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  createUser(data, token) {
    return this.create(PATH.USER_ALL + "?access_token=" + token, data).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  updateData(data, tt) {
    let url = this.interpolateUrl(PATH.TRANCHE2_UPDATE, {
      token: this.token,
      ttn: tt,
    });
    return this.patch(url, data).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  approveData(data, tt) {
    let url = this.interpolateUrl(PATH.TRANCHE2_APPROVE, {
      token: this.token,
      ttn: tt,
    });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  rejectData(data, tt) {
    let url = this.interpolateUrl(PATH.TRANCHE2_REJECT, {
      token: this.token,
      ttn: tt,
    });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res["_body"]);
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  downladExcel(qt, tt, year, reportType) {

    let reqData = {
      token: this.token,
      qt: qt,
      tt: tt,
      ttn: tt,
      year: year,
    }

    let url;

    if(reportType=='cleared'){
      url = this.interpolateUrl(PATH.TRANCHE2_DOWNLOAD, reqData);
    }

    if(tt==1 && reportType=='uncleared'){
      url = this.interpolateUrl(PATH.TRANCHE1_UNCLEARED_DOWNLOAD, reqData);
    }

    if(tt==2 && reportType=='uncleared'){
      url = this.interpolateUrl(PATH.TRANCHE2_UNCLEARED_DOWNLOAD, reqData);
    }

    if(tt==3 && reportType=='uncleared'){
      url = this.interpolateUrl(PATH.TRANCHE3_UNCLEARED_DOWNLOAD, reqData);
    }

    return this.queryDownload(url).pipe(
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error?.message == "Access Denied") {
      window.location.href = "/login";
    }
    return Observable.throwError(error.error || "server error");
  }
}
