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
import { Tranche2Service } from "../../../Services/tranche2.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import { ConfirmPopUpComponent } from "../../../modals/confirm-pop-up/confirm-pop-up.component";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { listLocales } from "ngx-bootstrap/chronos";
import { Tranche2editComponent } from "../../../tranche2edit/tranche2edit.component";
import { Tranche3editComponent } from "../../../tranche3edit/tranche3edit.component";
import * as moment from "moment";

@Component({
  selector: "app-maker2-data",
  templateUrl: "./maker-data.component.html",
  styleUrls: ["./maker-data.component.css"],
})
export class Tranche2MakerDataComponent implements OnInit {
  locale = "es-us";
  locales = listLocales();
  rejectedFlag: any;
  applyLocale(pop: any) {
    this.localeService.use(this.locale);
    pop.hide();
    pop.show();
  }

  @Output() myEvent = new EventEmitter();
  // @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  // @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  // @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  checkedData: Array<any> = [];

  checkedAll: boolean = false;
  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }
  headElements = [
   { name: "dctNumber", title: "DCT#", sort: true, tt: 0 },
  { name: "desc", title: "DCT Description", sort: false, tt: 0 },
  { name: "dctDepartment", title: "Department", sort: false, tt: 0 },
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
  //     tt: 3,
    },
  {
     name: "complianceConclusion",
     title: "Compliance Conclusion",
      sort: false,
      tt: 3,
   },

    { name: "comment", title: "Comments", tt: 0 },
    { name: "file", title: "Documents", sort: false, tt: 0 },
  ];
  // headElements = [
  //   { name: "dctNumber", title:"DCT#", width:"120px", sort: true },
  //   { name: "desc", title:"DCT Description", width:"300px", sort: false },
  //   { name: "dctDepartment", title:"Department", width:"150px", sort: false },
  //   { name: "unit", title:"Units", width:"180px", sort: false },
  //   { name: "systemValue", title:"System Value", width:"120px", sort: false },
  //   { name: "lq", title:"Last Quarter", width:"120px", sort: false },
  //   { name: "fy", title:"Last FY", width:"120px", sort: false },
  //   { name: "current_owner", title:"Current Owner", width:"120px", sort: false },
  // ];
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-primary modal-sm",
  };
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
  @Output() getLength: EventEmitter<any> = new EventEmitter();
  trancheId: any;
  popIndex: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche2Service: Tranche2Service,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    // this.getTranches()
    this.getMakerAll(this.quarter, this.tt,this.year);
  }
  getMakerAll(qt, year, tt) {
    this.data = [];
    this.spinner.show();
    this.tranche2Service
      .getMakerAll(
        this.activePage.toString(),
        this.size,
        qt,
        this.rejectedFlag=this.rf,
        year,
        tt.toString(),
        this.sort,
      )
      .subscribe(
        (res) => {
           console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          res.payload.content.map((o) => {
            if (o.dateOfLastReviewControl) {
              let dateParts = o.dateOfLastReviewControl.split("/");
              // console.log(dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0])
              o.dateOfLastReviewControl = new Date(
                dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]
              );

              // o.dateOfLastReviewControl = new Date(o.dateOfLastReviewControl);
            }
          });
          this.data = res.payload.content;
          this.checkedData = [];
          this.getLength.emit(this.data.length);
        },
        (err) => {
          this.spinner.hide();
        }
      );
    // this.tranche2Service.getMakerAll().subscribe(res => {
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
    this.spinner.show();
    if (qt != "4") {
      year = (parseInt(year) - 1).toString();
    }
    this.tranche2Service
      .getMakerSearchAll(
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
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          this.data = res.payload.content;
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  ngAfterViewInit() {
    // this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    // this.cdRef.detectChanges();
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
      this.getMakerAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  checkRecord(itm) {
    if (itm.checked) {
      this.checkedData.push(itm);
    } else {
      let index = this.checkedData.findIndex((o) => {
        return o.trancheId == itm.trancheId;
      });
      this.checkedData.splice(index, 1);
    }
    // console.log(this.checkedData)
  }
  selectFiles(el) {
    this.trancheId = el.trancheId;
    this.fileInput.nativeElement.click();
  }
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
      this.tranche2Service
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
    this.tranche2Service.downloadDocs(el.fileID).subscribe((res) => {
      // console.log(res);
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
      // this.checkedData = this.data;
      Object.assign(this.checkedData, this.data);
    } else {
      this.data.filter((o) => {
        o.checked = false;
      });
      this.checkedData = [];
    }
    // console.log(this.checkedData)
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
      let bsModalRef = this.modalService.show(
        ConfirmPopUpComponent,
        this.config
      );
      bsModalRef.content.heading = "Confirm Approve";
      bsModalRef.content.action.subscribe((result) => {
        if (result) {
          that.checkedData.map((o) => {
            o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
            o.dateOfLastReviewControl = o.dateOfLastReviewControl
              ? moment(o.dateOfLastReviewControl).format("DD/MM/YYYY")
              : "";
          });
          that.tranche2Service.approveData(that.checkedData, this.tt).subscribe(
            (res) => {
              that.toastr.success("Approved successfully", "Success");
              that.checkedData = [];
              // that.getMakerAll(this.quarter, this.year, this.tt);
              if (this.searchText == "") {
                this.getMakerAll(this.quarter, this.year, this.tt);
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
    }else{
      this.toastr.error("Please fill all required fields","error");
      form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getMakerAll(this.quarter, this.year, this.tt);
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
      this.getMakerAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  edit(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche2editComponent, {
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
          that.getMakerAll(this.quarter, this.year, this.tt);
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
  editTranche3(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche3editComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-primary modal-xl",
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
          that.getMakerAll(this.quarter, this.year, this.tt);
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
  delete(itm) {
    itm.fileID = null;
    itm.fileInfo = null;
    this.tranche2Service.updateData(itm, this.tt).subscribe(
      (res) => {
        this.toastr.success("File Deleted Successfully");
        if (this.searchText == "") {
          this.getMakerAll(this.quarter, this.year, this.tt);
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
}
