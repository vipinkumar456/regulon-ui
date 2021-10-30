import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { MDBBootstrapModule } from "angular-bootstrap-md";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
// import { LoginComponent } from './auth/login/login.component';
import { P500Component } from "./error/500.component";
import { P404Component } from "./error/404.component";
import { RegisterComponent } from "./auth/register/register.component";
import { Profile1Component } from "./auth/profile/profile1.component";
import { FormsModule } from "@angular/forms";
import { QuarterComponent } from "./modals/quarter/quarter.component";
import { HttpModule } from "@angular/http";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from "./guards/auth-guard.service";
import { ConfirmPopUpComponent } from "./modals/confirm-pop-up/confirm-pop-up.component";
import { HistoryComponent } from "./history/history.component";
import { HelpComponent } from "./help/help.component";
import { OverviewComponent } from "./overview/overview.component";
import { GuidelinesComponent } from "./guidelines/guidelines.component";
import { DownloadComponent } from "./download/download.component";
// import { HashLocationStrategy,LocationStrategy } from '@angular/common';

// import { AddEditWorkflowComponent } from './add-edit-workflow/add-edit-workflow.component';
// import { WorkFlowComponent } from './work-flow/work-flow.component';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { Tranche2editComponent } from "./tranche2edit/tranche2edit.component";
import { Tranche3editComponent } from "./tranche3edit/tranche3edit.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FaqComponent } from "./faq/faq.component";
import { Tranche1EditComponent } from "./tranche1Edit/tranche1-edit.component";
// import { Tranche1EditComponent } from './tranche1Edit/tranche1-edit.component';
// import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import {MatDatepickerModule} from '@angular/d';
import { OnlyNumbersDirective } from "./Services/onlynum.directive";
import { NoCommaPipe } from "./Services/nocomma.pipe";
import {
  OnlyDecimalsDirective,
  TwoDecimals,
} from "./Services/onlydecimals.directive";
import { OnlyTimeDirective } from "./Services/time.directive";
import { SharedModule } from "./shared.module";
import { AppInterceptor } from "./Services/interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogoutComponent } from "./logout/logout.component";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms' 
@NgModule({
  imports: [
    BrowserModule,
   ReactiveFormsModule,//Add if needed 
   FormsModule,     //Add if needed
   HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
    }),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    AppComponent,
    P500Component,
    P404Component,
    RegisterComponent,
    Profile1Component,
    ...APP_CONTAINERS,
    QuarterComponent,
    ComingSoonComponent,
    ConfirmPopUpComponent,
    HistoryComponent,
    HelpComponent,
    OverviewComponent,
    GuidelinesComponent,
    DownloadComponent,
    Tranche2editComponent,
    Tranche3editComponent,
    DashboardComponent,
    FaqComponent,
    LogoutComponent
    // ,  OnlyNumbersDirective,
    // OnlyDecimalsDirective,
    // TwoDecimals,
    // OnlyTimeDirective,
    // NoCommaPipe,
  ],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },{provide:LocationStrategy,useClass:HashLocationStrategy}],
  entryComponents: [QuarterComponent,ConfirmPopUpComponent,Tranche2editComponent,Tranche3editComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
