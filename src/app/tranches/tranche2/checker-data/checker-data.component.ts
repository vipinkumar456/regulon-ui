import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective
} from "angular-bootstrap-md";
import { Tranche2Service } from "../../../Services/tranche2.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import { ConfirmPopUpComponent } from "../../../modals/confirm-pop-up/confirm-pop-up.component";
import { Tranche2editComponent } from "../../../tranche2edit/tranche2edit.component";
import { Tranche3editComponent } from '../../../tranche3edit/tranche3edit.component';
@Component({
  selector: "app-checker2-data",
  templateUrl: "./checker-data.component.html",
  styleUrls: ["./checker-data.component.css"]
})
export class Tranche2CheckerDataComponent implements OnInit {
  // bsModalRef: BsModalRef;
  @Output() checkerEvent = new EventEmitter();
  // @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  // @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  // @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  checkedData: Array<any> = [];
  // checkerData: Array<any> = [];
  makerData: Array<any> = [];
  submitType: string = "";

  infoData: Array<any> = [];
  checkedAll: boolean = false;
  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }
  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  // headElements = [
  //   { name: "dctNumber", title: "DCT#", sort: true, tt: 0 },
  //   { name: "desc", title: "DCT Description", sort: false, tt: 0 },
  //   { name: "dctDepartment", title: "Department", sort: false, tt: 0 },
  //   { name: "remark1", title: "Remarks 1", sort: false, tt: 2 },
  //   { name: "remark2", title: "Remarks 2", sort: false, tt: 2 },
  //   { name: "remark3", title: "Remarks 3", sort: false, tt: 2 },
  //   { name: "controlType", title: "Control Type", sort: false, tt: 3 },
  //   {
  //     name: "dateOfLastReviewControl",
  //     title: "Date Of Last Review Control",
  //     sort: false,
  //     tt: 3
  //   },
  //   {
  //     name: "controlDescripton",
  //     title: "Control Description",
  //     sort: false,
  //     tt: 3
  //   },
  //   { name: "typeOfCheck", title: "Type Of Check", sort: false, tt: 3 },
  //   {
  //     name: "auditSamplingMethodology",
  //     title: "Sampling Methodology",
  //     sort: false,
  //     tt: 3
  //   },
  //   {
  //     name: "auditNoOfSamplesChecked",
  //     title: "No Of Samples Checked",
  //     sort: false,
  //     tt: 3
  //   },
  //   { name: "auditConclusion", title: "Audit Conclusion", sort: false, tt: 3 },
  //   {
  //     name: "complianceSamplingMethodology",
  //     title: "Compliance Sampling Methodology",
  //     sort: false,
  //     tt: 3
  //   },
  //   {
  //     name: "complianceNoOfSamplesChecked",
  //     title: "No Of Samples Checked",
  //     sort: false,
  //     tt: 3
  //   },
  //   {
  //     name: "complianceObservation",
  //     title: "Compliance Observation",
  //     sort: false,
  //     tt: 3
  //   },
  //   {
  //     name: "complianceConclusion",
  //     title: "Compliance Conclusion",
  //     sort: false,
  //     tt: 3
  //   },

  //   { name: "comment", title: "Comments", tt: 0 },
  //   { name: "file", title: "Documents", sort: false, tt: 0 }
  // ];
  headElements = [
    { name: "dctNumber", title:"DCT#", width:"120px", sort: true },
    { name: "desc", title:"DCT Description", width:"300px", sort: false },
    { name: "dctDepartment", title:"Department", width:"150px", sort: false },
    { name: "unit", title:"Units", width:"180px", sort: false },
    { name: "systemValue", title:"System Value", width:"120px", sort: false },
    { name: "lq", title:"Last Quarter", width:"120px", sort: false },
    { name: "fy", title:"Last FY", width:"120px", sort: false },
    { name: "current_owner", title:"Current Owner", width:"120px", sort: false },
  ];
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-primary modal-lg'
  };
  searchType: string = "department";
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  popIndex: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche2Service: Tranche2Service,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getCheckerAll(this.quarter,this.tt, this.year);
  }
  getCheckerAll(qt, tt, year) {
    // this.spinner.show();
    // if(qt!="4"){
    //   year=(parseInt(year)-1).toString()
    // }
    this.tranche2Service
      .getCheckerAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        year,
      )
      .subscribe(
        res => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          this.data = res.payload.content;
          this.checkedData = [];
        },
        err => {
          this.spinner.hide();
        }
      );
  }
  getSearchAll(qt, year, tt) {
    if(qt!="4"){
      year=(parseInt(year)-1).toString()
    }
    this.tranche2Service
      .getCheckerSearchAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        this.searchType,
        this.searchText,
        year,
        tt.toString()
      )
      .subscribe(
        res => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          this.data = res.payload.content;
        },
        err => {
          this.spinner.hide();
        }
      );
  }
  ngAfterViewInit() {}
  checkRecord(itm) {
    if (itm.checked) {
      this.checkedData.push(itm);
    } else {
      let index = this.checkedData.findIndex(o => {
        o.trancheId == itm.trancheId;
      });
      this.checkedData.splice(index, 1);
    }
    // console.log(this.checkedData)
  }
  checkAll() {
    if (this.checkedAll) {
      this.data.filter(o => {
        o.checked = true;
      });
      // this.checkedData = this.data;
      Object.assign(this.checkedData, this.data);
    } else {
      this.data.filter(o => {
        o.checked = false;
      });
      this.checkedData = [];
    }
  }
  approveData() {
    let that = this;
    let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
      class: "modal-primary modal-sm"
    });
    bsModalRef.content.heading = "Confirm Approve";
    bsModalRef.content.action.subscribe(result => {
      if (result) {
        that.checkedData.map(o => {
          o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
        });
        that.tranche2Service.approveData(that.checkedData, this.tt).subscribe(
          res => {
            that.toastr.success("Approved successfully", "Success");
            that.checkedData = [];
            // that.getCheckerAll(this.quarter, this.year, this.tt);
            if (this.searchText == "") {
              this.getCheckerAll(this.quarter, this.year, this.tt);
            } else {
              this.getSearchAll(this.quarter, this.year, this.tt);
            }
            that.checkerEvent.emit(null);
          },
          err => {
            that.toastr.error("Approve Failed", "Error");
          }
        );
      }
    });
  }
  rejectData(form) {
    let that = this;
    let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
      class: "modal-primary modal-sm"
    });
    bsModalRef.content.heading = "Confirm Rejection";
    bsModalRef.content.action.subscribe(result => {
      if (result) {
        that.tranche2Service.rejectData(that.checkedData, that.tt).subscribe(
          res => {
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
          err => {
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
    this.tranche2Service.downloadDocs(el.fileID).subscribe(res => {
      // console.log(res);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res._body);
      a.download = el.fileName;
      a.click();
    });
  }
  edit(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche2editComponent, this.config);
    this.popIndex = this.data.findIndex(o => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.type = "checker";
    bsModalRef.content.edit = false;
    bsModalRef.content.saved.subscribe(value => {
      // closed with a value.
      if (that.searchText == "") {
        that.getCheckerAll(this.quarter, this.year, this.tt);
      } else {
        that.getSearchAll(this.quarter, this.year, this.tt);
      }
      that.checkerEvent.emit(null);
    });
    bsModalRef.content.next.subscribe(value => {
      if (that.popIndex < that.data.length - 1) {
        that.popIndex = that.popIndex + 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
    bsModalRef.content.prev.subscribe(value => {
      if (that.popIndex > 0) {
        that.popIndex = that.popIndex - 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
  }
  editTranche3(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche3editComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-primary modal-xl'
    });
    this.popIndex = this.data.findIndex(o => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.type = "checker";
    bsModalRef.content.edit = false;
    bsModalRef.content.saved.subscribe(value => {
      // closed with a value.
      if (that.searchText == "") {
        that.getCheckerAll(this.quarter, this.year, this.tt);
      } else {
        that.getSearchAll(this.quarter, this.year, this.tt);
      }
      that.checkerEvent.emit(null);
    });
    bsModalRef.content.next.subscribe(value => {
      if (that.popIndex < that.data.length - 1) {
        that.popIndex = that.popIndex + 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
    bsModalRef.content.prev.subscribe(value => {
      if (that.popIndex > 0) {
        that.popIndex = that.popIndex - 1;
        bsModalRef.content.data = that.data[that.popIndex];
      }
    });
  }
}
