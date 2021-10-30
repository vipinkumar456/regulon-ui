import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter,HostListener,Output} from "@angular/core";
import { ValidationErrors, FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from "angular-bootstrap-md";

import { ConfirmPopUpComponent } from "../../modals/confirm-pop-up/confirm-pop-up.component";
import { BsModalRef } from "ngx-bootstrap/modal";
import { InfoDataComponent } from "./info-data/info-data.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MakerDataComponent } from "./maker-data/maker-data.component";
import { CheckerDataComponent } from "./checker-data/checker-data.component";
import { NgxSpinnerService } from "ngx-spinner";
import { WorkFlowService } from "../../Services/workflow.service";
import * as moment from "moment";
import { ExportService } from "../../Services/export.service";
import { Tranche1Service } from "../../Services/trenche1.service";
import * as _ from "lodash";
import { SubmittedSummaryComponent } from "../../submitted-summary/submitted-summary.component";
import { ToastrService } from "ngx-toastr";
import { BsModalService } from "ngx-bootstrap/modal";
import { Tranche1EditComponent } from "../../tranche1Edit/tranche1-edit.component";
import { $ } from "protractor";
@Component({
  selector: "app-tranche1",
  templateUrl: "./tranche1.component.html",
  styleUrls: ["./tranche1.component.css"],
})
export class Tranche1Component implements OnInit {
  action: string = "Maker";
  isMaker: boolean = true;
  isChecker: boolean = false;
  isSubmitted: boolean = false;
  @ViewChild(MakerDataComponent, { static: true }) maker: MakerDataComponent;
  @ViewChild(InfoDataComponent, { static: true }) info: InfoDataComponent;
  @ViewChild(CheckerDataComponent, { static: true }) checker:CheckerDataComponent;
   @ViewChild(SubmittedSummaryComponent, { static: true }) submited: SubmittedSummaryComponent;
  // checker: CheckerDataComponent;
  rejectedFlag;
  isRejected: boolean;
  // @ViewChild(InfoDataComponent)

  childEventClicked(event: Event) {
    console.log(event);
  }

  quarter: any = "4";
  year: any = "2021";
  tt: any = 1;
  rf:boolean;
  tranche: any = "1";
  quarters = [];
  data: any = [];
  sort: string = "dctNumber";
  status=[
    {id:0, status:"Pending"},
    {id:1, status:"Rejected"},
    {id:2, status:"Submitted"}

  ];
  selectedStatus;
  userStatus=[
    {id:0,status:"Maker"},
    {id:1,status:"Checker"}
  ]
  userselectedStatus;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  checkedData: Array<any> = [];
  

  checkedAll: boolean = false;
  popIndex: any;
  headElements = [
    { name: "dctNumber", title:"DCT#", width:"120px", sort: true },
    { name: "desc", title:"DCT Description", width:"300px", sort: false },
    { name: "dctDepartment", title:"Department", width:"150px", sort: false },
    { name: "unit", title:"Units", width:"120px", sort: false },
    { name: "systemValue", title:"System Value", width:"130px", sort: false },
    { name: "lq", title:"Last Quarter", width:"120px", sort: false },
    { name: "fy", title:"Last FY", width:"120px", sort: false },
    { name: "current_owner", title:"Current Owner", width:"170px", sort: false },
  ];
  tab:any;
  searchType: string = "department";
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  format: string = ".xlsx";
  isShowFilter:boolean=false;
  
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
    private route: ActivatedRoute,
    private router:Router,
    private spinner: NgxSpinnerService,
    private workFlowService: WorkFlowService,
    private exportService: ExportService,
    private cdRef: ChangeDetectorRef,
    private tranche1Service: Tranche1Service,
    private toastr: ToastrService,
    private el: ElementRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
    // this.getQuarters();
  }
  // getQuarters() {}
  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
     
      console.log(params["tab"]);
      this.userselectedStatus=this.userStatus[0];
     if(params["tab"]=='pending'){
        this.selectedStatus=this.status[0];
        this.tab="pending";
        this.isSubmitted=false;
        this.isShowFilter=true;
        this.getMakerByStatus(this.quarter,this.year,this.tt);
  }
     else if(params["tab"]=='rejected'){
      this.selectedStatus=this.status[1];
      this.tab="rejected";
      this.isSubmitted=false;
      this.isShowFilter=true;
      this.getMakerByStatus(this.quarter,this.year,this.tt);
     }
     else{
      this.tab="submitted";
      this.selectedStatus=this.status[2];
      this.isSubmitted=true;
      this.isShowFilter=false;
      this.getMakerByStatus(this.quarter,this.year,this.tt);
     }
    })
    this.route.paramMap.subscribe((params) => {
      let dt = new Date();
      if (params.get("id")) {
        console.log(this.tranche);
        // this.spinner.show();
        this.tt = params.get("id");
        // console.log(this.tt);
        if (this.tt == "a") {
          this.tranche = "1A";
          this.tt = 11;
        } else if (this.tt == "b") {
          this.tranche = "1B";
          this.tt = 12;
        } else if (this.tt == "c") {
          this.tranche = "1C";
          this.tt = 13;
        } else if (this.tt == "d") {
          this.tranche = "1D";
          this.tt = 14;
        } else if (this.tt == "e") {
          this.tranche = "1E";
          this.tt = 15;
        } else if (this.tt == "f") {
          this.tranche = "1F";
          this.tt = 16;
        } else if (this.tt == "g") {
          this.tranche = "1G";
          this.tt = 17;
        } else {
          this.tranche = "1";
        }


        // this.maker.getMakerAll(this.quarter, this.year, this.tt);
        // this.checker.getCheckerAll(this.quarter, this.year, this.tt);
        // this.info.getInfoAll(this.quarter, this.year, this.tt);
        // this.getData();
        // this.spinner.hide();
      }
    });
    // });
  }
  recieveLength(e) {
    console.log(e);
    e > 0
      ? ((this.isMaker = true), (this.action = "Maker"))
      : ((this.isMaker = false), (this.action = "Checker"));
  }
  getData() {
    this.data = [];
    this.tranche1Service
      .getMakerAll(
        "0",
        1000,
        this.quarter,
        this.tt.toString(),
        this.year,
        this.sort,
        this.rejectedFlag
      )
      .subscribe(
        (res) => {
          this.data = this.data.concat(res.payload.content);
        },
        (err) => {}
      );
    this.tranche1Service
      .getCheckerAll(
        "0",
        1000,
        this.quarter,
        this.tt.toString(),
        this.year,
        this.sort
      )
      .subscribe(
        (res) => {
          this.data = this.data.concat(res.payload.content);
          console.log('checker:'+this.data.length)
        },
        (err) => {}
      );
    this.tranche1Service
      .getInfoAll(
        "0",
        1000,
        this.quarter,
        this.tt.toString(),
        this.year,
        this.sort
      )
      .subscribe(
        (res) => {
          this.data = this.data.concat(res.payload.content);
        },
        (err) => {}
      );
  }
  export(format) {
    let data = [];
    //  _.filter(this.data, function(o) {
    //   return {
    //     "Tranche Category": "Tranche II",
    //     "DCT#": o.dctNumber,
    //     "DCT Description": o.dctDescription,
    //     "Remark 1 Key attributes of the Controls (max 500words/3000 characters whichever is lesser)":
    //       o.remark1,
    //     "Remark 2 Effectiveness: Review and Exceptions": o.remark2,
    //     "Remarks 3 Change in controls": o.remark3
    //   };
    // });
    this.data.find((o) => {
      data.push({
        "DCT#": o.dctNumber,
        "DCT Description": o.dctDescription,
        Department: o.dctDepartment,
        Unit: o.dctUnit,
        "System Value": o.systemValue,
        "Input Value": o.inputValue,
        Comments: o.comments,
        "Last Quarter": o.lastQuarterValue,
        "Second Last Quarter": o.lastQuarterOfLastYearValue,
        "Current Owner": o.currentOwner,
      });
      // delete o.createdBy;
      // delete o.creationDate;
      // delete o.lastModifiedBy;
      // delete o.lastModifiedDate;
      // delete o.trancheId;
      // delete o.editable;
      // o.rejected ? (o.rejected = "Yes") : (o.rejected = "No");
      // return o;
    });
    // console.log(data);
    this.exportService.exportExcel(
      data,
      "tranche" + this.tt + "_Quarter" + this.quarter + "_Year" + this.year,
      format
    );
  }
  search() {
    let that = this;
    let year;
    if (that.quarter != "4") {
      year = parseInt(that.year);
    } else {
      year = parseInt(that.year) + 1;
    }

    that.maker.getMakerAll(that.quarter,this.tt, year.toString(),);
    that.checker.getCheckerAll(that.quarter, year.toString(), that.tt);
    that.info.getInfoAll(that.quarter, year.toString(), that.tt);
    this.getData();
  }
