import { Tranche3Service } from './../../Services/tranche3.service';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Tranche1Component } from "../tranche1/tranche1.component";
import { TrancheRoutingModule } from "./tranche-routing.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { Tranche2Component } from "../tranche2/tranche2.component";
import { Tranche1Service } from "../../Services/trenche1.service";
import { Tranche2Service } from "../../Services/tranche2.service";
import { HttpModule } from "@angular/http";
import { TabsModule } from "ngx-bootstrap/tabs";
import { CheckerDataComponent } from "../tranche1/checker-data/checker-data.component";
import { MakerDataComponent } from "../tranche1/maker-data/maker-data.component";
import { InfoDataComponent } from "../tranche1/info-data/info-data.component";
import { ConfirmPopUpComponent } from "../../modals/confirm-pop-up/confirm-pop-up.component";
import { Tranche2CheckerDataComponent } from "../tranche2/checker-data/checker-data.component";
import { Tranche2MakerDataComponent } from "../tranche2/maker-data/maker-data.component";
import { Tranche2InfoDataComponent } from "../tranche2/info-data/info-data.component";
import { SharedModule } from '../../shared.module';
import { SubmittedSummaryComponent } from "../../submitted-summary/submitted-summary.component";
import { Tranche3Component } from "../tranche3/tranche3.component";
import { Tranche3MakerDataComponent } from '../tranche3/maker-data/maker-data.component';
import { Tranche3CheckerDataComponent } from '../tranche3/checker-data/checker-data.component';

@NgModule({
  declarations: [
    Tranche1Component,
    Tranche2Component,
    Tranche3Component,
    CheckerDataComponent,
    MakerDataComponent,
    InfoDataComponent,
    Tranche2CheckerDataComponent,
    Tranche2MakerDataComponent,
    Tranche2InfoDataComponent,
    Tranche3MakerDataComponent,
    Tranche3CheckerDataComponent,
    SubmittedSummaryComponent
    // OnlyNumbersDirective,
    // OnlyDecimalsDirective,
    // TwoDecimals,
    // OnlyTimeDirective,
    // NoCommaPipe,

  ],

  imports: [
    // CommonModule,
    // HttpModule,
    TrancheRoutingModule,
    // FormsModule,
    // MDBBootstrapModule.forRoot(),
    // TabsModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // TooltipModule,

    SharedModule
  ],
  providers: [Tranche1Service, Tranche2Service,Tranche3Service, ConfirmPopUpComponent],
  entryComponents:[]
})
export class TrancheModule{}
