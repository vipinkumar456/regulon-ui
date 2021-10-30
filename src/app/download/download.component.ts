import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from "angular-bootstrap-md";
import { Tranche2Service } from "../Services/tranche2.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import { ExportService } from "../Services/export.service.js";
// import { ConfirmPopUpComponent } from '../../../modals/confirm-pop-up/confirm-pop-up.component';

@Component({
  selector: "app-download",
  templateUrl: "./download.component.html",
  styleUrls: ["./download.component.css"],
})
export class DownloadComponent implements OnInit {
  data: Array<any> = [];
  quarter: any = 4;
  tt: any = 1;
  year: any = 2021;
  format: string = ".xlsx";
  ttn: any = "1";
  reportType:any="cleared";
  tempYear: any;
  constructor(
    private tranche2Service: Tranche2Service,
    private exportService: ExportService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.getAll()
  }
  getAll() {
    let that = this;
    let year;
    if (that.quarter != "4") {
      this.tempYear = parseInt(that.year);
    } else {
      this.tempYear = parseInt(that.year) + 1;
    }
    // if (
    //   this.tt == "1" ||
    //   this.tt == "11" ||
    //   this.tt == "12" ||
    //   this.tt == "13" ||
    //   this.tt == "14"
    // ) {
    //   this.ttn = 1;
    //   this.spinner.show();
    //   this.data = [];

    //   // let year;

    //   this.tranche2Service
    //     .getMakerAll(
    //       "0",
    //       1000,
    //       this.quarter,
    //       this.tt.toString(),
    //       this.tempYear.toString(),
    //       this.ttn
    //     )
    //     .subscribe(
    //       (res) => {
    //         this.data = this.data.concat(res.payload.content);
    //         this.getChecker();
    //       },
    //       (err) => {
    //         this.spinner.hide();
    //         this.export(this.format);
    //       }
    //     );
    // } else {
    //   this.ttn = this.tt;

    // }
    this.download();
  }
  getChecker() {
    this.tranche2Service
      .getCheckerAll(
        "0",
        1000,
        this.quarter,
        this.tt.toString(),
        this.tempYear.toString(),
        // this.ttn
      )
      .subscribe(
        (res) => {
          this.data = this.data.concat(res.payload.content);
          this.getInfo();
        },
        (err) => {
          this.spinner.hide();
          this.export(this.format);
        }
      );
  }
  getInfo() {
    this.tranche2Service
      .getInfoAll(
        "0",
        1000,
        this.quarter,
        this.tt.toString(),
        this.tempYear.toString(),
        this.ttn
      )
      .subscribe(
        (res) => {
          this.data = this.data.concat(res.payload.content);
          this.spinner.hide();
          this.export(this.format);
        },
        (err) => {
          this.spinner.hide();
          this.export(this.format);
        }
      );
  }
  export(format) {
    this.data.find((o) => {
      delete o.createdBy;
      delete o.creationDate;
      delete o.lastModifiedBy;
      delete o.lastModifiedDate;
      delete o.trancheId;
      delete o.editable;
      o.rejected ? (o.rejected = "Yes") : (o.rejected = "No");
    });
    this.exportService.exportExcel(
      this.data,
      "tranche" + this.tt + "_Quarter" + this.quarter + "_Year" + this.year,
      format
    );
  }
  download() {
    this.spinner.show();
    // let year;
    // if (this.quarter != "4") {
    //   year = parseInt(this.year) - 1;
    // } else {
    //   year = this.year;
    // }
    if (this.format == ".xbrl") {
      const a = document.createElement("a");

      a.href = "./assets/in-rbi-rbs.xml";
      a.download = "in-rbi-rbs.xml";

      a.click();
      this.spinner.hide();
    } else {
      this.tranche2Service
        .downladExcel(
          this.quarter,
          this.tt.toString(),
          this.tempYear.toString(),
          this.reportType.toString(),
        )
        .subscribe(
          (res) => {
            console.log(res);
            const a = document.createElement("a");
            a.href = URL.createObjectURL(res._body);
            a.download =
              "Tranche" +
              this.tt +
              "_Quarter" +
              this.quarter +
              "_Year" +
              this.year +
              this.format;
            a.click();
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }
}
