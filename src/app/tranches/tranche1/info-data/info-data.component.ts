import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, HostListener, Input } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { NgxSpinnerService } from "ngx-spinner";
import * as _ from "lodash";
import { Tranche1EditComponent } from '../../../tranche1Edit/tranche1-edit.component';
import { BsModalService } from "ngx-bootstrap/modal";
import { Tranche1Service } from '../../../Services/trenche1.service';
@Component({
  selector: 'app-info-data',
  templateUrl: './info-data.component.html',
  styleUrls: ['./info-data.component.css']
})
export class InfoDataComponent implements OnInit {
  @Input() event: Event;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = '';
  data: Array<any> = [];
  checkedData: Array<any> = [];
  checkerData: Array<any> = [];
  makerData: Array<any> = [];
  // infoData: Array<any> = [];
  checkedAll: boolean = false;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-primary modal-lg'
  };
  popIndex:any;
  sort:string = "dctNumber";
  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  headElements = [
    { name: 'dctNumber', title: "DCT#", sort: true },
    { name: 'desc', title: 'DCT Description', sort: false },
    { name: 'unit', title: 'Units', sort: false },

    { name: 'systemValue', title: 'System Value', sort: false },
    { name: 'inputValue', title: 'Submitted Value', sort: false },
    { name: 'currentOwner', title: 'Current Owner' , sort: false},
    { name: 'comments', title: 'Comments' , sort: false},
    { name: 'lq', title: 'Last Quarter', sort: false },
    { name: 'slq', title: 'Second Last Quarter', sort: false },
    { name: 'file', title: 'Documents', sort: false },

  ];

  searchType: string = "department";
  paging = {}
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;

  constructor(private cdRef: ChangeDetectorRef, private tranche1Service: Tranche1Service,private modalService: BsModalService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.getInfoAll(this.quarter, this.year, this.tt)
  }

  getInfoAll(qt, year,tt) {
    this.data = [];
    this.tranche1Service.getInfoAll(this.activePage.toString(), this.size, qt, tt.toString(), year,this.sort).subscribe(res => {
      // console.log(res)
      this.pager.totalPages = res.payload.totalPages;
      this.pages = Array(res.payload.totalPages)
      this.spinner.hide();
      res.payload.content.map((o) => {
        o.lastQuarterValue=parseFloat(o.lastQuarterValue)
        o.systemValue?o.systemValue=parseFloat(o.systemValue):o.systemValue=parseFloat("0");
        o.lastQuarterOfLastYearValue=parseFloat(o.lastQuarterOfLastYearValue)
      });
      this.data = _.sortBy(res.payload.content, 'dctNumber');;;
    }, err => {
      this.spinner.hide();
    })
    // this.tranche1Service.getInfoAll().subscribe(res => {
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
  getSearchAll(qt, year,tt){
    if(qt!="4"){
      year=(parseInt(year)-1).toString()
    }
    this.tranche1Service.getInfoSearchAll(this.activePage.toString(), this.size, qt, tt.toString(), this.searchType, this.searchText, year,this.sort).subscribe(res => {
      // console.log(res)
      this.pager.totalPages = res.payload.totalPages;
      this.pages = Array(res.payload.totalPages)
      this.spinner.hide();
      res.payload.content.map((o) => {
        o.lastQuarterValue=parseFloat(o.lastQuarterValue)
        o.systemValue?o.systemValue=parseFloat(o.systemValue):o.systemValue=parseFloat("0");
        o.lastQuarterOfLastYearValue=parseFloat(o.lastQuarterOfLastYearValue)
      });
      this.data = _.sortBy(res.payload.content, 'dctNumber');;;
    }, err => {
      this.spinner.hide();
    })
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
    if(this.searchText==""){
      this.getInfoAll(this.quarter, this.year, this.tt);
    }else{
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  checkRecord(itm) {
    if (itm.checked) {
      this.checkedData.push(itm)
    } else {
      let index = this.checkedData.findIndex(o => {
        o.trancheId == itm.trancheId
      })
      this.checkedData.splice(index, 1)
    }
    // console.log(this.checkedData)
  }
  checkAll() {
    if (this.checkedAll) {
      this.data.filter(o => {
        o.checked = true;
      })
      this.checkedData = this.data;
    }
    else {
      this.data.filter(o => {
        o.checked = false;
      })
      this.checkedData = [];
    }
  }
  setPage(page: number) {
    // console.log(page)
    this.activePage = page;
    
    if(this.searchText==""){
      this.getInfoAll(this.quarter, this.year, this.tt);
    }else{
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
  }
  sortBy(col) {
    console.log(col)
    if (col == 'action') {
      return
    }
    if(this.searchText==""){
      this.getInfoAll(this.quarter, this.year, this.tt);
    }else{
      this.getSearchAll(this.quarter, this.year, this.tt);
    }
    

  }
  download(el) {
    this.tranche1Service.downloadDocs(el.fileID).subscribe(res => {
      // console.log(res);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res._body);
      a.download = el.fileName;
      a.click();
    })
  }
  edit(itm) {
    let that = this;
    let bsModalRef = this.modalService.show(Tranche1EditComponent,this.config);
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
  }
}
