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
export class Tranche1Service extends AppHttpService {
  token: any;
  constructor(public http: Http) {
    super(http);
    this.token = this.getToken();
  }
  getAll() {
    return this.query(PATH.TRANCHE1_ALL + "?access_token=" + this.token).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMaker( qt,rf, tt, year) {
    console.log('TRANCHE1_MAKER');
    console.log(PATH.TRANCHE1_MAKER);
    let url = this.interpolateUrl(PATH.TRANCHE1_MAKER, {
      
      token: this.token,

      qt: qt,
      rf:rf,
      tt: tt,
      year: year,
    });
    return this.query(url).pipe(    //here we get value from above url interpolate
      map((res) => {
        console.log('resgetmaker');
        console.log(res);
        return JSON.parse(res['_body'])
        
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getRejected( qt, rf, tt, year) {
    let url = this.interpolateUrl(PATH.TRANCHE1_MAKER, {
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
    let url = this.interpolateUrl(PATH.TRANCHE1_CHECKER, {
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
  // getSubmitted(qt, year, tt) {
  //   let url = this.interpolateUrl(PATH.SUBMITTEDVALUE, {
  //     token: this.token,
  //     qt: qt,
  //     trancheType:tt,
  //     year: year,
  //     username:"yashvant",

  //   });
  //   return this.query(url).pipe(
  //     map((res) => {
  //       return JSON.parse(res['_body'])
  //     }),
  //     catchError(this.handleError.bind(this))
  //   );
  // }
  getSubmitByOwners(co,qt,tt,year){
    let url=this.interpolateUrl(PATH.SUBMIT_BY_OWNER,{
      co:co,
      qt:qt,
      tt:tt,
      username:"yashvant",
      year:year

    });
       return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getMakerAll(page, size, qt, tt, year, sort, rejectedFlag) {
    let url = this.interpolateUrl(PATH.TRANCHE1_MAKER_ALL, {
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
  getSubmittedValue(qt, year, tt, page, size, sort) {
    let url = this.interpolateUrl(PATH.SUBMITTEDVALUE, {
      token: this.token,
      qt: qt,
      trancheType:tt,
      year: year,
      username:"yashvant",
      page: page,
      size: size,
      sort: sort,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMakerSearchAll(page, size, qt, tt, type, word, year, sort) {
    let url = this.interpolateUrl(PATH.TRANCHE1_MAKER_SEARCH, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
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
  getCheckerAll(page, size, qt, tt, year, sort) {
    let url = this.interpolateUrl(PATH.TRANCHE1_CHECKER_ALL, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
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
  getCheckerSearchAll(page, size, qt, tt, type, word, year, sort) {
    let url = this.interpolateUrl(PATH.TRANCHE1_CHECKER_SEARCH, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
      year: year,
      sort: sort,
    });
    return this.query(url)
      .map((res) => <any>res.json())
      .catch(this.handleError);
  }
  getInfoAll(page, size, qt, tt, year, sort) {
    let url = this.interpolateUrl(PATH.TRANCHE1_INFO_ALL, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
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
  getAuditAll(page, size, qt, tt, year, tranche, sort) {
    let url = this.interpolateUrl(PATH.AUDIT_GET, {
      token: this.token,
      tranche: tranche,
      page: page,
      size: size,
      qt: qt,
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
  auditSearch(page, size, qt, tt, year, tranche, dct, sort) {
    let url = this.interpolateUrl(PATH.AUDIT_SEARCH, {
      token: this.token,
      tranche: tranche,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      year: year,
      dct: dct,
      sort: sort,
    });
    return this.create(url, {}).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getInfoSearchAll(page, size, qt, tt, type, word, year, sort) {
    let url = this.interpolateUrl(PATH.TRANCHE1_INFO_SEARCH, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      tt: tt,
      type: type,
      word: word,
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
  getRoles() {
    return this.query(PATH.USER_ROLES_ALL + "?access_token=" + this.token).pipe(
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
  uploadDocs(formData: FormData, id, tt) {
    const url = this.interpolateUrl(PATH.TRANCHE1_FILE_UPLOAD, {
      token: this.token,
      id: id,
      tt: tt,
    });
    return this.upload(url, formData).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
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
  }

  downladExcel(qt, tt, year) {

    let reqData = {
      token: this.token,
      qt: qt,
      tt: tt,
      year: year,
    }

    let url;

    url = this.interpolateUrl(PATH.TRANCHE1_UNCLEARED_DOWNLOAD, reqData);
    console.log(url)
    return this.queryDownload(url).pipe(
      catchError(this.handleError.bind(this))
    );
  
  }

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
  updateData(data, tt) {
    let url = this.interpolateUrl(PATH.TRANCHE1_UPDATE, {
      token: this.token,
      ttn: tt,
    });
    return this.patch(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  approveData(data) {
    let url = this.interpolateUrl(PATH.TRANCHE1_APPROVE, { token: this.token });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }
  rejectData(data) {
    let url = this.interpolateUrl(PATH.TRANCHE1_REJECT, { token: this.token });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
    // return this.update(PATH.TRANCHE1_APPROVE, data).map(res => <any>res.json()).catch(this.handleError);;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error?.message == "Access Denied") {
      window.location.href = "/";
    }
    return Observable.throwError(error.error || "server error");
  }

  getMakerByStatus(page, size, qt, status, tt,year) {
    let url = this.interpolateUrl(PATH.TRANCHE1_MAKER_STATUS, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      status:status,
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
  getCheckerByStatus(page, size, qt, status, tt,year) {
    let url = this.interpolateUrl(PATH.TRANCHE1_CHECKER_STATUS, {
      token: this.token,
      page: page,
      size: size,
      qt: qt,
      status:status,
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

  downloadData(isMakerOrChecker,quarter, status,year) {
    let url = this.interpolateUrl(PATH.TRANCHE1_DOWNLOAD, {
      token: this.token,
      isMakerOrChecker: isMakerOrChecker,
      quarter: quarter,
      status: status,
      year: year,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
}
