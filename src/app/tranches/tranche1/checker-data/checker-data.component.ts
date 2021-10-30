import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from "angular-bootstrap-md";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import * as _ from "lodash";
import { ConfirmPopUpComponent } from "../../../modals/confirm-pop-up/confirm-pop-up.component";
import { Tranche1EditComponent } from "../../../tranche1Edit/tranche1-edit.component";
import { Tranche1Service } from "../../../Services/trenche1.service";
@Component({
  selector: "app-checker-data",
  templateUrl: "./checker-data.component.html",
  styleUrls: ["./checker-data.component.css"],
})
export class CheckerDataComponent implements OnInit {
  // bsModalRef: BsModalRef;
  @Output() checkerEvent = new EventEmitter();
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-primary modal-lg",
  };
  popIndex: any;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  checkedData: Array<any> = [];
  // checkerData: Array<any> = [];
  makerData: Array<any> = [];
  infoData: Array<any> = [];
  checkedAll: boolean = false;
  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }
  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  @Input() rf:any;
  headElements = [
    { name: "dctNumber", title: "DCT#", width:"120px", sort: true },
    { name: "desc", title: "DCT Description", width:"300px", sort: false },
    { name: "dctDepartment", title: "Department", width:"150px", sort: false },
    { name: "unit", title: "Units", width:"120px", sort: false },
    { name: "systemValue", title: "System Value", width:"120px", sort: false },
    { name: "lq", title: "Last Quarter", width:"120px", sort: false },
    { name: "slq", title: "Second Last Quarter", width:"120px", sort: false },
    { name: "current_owner", title:"Current Owner", width:"120px", sort: false },
  ];
  searchType: string = "department";
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  sort: string = "dctNumber";
  submitType: string = "";
  rejectedFlag;
  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche1Service: Tranche1Service,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private el: ElementRef,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
     this.getCheckerAll(this.quarter, this.year,this.tt);
  }
  getCheckerAll(qt, year, tt) {
    // this.spinner.show();
    // if(qt!="4"){
    //   year=(parseInt(year)-1).toString()
    // }
    this.data = [];
    this.tranche1Service
      .getCheckerAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        year,
        this.sort
      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          res.payload.content.map((o) => {
            o.lastQuarterValue = parseFloat(o.lastQuarterValue);
            o.systemValue
              ? (o.systemValue = parseFloat(o.systemValue))
              : o.systemValue=parseFloat("0");
            o.lastQuarterOfLastYearValue = parseFloat(
              o.lastQuarterOfLastYearValue
            );
          });
          this.data = _.sortBy(res.payload.content, "dctNumber");

          this.checkedData = [];
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  getSearchAll(qt, year, tt) {
    if (qt != "4") {
      year = (parseInt(year) - 1).toString();
    }
    this.tranche1Service
      .getCheckerSearchAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        this.searchType,
        this.searchText,
        year,
        this.sort
      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          res.payload.content.map((o) => {
            o.lastQuarterValue = parseFloat(o.lastQuarterValue);
            o.systemValue
              ? (o.systemValue = parseFloat(o.systemValue))
              : o.systemValue=parseFloat("0");
            o.lastQuarterOfLastYearValue = parseFloat(
              o.lastQuarterOfLastYearValue
            );
          });
          this.data = _.sortBy(res.payload.content, "dctNumber");
          this.checkedData = [];
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  checkRecord(itm) {
    if (itm.checked) {
      this.checkedData.push(itm);
    } else {
      let index = this.checkedData.findIndex((o) => {
        o.trancheId == itm.trancheId;
      });
      this.checkedData.splice(index, 1);
    }
    // console.log(this.checkedData)
  }
  checkAll() {
    if (this.checkedAll) {
      this.data.filter((o) => {
        o.checked = true;
      });
      // this.checkedData = this.data;
      Object.assign(this.checkedData, this.data);
    } else {
      this.data.filter((o) => {
        o.checked = false;
      });
      this.checkedData = [];
    }
  }
  approveData() {
    let that = this;
    // this.submitType = "approve";
    this.cdRef.detectChanges();
    let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
      class: "modal-primary modal-sm",
    });
    bsModalRef.content.heading = "Confirm Approve";
    bsModalRef.content.action.subscribe((result) => {
      if (result) {
        that.checkedData.map((o) => {
          o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
        });
        that.tranche1Service.approveData(that.checkedData).subscribe(
          (res) => {
            that.toastr.success("Approved successfully", "Success");
            // that.getCheckerAll(this.quarter, this.year, this.tt);
            that.checkedData = [];
            if (this.searchText == "") {
              this.getCheckerAll(this.quarter, this.year, this.tt);
            } else {
              this.getSearchAll(this.quarter, this.year, this.tt);
            }
            that.checkerEvent.emit(null);
          },
          (err) => {
            that.toastr.error("Approve Failed", "Error");
          }
        );
      }
    });
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth",
    });
    firstInvalidControl.focus(); //without smooth behavior
  }
  rejectData(form) {
    let that = this;
    this.cdRef.detectChanges();
    if (!form.valid) {
      form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      this.toastr.error("Please fill comments field", "error");
      return;
    }
    let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
      class: "modal-primary modal-sm",
    });
    bsModalRef.content.heading = "Confirm Rejection";
    bsModalRef.content.action.subscribe((result) => {
      if (result) {
        that.tranche1Service.rejectData(that.checkedData).subscribe(
          (res) => {
            // that.getCheckerAll(this.quarter, this.year, this.tt);
            that.checkedData = [];
            if (this.searchText == "") {
              this.getCheckerAll(this.quarter, this.year, this.tt);
            } else {
              this.getSearchAll(this.quarter, this.year, this.tt);
            }
            that.toastr.success("Rejected successfully", "Success");
            that.checkerEvent.emit(null);
          },
          (err) => {
            that.toastr.error("Rejection Failed", "Error");
          }
        );
      }
    });
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;
    // this.getCheckerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getCheckerAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  sortBy(col) {
    if (col == "action") {
      return;
    }
    // this.sort = col;
    // this.getCheckerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getCheckerAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  searchItems() {
    // if (this.searchType == "" || this.searchText == "") {
    //   return
    // }
    // this.getCheckerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getCheckerAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }

  download(el) {
    this.tranche1Service.downloadDocs(el.fileID).subscribe((res) => {
      // console.log(res);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res._body);
      a.download = el.fileName;
      a.click();
    });
  }
  edit(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche1EditComponent, this.config);
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.edit = false;
    bsModalRef.content.type = "info";
    // this.data.findIndex;
    this.popIndex = this.data.findIndex((o) => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.saved.subscribe((value) => {
      if (value) {
        // closed with a value.
        if (that.searchText == "") {
          that.getCheckerAll(this.quarter, this.year, this.tt);
        } else {
          that.getSearchAll(this.quarter, this.year, this.tt);
        }
        // that.myEvent.emit(null);
      } else {
        // closed via backdrop or something else
        console.log("value");
      }
    });
    bsModalRef.content.next.subscribe((value) => {
      if (that.popIndex < that.data.length - 1) {
        that.popIndex = that.popIndex + 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
    bsModalRef.content.prev.subscribe((value) => {
      if (that.popIndex > 0) {
        that.popIndex = that.popIndex - 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
  }
}
