import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  Input
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective
} from "angular-bootstrap-md";
import { Tranche2Service } from "../../../Services/tranche2.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalService } from "ngx-bootstrap/modal";
import { Tranche2editComponent } from "../../../tranche2edit/tranche2edit.component";
import { Tranche3editComponent } from '../../../tranche3edit/tranche3edit.component';
@Component({
  selector: "app-info2-data",
  templateUrl: "./info-data.component.html",
  styleUrls: ["./info-data.component.css"]
})
export class Tranche2InfoDataComponent implements OnInit {
  @Input() event: Event;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild("row", { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  data: Array<any> = [];
  checkedData: Array<any> = [];
  checkerData: Array<any> = [];
  makerData: Array<any> = [];
  // infoData: Array<any> = [];
  checkedAll: boolean = false;
  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }
  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  popIndex: any;
  headElements = [
    // { name: 'dctNumber', title: "DCT#", sort: true },
    // { name: 'desc', title: 'DCT Description', sort: false },
    // { name: 'remark1', title: 'Remarks 1', sort: false },
    // { name: 'remark2', title: 'Remarks 2', sort: false },
    // { name: 'remark3', title: 'Remarks 3', sort: false },

    // { name: 'comments', title: 'Comments' },
    // { name: 'file', title: 'Documents', sort: false },

    { name: "dctNumber", title: "DCT#", sort: true, tt: 0 },
    { name: "desc", title: "DCT Description", sort: false, tt: 0 },
    { name: "remark1", title: "Remarks 1", sort: false, tt: 2 },
    { name: "remark2", title: "Remarks 2", sort: false, tt: 2 },
    { name: "remark3", title: "Remarks 3", sort: false, tt: 2 },
    { name: "controlType", title: "Control Type", sort: false, tt: 3 },
    {
      name: "dateOfLastReviewControl",
      title: "Date Of Last Review Control",
      sort: false,
      tt: 3
    },
    { name: "controlDescripton", title: "Control Description", sort: false,   tt: 3  },
    { name: "typeOfCheck", title: "Type Of Check", sort: false,   tt: 3  },
    { name: "auditSamplingMethodology", title: "Sampling Methodology", sort: false,   tt: 3  },
    { name: "auditNoOfSamplesChecked", title: "No Of Samples Checked", sort: false,   tt: 3  },
    { name: "auditConclusion", title: "Audit Conclusion", sort: false,   tt: 3  },
    { name: "complianceSamplingMethodology", title: "Compliance Sampling Methodology", sort: false,   tt: 3  },
    { name: "complianceNoOfSamplesChecked", title: "No Of Samples Checked", sort: false,   tt: 3  },
    { name: "complianceObservation", title: "Compliance Observation", sort: false,   tt: 3  },
    { name: "complianceConclusion", title: "Compliance Conclusion", sort: false,   tt: 3  },
    
    { name: "currentOwner", title: "Current Owner", tt: 0 },
    { name: "comment", title: "Comments", tt: 0 },
    { name: "file", title: "Documents", sort: false, tt: 0 }
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

  constructor(
    private cdRef: ChangeDetectorRef,
    private tranche2Service: Tranche2Service,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // this.getInfoAll(this.quarter, this.year)
  }

  getInfoAll(qt, year, tt) {
    // this.spinner.show()
    // if(qt!="4"){
    //   year=(parseInt(year)-1).toString()
    // }
    this.tranche2Service
      .getInfoAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        year,
        tt.toString(),
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
    // this.tranche2Service.getInfoAll().subscribe(res => {
    //   this.spinner.hide();
    //   this.data = res.payload.content;
    //   res.payload.content.map(function(o){
    //     if(o.currentLevel==10000){
    //       o.currentOwner="Ready to push to RBI"
    //     }
    //   })
    //   this.mdbTable.setDataSource(this.data);
    //   this.data = this.mdbTable.getDataSource();
    //   this.previous = this.mdbTable.getDataSource();

    // }, err => {
    //   this.spinner.hide();
    // })
  }
  getSearchAll(qt, year, tt) {
    if(qt!="4"){
      year=(parseInt(year)-1).toString()
    }
    this.tranche2Service
      .getInfoSearchAll(
        this.activePage.toString(),
        this.size,
        qt,
        tt.toString(),
        this.searchType,
        this.searchText,
        year,
        tt.toString(),
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
    // this.getSearchAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getInfoAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
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
      this.checkedData = this.data;
    } else {
      this.data.filter(o => {
        o.checked = false;
      });
      this.checkedData = [];
    }
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;

    if (this.searchText == "") {
      this.getInfoAll(this.quarter, this.year, this.tt);
    } else {
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  sortBy(col) {
    if (col == "action") {
      return;
    }
    if (this.searchText == "") {
      this.getInfoAll(this.quarter, this.year, this.tt);
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
    let bsModalRef = this.modalService.show(Tranche2editComponent,this.config);
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.edit = false;
    bsModalRef.content.type = "info";
    // this.data.findIndex;
    this.popIndex = this.data.findIndex(o => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.saved.subscribe(value => {
      if (value) {
        // closed with a value.
        if (that.searchText == "") {
          that.getInfoAll(this.quarter, this.year, this.tt);
        } else {
          that.getSearchAll(this.quarter, this.year, this.tt);
        }
        // that.myEvent.emit(null);
      } else {
        // closed via backdrop or something else
        console.log("value");
      }
    });
    bsModalRef.content.next.subscribe(value => {
      if (that.popIndex < that.data.length-1) {
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
    // bsModalRef.content.action.subscribe(result => {
    //   if (result) {
    //     // that.toastr.success("Approved successfully", "Success");
    //     // that.checkedData = [];
    //     // that.getMakerAll(this.quarter, this.year, this.tt);
    //     if (this.searchText == "") {
    //       this.getMakerAll(this.quarter, this.year, this.tt);
    //     } else {
    //       this.getSearchAll(this.quarter, this.year, this.tt);
    //     }
    //     that.myEvent.emit(null);
    //   }else{

    //   }
    // });
  }
  editTranche3(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche3editComponent,{
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-primary modal-xl'
    });
    bsModalRef.content.heading = "Tranche : " + this.tt + " Edit";
    itm.fileID ? (itm.fileInfo = { id: itm.fileID }) : null;
    bsModalRef.content.data = itm;
    bsModalRef.content.tt = this.tt;
    bsModalRef.content.edit = false;
    bsModalRef.content.type = "info";
    // this.data.findIndex;
    this.popIndex = this.data.findIndex(o => {
      return o.trancheId == itm.trancheId;
    });
    bsModalRef.content.saved.subscribe(value => {
      if (value) {
        // closed with a value.
        if (that.searchText == "") {
          that.getInfoAll(this.quarter, this.year, this.tt);
        } else {
          that.getSearchAll(this.quarter, this.year, this.tt);
        }
        // that.myEvent.emit(null);
      } else {
        // closed via backdrop or something else
        console.log("value");
      }
    });
    bsModalRef.content.next.subscribe(value => {
      if (that.popIndex < that.data.length-1) {
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
    // bsModalRef.content.action.subscribe(result => {
    //   if (result) {
    //     // that.toastr.success("Approved successfully", "Success");
    //     // that.checkedData = [];
    //     // that.getMakerAll(this.quarter, this.year, this.tt);
    //     if (this.searchText == "") {
    //       this.getMakerAll(this.quarter, this.year, this.tt);
    //     } else {
    //       this.getSearchAll(this.quarter, this.year, this.tt);
    //     }
    //     that.myEvent.emit(null);
    //   }else{

    //   }
    // });
  }
}
