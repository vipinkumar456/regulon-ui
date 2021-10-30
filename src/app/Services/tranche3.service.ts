import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { AppHttpService } from './../../appHttp.service';
import { InterPolateUrlService } from './../../commons/InterPolateUrl.service';
import { Injectable } from '@angular/core';
import { PATH } from '../../app.constant';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/RX';

@Injectable({
  providedIn: 'root'
})
export class Tranche3Service extends AppHttpService {

  token:any

  constructor(public http:Http) {
    super(http);
    this.token=this.getToken();
  }

  getMakerAll(page, size, qt,rejectedFlag, tt, year, sort,) {
    let url = this.interpolateUrl(PATH.TRANCHE3_MAKER_ALL, {
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


  getMaker(qt,rf,tt,year){
    let url=this.interpolateUrl(PATH.TRANCHE3_MAKER,{
      token:this.token,
      qt:qt,
      rf:rf,
      tt:tt,
      year:year
    });
    return this.query(url).pipe(
      map((res)=>{
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    )
  }

  getChecker( qt, tt, year) {
    let url = this.interpolateUrl(PATH.TRANCHE3_CHECKER, {
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
    let url = this.interpolateUrl(PATH.TRANCHE3_MAKER, {
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


  private handleError(error: HttpErrorResponse) {
    if (error.error?.message == "Access Denied") {
      window.location.href = "/login";
    }
    // return Observable.throwError(error.error || "server error");
  }
}