// d
  getMaker(){
    this.spinner.show();
console.log("getmaker fired");
    this.tranche1Service
      .getMaker(

        this.quarter,
        this.rf=false,
        this.tt.toString(),
        this.year,
      )
      .subscribe(           // by using we get response
        (res) => {
          console.log("getmake call")
          console.log(res);
          this.data = res.payload.content;
          this.isMaker=true;

          this.spinner.hide();

          if(this.data.length==0  ){
            this.isMaker=false;    //i changed here
            console.log(this.data.length+'datalength');
            this.getChecker();
          }
        },
        (err) => {}
      );


  }

  getChecker(){
    console.log("getchecker fired");
    this.spinner.show();
    this.tranche1Service.getChecker(
      this.quarter,
      this.tt.toString(),
      this.year
    ).subscribe((res)=>{
      console.log(res);
      this.data = res.payload.content;
      this.isChecker=true;
      this.spinner.hide();
    })
  }

  getRejected(){
    this.spinner.show();
    this.data=[];
    this.tranche1Service
      .getRejected(

        this.quarter,
        this.rf=true,
        this.tt.toString(),
        this.year,
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.isRejected=true;
          this.data = res.payload.content;
          this.spinner.hide();
        },
        (err) => {}
      );
  }

  // getSubmitted(){
  //   debugger;
  //   this.spinner.show();
  //     this.tranche1Service.
  //         getSubmitByOwners(
  //           "yashvant",
  //           this.quarter,
  //           this.tt.toString(),
  //           this.year,
  //         ).subscribe((res)=>{
  //           console.log(res);
  //           this.data=res;
  //           this.isSubmited=true;
  //           this.spinner.hide();
  //         },
  //         (err)=>{}
  //         );
  // }
  makerCheckerStatus(){
    console.log(this.userselectedStatus.status);
    
    if(this.userselectedStatus.status=="Maker"){
      this.getMakerByStatus(this.quarter,this.year,this.tt);
      this.status.push({id:2,status:"Submitted"})
      this.isMaker=true;
      this.isChecker=false;
      
     }
     else if(this.userselectedStatus.status=="Checker"){
      this.getCheckerByStatus(this.quarter,this.year,this.tt);
      this.status = this.status.slice(0, this.status.length - 1);
      this.isChecker=true;
      this.isMaker=false;
      }
  }
  gotoStatus(){
  window.localStorage.setItem('tranch1Status',this.selectedStatus.status);
    this.tab=this.selectedStatus.status
    console.log(this.userselectedStatus.status);
    if(this.selectedStatus.status=='Rejected'){
        this.rf=true;
        this.isShowFilter=true;
        // this.getRejected();
         this.isSubmitted=false;
         if(this.userselectedStatus.status=='Maker'){
          this.getMakerByStatus(this.quarter,this.year,this.tt);
         }
         if(this.userselectedStatus.status=='Checker'){
          this.getCheckerByStatus(this.quarter,this.year,this.tt);
         }
         
        // this.router.navigate(["/tranches/tranche1/1"],{queryParams:{tab:this.selectedStatus.status}});
     }
    else if(this.selectedStatus.status=='Pending'){
      this.isShowFilter=true;
      //  this.getMaker();
        this.isSubmitted=false;
        if(this.userselectedStatus.status=='Maker'){
          this.getMakerByStatus(this.quarter,this.year,this.tt);
         }
         if(this.userselectedStatus.status=='Checker'){
          this.getCheckerByStatus(this.quarter,this.year,this.tt);
         }
      //  this.router.navigate(["/tranches/tranche1/1"],{queryParams:{tab:this.selectedStatus.status}});
    }
    else if(this.selectedStatus.status=='Submitted'){
      this.isSubmitted=true;
      this.isShowFilter=false;
      this.getMakerByStatus(this.quarter,this.year,this.tt);
      //  if(this.userselectedStatus.status=='Maker'){
      //   this.getMakerByStatus(this.quarter,this.year,this.tt);
      //  }
      //  if(this.userselectedStatus.status=='Checker'){
      //    this.getCheckerByStatus(this.quarter,this.year,this.tt);
      //  }
      //  this.router.navigate(["/tranches/tranche1/1"],{queryParams:{tab:this.selectedStatus.status}});
    }

  }
  
  // Maker Data component
  getMakerByStatus(qt, year, tt) {
    this.data = [];
    this.loading = true;
    this.spinner.show();
    this.tranche1Service
      .getMakerByStatus(
        this.activePage.toString(),
        this.size,
        qt,
        this.tab,
        tt.toString(),
        year,

      )
      .subscribe(
        (res) => {
           console.log(res)
           

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
              :o.inputValue=parseFloat(o.inputValue);
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

  getCheckerByStatus(qt, year, tt) {
    this.data = [];
    this.loading = true;
    this.spinner.show();
    this.tranche1Service
      .getCheckerByStatus(
        this.activePage.toString(),
        this.size,
        qt,
        this.tab,
        tt.toString(),
        year,

      )
      .subscribe(
        (res) => {
           console.log(res)
           

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
              :o.inputValue=parseFloat(o.inputValue);
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
    console.log(this.data);
    console.log(itm);
    console.log(itm)
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
  download() {
    this.tranche1Service.downladExcel(
      this.quarter,
      this.tt.toString(),
      this.year.toString(),
    ).subscribe(
      (res) => {
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

  rejectData(form){
    console.log(this.data);
    console.log(form)
    if (form.valid) {
      let that = this;
      let docsRequred: boolean = false;
      // that.checkedData.map((o) => {
      //   // o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
      //   if (o.systemValue != o.inputValue) {
      //     if (o.fileID == null) {
      //       this.toastr.error("Document are required");
      //       o.fileReq = true;
      //       docsRequred = true;
      //     }
      //   }
      // });
      if (docsRequred) {
        return;
      }
      let bsModalRef = this.modalService.show(ConfirmPopUpComponent, {
        class: "modal-primary modal-sm",
      });
      bsModalRef.content.heading = "Confirm Reject";
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
          that.tranche1Service.rejectData(that.checkedData).subscribe(
            (res) => {
              that.toastr.success("Approved successfully", "Success");
              // that.getMakerAll(this.quarter, this.year, this.tt);
              that.checkedData = [];
              if (this.searchText == "") {
                // this.getMakerAll(this.quarter,this.tt, this.year);
                if(this.userselectedStatus.status=='Maker'){
                  this.getMakerByStatus(this.quarter,this.year,this.tt);
                 }
                 if(this.userselectedStatus.status=='Checker'){
                  this.getCheckerByStatus(this.quarter,this.year,this.tt);
                 }
              } else {
                if(this.userselectedStatus.status=='Maker'){
                  this.getMakerByStatus(this.quarter,this.year,this.tt);
                 }
                 if(this.userselectedStatus.status=='Checker'){
                  this.getCheckerByStatus(this.quarter,this.year,this.tt);
                 }
              }
              // that.myEvent.emit(null);
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
  
  approveData(form) {
    console.log(this.data);
    console.log(form)
    if (form.valid) {
      let that = this;
      let docsRequred: boolean = false;
      // that.checkedData.map((o) => {
      //   // o.fileID ? (o.fileInfo = { id: o.fileID }) : null;
      //   if (o.systemValue != o.inputValue) {
      //     if (o.fileID == null) {
      //       this.toastr.error("Document are required");
      //       o.fileReq = true;
      //       docsRequred = true;
      //     }
      //   }
      // });
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
                // this.getMakerAll(this.quarter,this.tt, this.year);
                if(this.userselectedStatus.status=='Maker'){
                  this.getMakerByStatus(this.quarter,this.year,this.tt);
                 }
                 if(this.userselectedStatus.status=='Checker'){
                  this.getCheckerByStatus(this.quarter,this.year,this.tt);
                 }
              } else {
                if(this.userselectedStatus.status=='Maker'){
                  this.getMakerByStatus(this.quarter,this.year,this.tt);
                 }
                 if(this.userselectedStatus.status=='Checker'){
                  this.getCheckerByStatus(this.quarter,this.year,this.tt);
                 }
              }
              // that.myEvent.emit(null);
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
      if(this.userselectedStatus.status=='Maker'){
        this.getMakerByStatus(this.quarter,this.year,this.tt);
       }
       if(this.userselectedStatus.status=='Checker'){
        this.getCheckerByStatus(this.quarter,this.year,this.tt);
       }
    } else {
      if(this.userselectedStatus.status=='Maker'){
        this.getMakerByStatus(this.quarter,this.year,this.tt);
       }
       if(this.userselectedStatus.status=='Checker'){
        this.getCheckerByStatus(this.quarter,this.year,this.tt);
       }
    }
  }
  sortBy(col) {
    if (col == "action") {
      return;
    }
    // this.sort = col;
    // this.getMakerAll(this.quarter, this.year, this.tt);
    if (this.searchText == "") {
      this.getMakerByStatus(this.quarter,this.year, this.tt);
      // this.getMakerAll(this.quarter,this.tt, this.year);
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
        // this.myEvent.emit(null);
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
        // this.myEvent.emit(null);
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
