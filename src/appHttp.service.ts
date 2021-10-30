/**
 * Created by seshu on 07-03-2016.
 */

import { SERVER_PATHS } from "./app.constant";
import {
  Http,
  RequestOptionsArgs,
  RequestOptions,
  Headers,
  Response,
  ResponseContentType,
} from "@angular/http";
import { Session } from "./commons/session";
import { Observable } from "rxjs/Observable";
import { InterPolateUrlService } from "./commons/InterPolateUrl.service";

export class AppHttpService extends InterPolateUrlService {
  public headers: Headers;
  public headersNew: Headers;
  http: Http;

  defaultOptionsArgs: RequestOptionsArgs;

  constructor(http: Http) {
    super();
    this.http = http;
    this.headers = new Headers();
    this.headersNew = new Headers();
    this.headers.append("Content-Type", "application/json");
    // this.headers.append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    // this.headers.append('Access-Control-Allow-Origin', '*');
  }
  getToken() {
    console.log(localStorage.getItem("rbsToken"))
    if (sessionStorage.getItem("rbsToken")) {
      let user = JSON.parse(sessionStorage.getItem("rbsToken"));
      return user["access_token"];
    }
  }
  getUrl(servicePath: String) {
    return SERVER_PATHS.DEV + servicePath;
  }

  create(
    servicePath: string,
    model: any,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.post(url, JSON.stringify(model), options);
  }

  createNew(
    servicePath: string,
    model: any,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    let headersNew = new Headers();
    this.defaultOptionsArgs = {
      headers: headersNew,
    };
    const url = this.getUrl(servicePath);
    this.defaultOptionsArgs.headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    this.defaultOptionsArgs.headers.append(
      "Authorization",
      "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA=="
    );
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.post(url, model, options);
  }

  update(
    servicePath: string,
    model: any,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.put(url, JSON.stringify(model), options);
  }
  patch(
    servicePath: string,
    model: any,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.patch(url, JSON.stringify(model), options);
  }
  updateWithoutJson(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.put(url, null, options);
  }

  delete(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.delete(url, options);
  }
  deleteBody(servicePath: string, data): Observable<Response> {
    this.setHeaders();
    const url = this.getUrl(servicePath);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: this.headers,
      body: data,
    });

    return this.http.delete(url, options);
  }

  query(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    let headersNew = new Headers();
    this.defaultOptionsArgs = {
      headers: headersNew,
    };
    const url = this.getUrl(servicePath);
    this.defaultOptionsArgs.headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    this.defaultOptionsArgs.headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("rbsToken")
    );
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.get(url, options);
  }
  queryMPA(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.headers.append("Authorization", "Ga8f6lOXpJJzdKL5brNRu5Jcvgm8s5Q6");
    this.headers.append("apikey", "Ga8f6lOXpJJzdKL5brNRu5Jcvgm8s5Q6");
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.set("TRN-Api-Key", "Ga8f6lOXpJJzdKL5brNRu5Jcvgm8s5Q6");
    this.defaultOptionsArgs = {
      headers: this.headers,
    };
    const url = servicePath;
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.get(url, options);
  }

  queryDownload(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setFilDownloadHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.get(url, options);
  }

  queryPdf(
    servicePath: string,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setFilDownloadHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.get(url, options);
  }
  createPdf(
    servicePath: string,
    model: any,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setPostFilDownloadHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.post(url, JSON.stringify(model), options);
  }

  upload(
    servicePath: string,
    formData: FormData,
    _options?: RequestOptionsArgs
  ): Observable<Response> {
    this.setFilUploadHeaders();
    const url = this.getUrl(servicePath);
    const options = _options ? _options : this.defaultOptionsArgs;
    return this.http.post(url, formData, options);
  }

  setHeaders() {
    this.headers.delete("Authorization");
    if (Session.getToken() && Session.getToken() !== "undefined") {
    this.headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("rbsToken")
    );
    }
    this.defaultOptionsArgs = {
      headers: this.headers,
    };
  }

  setFilUploadHeaders() {
    const _headers = new Headers();
    _headers.delete("Authorization");
    _headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("rbsToken")
    );
    _headers.delete("Content-Type");
    this.defaultOptionsArgs = {
      headers: _headers,
    };
  }

  setFilDownloadHeaders() {
    const _headers = new Headers();
    _headers.delete("Authorization");
    _headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("rbsToken")
    );
    _headers.append("Accept", "*/*");

    _headers.delete("Content-Type");
    this.defaultOptionsArgs = {
      headers: _headers,
      responseType: ResponseContentType.Blob,
    };
  }
  setPostFilDownloadHeaders() {
    const _headers = new Headers();
    _headers.delete("Authorization");
    if (Session.getToken() && Session.getToken() !== "undefined") {
      _headers.append("Authorization", Session.getToken());
      _headers.append("Accept", "application/pdf");
      _headers.append("Content-Type", "*/*");
    }
    // _headers.delete('Content-Type');
    this.defaultOptionsArgs = {
      headers: _headers,
      responseType: ResponseContentType.Blob,
    };
  }
}
