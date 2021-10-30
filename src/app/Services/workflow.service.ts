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
export class WorkFlowService extends AppHttpService {
  token: any;
  constructor(public http: Http) {
    super(http);
    this.token = this.getToken();
  }
  getAll(page, size, sort) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_ALL, {
      token: this.token,
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
  getSearchAll(page, size, sort, type, word) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_SEARCH_ALL, {
      token: this.token,
      page: page,
      size: size,
      sort: sort,
      type: type,
      word: word,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getUnMapped(page, size, sort, workId, dep, tranche, risk) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_UNMAPPED, {
      workId: workId,
      page: page,
      size: size,
      sort: sort,
      token: this.token,
      dpt: dep,
      tranche: tranche,
      risk: risk,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getUnMappedByRisk(page, size, sort, workId, dep, tranche, risk) {
    let url = this.interpolateUrl(PATH.UNMAPPED_DCT_BY_RISK_TYPE, {
      workId: workId,
      page: page,
      size: size,
      sort: sort,
      token: this.token,
      dpt: dep,
      tranche: tranche,
      risk: risk,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMappedByRisk(page, size, sort, workId, dep, tranche, risk) {
    let url = this.interpolateUrl(PATH.MAPPED_DCT_BY_RISK_TYPE, {
      workId: workId,
      page: page,
      size: size,
      sort: sort,
      token: this.token,
      dpt: dep,
      tranche: tranche,
      risk: risk,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getMapped(page, size, sort, workId, dep, tranche) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_MAPPED, {
      workId: workId,
      page: page,
      size: size,
      sort: sort,
      token: this.token,
      dpt: dep,
      tranche: tranche,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getRiskTypesAll() {
    let url = this.interpolateUrl(PATH.RISK_TYPES_ALL, {
      token: this.token,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getWorkFlowById(id) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_BY_ID, {
      token: this.token,
      id: id,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  deleteWorkFlowById(id) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_BY_ID, {
      token: this.token,
      id: id,
    });
    return this.delete(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  createWorkFlow(data) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_ALL, { token: this.token });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  updateWorkFlow(data) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_ALL, { token: this.token });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  createWorkflowDct(id, data) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_DCT, {
      id: id,
      token: this.token,
    });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  addWorkflowDcts(id, data) {
    let url = this.interpolateUrl(PATH.ADD_WORKFLOW_DCTS, {
      id: id,
      token: this.token,
    });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  deleteWorkflowDcts(id, data) {
    let url = this.interpolateUrl(PATH.DELETE_WORKFLOW_DCTS, {
      id: id,
      token: this.token,
    });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getWorkflowDct(id) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_DCT, {
      id: id,
      token: this.token,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  createWorkflowUsers(id, data) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_USER, {
      id: id,
      token: this.token,
    });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getWorkflowUsers(id) {
    let url = this.interpolateUrl(PATH.WORK_FLOW_USER, {
      id: id,
      token: this.token,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getDcts(page, size, sort) {
    let url = this.interpolateUrl(PATH.DCT_ALL, {
      token: this.token,
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
  getSearchDcts(page, size, sort, type, word) {
    let url = this.interpolateUrl(PATH.DCT_SEARCH_ALL, {
      token: this.token,
      page: page,
      size: size,
      sort: sort,
      type: type,
      word: word,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getDctById(id) {
    let url = this.interpolateUrl(PATH.DCT_ID, { id: id, token: this.token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  deleteDctById(id) {
    let url = this.interpolateUrl(PATH.DCT_ID, { id: id, token: this.token });
    return this.delete(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
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
  createDct(data) {
    let url = this.interpolateUrl(PATH.DCT, { token: this.token });
    return this.create(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  updateDct(data) {
    let url = this.interpolateUrl(PATH.DCT, { token: this.token });
    return this.update(url, data).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
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
  //   updateData(data) {
  //     return this.update(PATH.USER_GROUP, data).map(res => <any> res.json()).catch(this.handleError);;
  //   }

  getDctUnits() {
    let url = this.interpolateUrl(PATH.GET_DCT_UNITS, { token: this.token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getDctTypes() {
    let url = this.interpolateUrl(PATH.DCT_TYPS, { token: this.token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getTrancheTypes() {
    let url = this.interpolateUrl(PATH.TRANCHE_TYPES, { token: this.token });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getQts(date) {
    let url = this.interpolateUrl(PATH.GET_QUARTERS, {
      token: this.token,
      date: date,
    });
    return this.query(url).pipe(
      map((res) => {
        return JSON.parse(res['_body'])
      }),
      catchError(this.handleError.bind(this))
    );
  }
  private handleError(error: Response) {
    // if ((error.json().error = "invalid_token")) {

    // }
    return Observable.throw(error.json().error || "server error");
  }
}
