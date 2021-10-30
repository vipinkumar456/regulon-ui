import { Tranche3Service } from './Services/tranche3.service';
import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { OnlyNumbersDirective } from "./Services/onlynum.directive";
import { NoCommaPipe } from "./Services/nocomma.pipe";
import {
  OnlyDecimalsDirective,
  TwoDecimals,
} from "./Services/onlydecimals.directive";
import { OnlyTimeDirective } from "./Services/time.directive";
import { ConfirmPopUpComponent } from './modals/confirm-pop-up/confirm-pop-up.component';
import { Tranche2Service } from './Services/tranche2.service';
import { Tranche1Service } from './Services/trenche1.service';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Tranche1EditComponent } from './tranche1Edit/tranche1-edit.component';

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    OnlyDecimalsDirective,
    TwoDecimals,
    OnlyTimeDirective,
    NoCommaPipe,
    Tranche1EditComponent

  ],

  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  exports:[
    CommonModule,
    HttpModule,
    FormsModule,
    MDBBootstrapModule,
    TabsModule,
    BsDatepickerModule,
    OnlyNumbersDirective,
    OnlyDecimalsDirective,
    TwoDecimals,
    OnlyTimeDirective,
    NoCommaPipe,Tranche1EditComponent
  ],
  providers: [Tranche1Service, Tranche2Service, Tranche3Service, ConfirmPopUpComponent],
  entryComponents:[Tranche1EditComponent]
})
export class SharedModule {}
