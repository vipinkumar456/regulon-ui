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
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import { Tranche1Service } from "../Services/trenche1.service";
// import { ConfirmPopUpComponent } from '../../../modals/confirm-pop-up/confirm-pop-up.component';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  headElements = [
    { name: "dctNumber", title: "DCT#", sort: true, tt: 0 },
    { name: "desc", title: "DCT Description", sort: false, tt: 0 },
    { name: "unit", title: "Units", sort: true, tt: 1 },
    // { name: 'currentLevel', title: 'Current Level' },
    { name: "systemValue", title: "System Value", sort: true, tt: 1 },
    { name: "inputValue", title: "Input Value", sort: true, tt: 1 },
    { name: "comments", title: "Comments", tt: 1 },
    { name: "lq", title: "Last Quarter", sort: false, tt: 1 },
    { name: "slq", title: "Second Last Quarter", sort: false, tt: 1 },
    { name: "remark1", title: "Remarks 1", sort: false, tt: 2 },
    { name: "remark2", title: "Remarks 2", sort: false, tt: 2 },
    { name: "remark3", title: "Remarks 3", sort: false, tt: 2 },
    { name: "controlType", title: "Control Type", sort: false, tt: 3 },
    {
      name: "dateOfLastReviewControl",
      title: "Date Of Last Review Control",
      sort: false,
      tt: 3,
    },
    {
      name: "controlDescripton",
      title: "Control Description",
      sort: false,
      tt: 3,
    },
    { name: "typeOfCheck", title: "Type Of Check", sort: false, tt: 3 },
    {
      name: "auditSamplingMethodology",
      title: "Sampling Methodology",
      sort: false,
      tt: 3,
    },
    {
      name: "auditNoOfSamplesChecked",
      title: "No Of Samples Checked",
      sort: false,
      tt: 3,
    },
    { name: "auditConclusion", title: "Audit Conclusion", sort: false, tt: 3 },
    {
      name: "complianceSamplingMethodology",
      title: "Compliance Sampling Methodology",
      sort: false,
      tt: 3,
    },
    {
      name: "complianceNoOfSamplesChecked",
      title: "No Of Samples Checked",
      sort: false,
      tt: 3,
    },
    {
      name: "complianceObservation",
      title: "Compliance Observation",
      sort: false,
      tt: 3,
    },
    {
      name: "complianceConclusion",
      title: "Compliance Conclusion",
      sort: false,
      tt: 3,
    },

    { name: "file", title: "Documents", sort: false, tt: 0 },
    { name: "currentOwner", title: "Current Owner", tt: 0 },
    { name: "action", title: "Action", sort: false, tt: 0 },
    { name: "lastModifiedBy", title: "Action By", sort: false, tt: 0 },
    { name: "lastModifiedDate", title: "Action Date", sort: false, tt: 0 },

    // { name: 'comment', title: 'Comments' }
  ];
  searchType: string = "department";
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  quarter: any = 3;
  tt: any = 1;
  year: any = 2021;
  get: boolean = false;
  tranche: any = 0;
  sort: string = "dctNumber";
  dct: any = "";

  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche1Service: Tranche1Service,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let dt = new Date();
    let month = dt.getMonth() + 1;
    // this.year = dt.getFullYear();
    // if (month > 0 && month < 4) {
    //   this.quarter = 3;
    //   this.year = this.year - 1;
    // } else if (month > 3 && month < 7) {
    //   this.quarter = 4;
    //   this.year = this.year;
    // } else if (month > 6 && month < 10) {
    //   this.quarter = 1;
    //   this.year = this.year + 1;
    // } else {
    //   this.quarter = 2;
    //   this.year = this.year + 1;
    // }
  }
  getAll() {
    if (this.tt == 0) {
      return;
    }
    let year;
    // if(this.quarter!="4"){
    //   year=parseInt(this.year)-1
    // }else{
    year = this.year;
    // }
    this.spinner.show();
    // let tranche;
    if (
      this.tt == "1" ||
      this.tt == "11" ||
      this.tt == "12" ||
      this.tt == "13" ||
      this.tt == "14"
    ) {
      this.tranche = 1;
    } else {
      this.tranche = this.tt;
    }
    if (this.dct != "") {
      this.getSearchAll();
    } else {
      this.tranche1Service
        .getAuditAll(
          this.activePage.toString(),
          this.size,
          this.quarter,
          this.tt.toString(),
          this.year.toString(),
          this.tranche,
          this.sort
        )
        .subscribe(
          (res) => {
            this.get = true;
            res.payload.content.map((o) => {
              o.lastModifiedDate = new Date(o.lastModifiedDate);
            });
            this.pager.totalPages = res.payload.totalPages;
            this.pages = Array(res.payload.totalPages);
            this.data = res.payload.content;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }
  getSearchAll() {
    this.tranche1Service
      .auditSearch(
        this.activePage.toString(),
        this.size,
        this.quarter,
        this.tt.toString(),
        this.year,
        this.tranche,
        this.dct,
        this.sort
      )
      .subscribe(
        (res) => {
          this.get = true;
          this.data = res.payload.content;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getAll();
    } else {
      this.getSearchAll();
    }
  }
  sortBy(col) {
    if (col == "action") {
      return;
    }
    // this.sort = col;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getAll();
    } else {
      this.getSearchAll();
    }
  }
  download(el) {
    if (this.tranche == 1) {
      this.tranche1Service.downloadDocs(el.fileID).subscribe((res) => {
        console.log(res);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = el.fileName;
        a.click();
      });
    }
  }
}
