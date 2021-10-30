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
import { ConfirmPopUpComponent } from "../../../modals/confirm-pop-up/confirm-pop-up.component";
import * as _ from "lodash";
import { Tranche1EditComponent } from "../../../tranche1Edit/tranche1-edit.component";
import { Tranche1Service } from "../../../Services/trenche1.service";

@Component({
  selector: "app-maker-data",
  templateUrl: "./maker-data.component.html",
  styleUrls: ["./maker-data.component.css"],
})
export class MakerDataComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  // @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  // @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  // @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  checkedData: Array<any> = [];
  rejectedFlag;

  checkedAll: boolean = false;
  popIndex: any;
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
  sort: string = "dctNumber";
  searchType: string = "department";
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  @Input() rf:any;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @HostListener("document:click")
  clickout() {
    this.data.map((o) => {
      o.popopen = false;
    });
  }
  clickPop(event) {
    return event.stopPropagation();
  }
  @Output() getLength: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  tranche1Status:any;
  trancheId: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche1Service: Tranche1Service,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private el: ElementRef,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // this.getTranches()
    // console.log(this.rf);
   this.tranche1Status= window.localStorage.getItem('tranch1Status');
    this.getMakerByStatus(this.quarter, this.year,this.tt)
    // this.getMakerAll(this.quarter, this.year,this.tt)
  }

  getMakerByStatus(qt, year, tt) {
    this.data = [];
    this.loading = true;
    this.spinner.show();
    this.tranche1Service
      .getMakerByStatus(
        this.activePage.toString(),
        this.size,
        qt,
        this.tranche1Status,
        tt.toString(),
        year,

      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          this.checkedData = [];
          // if (this.tt == "1" || this.tt == "11"||this.tt == "13" || this.tt == "14") {
          res.payload.content.map((o) => {
            // o.lastQuarterValue="3456.7899"

            o.lastQuarterValue = parseFloat(o.lastQuarterValue);
            o.lastQuarterOfLastYearValue = parseFloat(
              o.lastQuarterOfLastYearValue
            );
            o.systemValue
              ? (o.systemValue = parseFloat(o.systemValue))
              : o.systemValue=parseFloat("0");
            // o.systemValue ? (o.systemValue = o.systemValue.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]) : null;
            !o.inputValue
              ? (o.inputValue = o.systemValue)
              // : (o.inputValue = o.inputValue
              //     .toString()
              //     .match(/^-?\d+(?:\.\d{0,2})?/)[0]);
              :o.inputValue=parseFloat("0");
          });
          // }

          this.data = _.sortBy(res.payload.content, "dctNumber");

          this.checkedData = [];
          this.getLength.emit(this.data.length);
        },
        (err) => {
          this.spinner.hide();
        }
      );
    // this.tranche1Service.getMakerAll().subscribe(res => {
    //   this.spinner.hide();

    //   this.data = res.payload.content;

    //   this.mdbTable.setDataSource(this.data);
    //   this.data = this.mdbTable.getDataSource();
    //   this.previous = this.mdbTable.getDataSource();

    // }, err => {
    //   this.spinner.hide();
    // })
  }

  getMakerAll(qt, year, tt) {
    this.data = [];
    this.loading = true;
    this.spinner.show();
    this.tranche1Service
      .getMakerAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        year,
        this.sort,
        this.rejectedFlag=this.rf,

      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          this.checkedData = [];
          // if (this.tt == "1" || this.tt == "11"||this.tt == "13" || this.tt == "14") {
          res.payload.content.map((o) => {
            // o.lastQuarterValue="3456.7899"

            o.lastQuarterValue = parseFloat(o.lastQuarterValue);
            o.lastQuarterOfLastYearValue = parseFloat(
              o.lastQuarterOfLastYearValue
            );
            o.systemValue
              ? (o.systemValue = parseFloat(o.systemValue))
              : o.systemValue=parseFloat("0");
            // o.systemValue ? (o.systemValue = o.systemValue.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]) : null;
            !o.inputValue
              ? (o.inputValue = o.systemValue)
              // : (o.inputValue = o.inputValue
              //     .toString()
              //     .match(/^-?\d+(?:\.\d{0,2})?/)[0]);
              :o.inputValue=parseFloat("0");
          });
          // }

          this.data = _.sortBy(res.payload.content, "dctNumber");

          this.checkedData = [];
          this.getLength.emit(this.data.length);
        },
        (err) => {
          this.spinner.hide();
        }
      );
    // this.tranche1Service.getMakerAll().subscribe(res => {
    //   this.spinner.hide();

    //   this.data = res.payload.content;

    //   this.mdbTable.setDataSource(this.data);
    //   this.data = this.mdbTable.getDataSource();
    //   this.previous = this.mdbTable.getDataSource();

    // }, err => {
    //   this.spinner.hide();
    // })
  }
  getSearchAll(qt, year, tt) {
    if (qt != "4") {
      year = (parseInt(year) - 1).toString();
    }
    this.spinner.show();
    this.tranche1Service
      .getMakerSearchAll(
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
            o.lastQuarterOfLastYearValue = parseFloat(
              o.lastQuarterOfLastYearValue
            );
            o.systemValue
              ? (o.systemValue = parseFloat(o.systemValue))
              : o.systemValue=parseFloat("0");
            // o.systemValue ? (o.systemValue = o.systemValue.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]) : null;
            !o.inputValue
              ? (o.inputValue = o.systemValue)
              : (o.inputValue = o.inputValue
                  .toString()
                  .match(/^-?\d+(?:\.\d{0,2})?/)[0]);
          });
          this.data = _.sortBy(res.payload.content, "dctNumber");
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  ngAfterContentChecked() {
    // this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  // emitDataSourceChange() {
  //   this.mdbTable.dataSourceChange().subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
  searchItems() {
    // if (this.searchType == "" || this.searchText == "") {
    //   return
    // }
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getMakerAll(this.quarter,this.tt ,this.year );
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  checkRecord(itm) {
    if (itm.checked) {
      this.checkedData.push(itm);
    } else {
      let index = this.checkedData.findIndex((o) => {
        if (o.trancheId == itm.trancheId) {
          return o;
        }
      });
      this.checkedData.splice(index, 1);
    }
    console.log(this.checkedData);
  }
  selectFiles(el) {
    this.trancheId = el.trancheId;
    this.fileInput.nativeElement.click();
  }
  // ngAfterViewInit(){
  //   this.cdRef.detectChanges();
  // }
  uploadFile() {
    // this.fileUploading = true;
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let size = fileBrowser.files[0].size / 1024 / 1024;
      if (size > 1) {
        this.toastr.error("File size cannot exceed 1 MB", "Error");
        return;
      }
      const formData = new FormData();
      formData.append("file", fileBrowser.files[0]);
      this.tranche1Service
        .uploadDocs(formData, this.trancheId, this.tt)
        .subscribe(
          (res) => {
            this.toastr.success("File uploaded successfully", "Success");
            // this.getMakerAll(this.quarter, this.year, this.tt);
            this.data.map((o) => {
              if (o.trancheId == this.trancheId) {
                o.fileID = res.fileID;
                o.fileName = res.fileName;
              }
            });
            // if (this.searchText == "") {
            //   this.getMakerAll(this.quarter, this.year, this.tt);
            // } else {
            //   this.getSearchAll(this.quarter, this.year, this.tt);
            // }
            this.fileInput.nativeElement.value = "";
          },
          (err) => {
            this.toastr.error("File upload failed", "Error");
          }
        );
    }
  }
  download(el) {
    this.tranche1Service.downloadDocs(el.fileID).subscribe((res) => {
      console.log(res);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res._body);
      a.download = el.fileName;
      a.click();
    });
  }
  checkAll() {
    if (this.checkedAll) {
      this.data.filter((o) => {
        o.checked = true;
      });
      Object.assign(this.checkedData, this.data);
    } else {
      this.data.filter((o) => {
        o.checked = false;
      });
      this.checkedData = [];
    }
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
  approveData(form) {
    if (form.valid) {
      let that = this;
      let docsRequred: boolean = false;
      that.checkedData.map((o) => {
        // o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
        if (o.systemValue != o.inputValue) {
          if (o.fileID == null) {
            this.toastr.error("Document are required");
            o.fileReq = true;
            docsRequred = true;
          }
        }
      });
      if (docsRequred) {
        return;
      }
      let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
        class: "modal-primary modal-sm",
      });
      bsModalRef.content.heading = "Confirm Approve";
      bsModalRef.content.action.subscribe((result) => {
        if (result) {
          that.checkedData.map((o) => {
            o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
            if (o.systemValue != o.inputValue) {
              if (o.fileID == null || o.comments == "") {
                this.toastr.error("Comments and document are required");
                return;
              }
            }
          });
          that.tranche1Service.approveData(that.checkedData).subscribe(
            (res) => {
              that.toastr.success("Approved successfully", "Success");
              // that.getMakerAll(this.quarter, this.year, this.tt);
              that.checkedData = [];
              if (this.searchText == "") {
                this.getMakerAll(this.quarter,this.tt, this.year);
              } else {
                this.getSearchAll(this.quarter, this.year, this.tt);
              }
              that.myEvent.emit(null);
            },
            (err) => {
              that.toastr.error("Approve Failed", "Error");
            }
          );
        }
      });
    } else {
      this.toastr.error("Please fill valid values", "error");
      form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getMakerByStatus(this.quarter,this.year, this.tt,);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  sortBy(col) {
    if (col == "action") {
      return;
    }
    // this.sort = col;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getMakerAll(this.quarter,this.tt, this.year);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  delete(itm) {
    itm.fileID = null;
    itm.fileInfo = null;
    this.tranche1Service.updateData(itm, this.tt).subscribe(
      (res) => {
        this.toastr.success("File Deleted Successfully");
        if (this.searchText == "") {
          this.getMakerAll(this.quarter,this.tt, this.year);
        } else {
          this.getSearchAll(this.quarter, this.year, this.tt);
        }
        this.myEvent.emit(null);
      },
      (err) => {
        this.toastr.error("File Delete Failed");
      }
    );
  }
  openPop(e, itm) {
    e.stopPropagation();
    this.data.map((o) => {
      o.popopen = false;
    });
    itm.popopen = true;
  }
  changeDummy(itm) {
    if (itm.dctInputTypeValue == 1) {
      itm.inputValue = itm.systemValue + itm.dummyVal;
    } else if (itm.dctInputTypeValue == 2) {
      itm.inputValue = itm.systemValue - itm.dummyVal;
    } else if (itm.dctInputTypeValue == 3) {
      itm.inputValue = itm.systemValue * itm.dummyVal;
    } else {
      itm.inputValue = itm.dummyVal;
    }
  }
  saveInput(itm) {
    this.tranche1Service.updateData(itm, this.tt).subscribe(
      (res) => {
        this.toastr.success("Input Value Updated Successfully");
        if (this.searchText == "") {
          this.getMakerAll(this.quarter,this.tt, this.year);
        } else {
          this.getSearchAll(this.quarter, this.year, this.tt);
        }
        this.myEvent.emit(null);
      },
      (err) => {
        this.toastr.error("Input Value Update Failed");
      }
    );
  }
  edit(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche1EditComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-primary modal-lg",
    });
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.type = "maker";
    // this.data.findIndex;
    this.popIndex = this.data.findIndex((o) => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.saved.subscribe((value) => {
      if (value) {
        // closed with a value.
        if (that.searchText == "") {
          that.getMakerAll(this.quarter,this.tt, this.year);
        } else {
          that.getSearchAll(this.quarter, this.year, this.tt);
        }
        that.myEvent.emit(null);
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
