import { Injectable, Inject, Optional } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { tap, finalize } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token= localStorage.getItem("rbsToken")
    console.log(token);
    req = req.clone({
      url: req.url,
      setHeaders: {
        // Authorization: `Bearer ${token}`,
      },
    });
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => this.spinner.hide()),
      tap(
        (event) => {
          if (event instanceof HttpErrorResponse) {
            this.handleErrorStatus(event.status);
          }
        },
        (err) => {
          console.log(err)
          this.handleErrorStatus(err.status);
          return throwError(err);
        }
      )
    )
    
  }

  private handleErrorStatus(status: number) {
    if (status === 403 || status === 401 || status === 302) {
      this.router.navigate(["/"]);
    }
  }


}
