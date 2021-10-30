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

import { WorkFlowService } from "../../Services/workflow.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
import { Tranche2MakerDataComponent } from "./maker-data/maker-data.component";
import { Tranche2InfoDataComponent } from "./info-data/info-data.component";
import { Tranche2CheckerDataComponent } from "./checker-data/checker-data.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Tranche2Service } from "../../Services/tranche2.service";
import { ExportService } from "../../Services/export.service";
@Component({
  selector: "app-tranche2",
  templateUrl: "./tranche2.component.html",
  styleUrls: ["./tranche2.component.css"],
})
export class Tranche2Component implements OnInit {
  action: string = "Maker";
  isMaker: boolean = true;
  isChecker: boolean = false;
  @ViewChild(Tranche2MakerDataComponent, { static: true })
  maker: Tranche2MakerDataComponent;
  @ViewChild(Tranche2InfoDataComponent, { static: true })
  info: Tranche2InfoDataComponent;
  @ViewChild(Tranche2CheckerDataComponent, { static: true })
  checker: Tranche2CheckerDataComponent;
  checkerData: any=[];

  childEventClicked(event: Event) {
    console.log(event);
  }
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  headElements = [
    { name: "dctNumber", title: "DCT#", sort: true },
    { name: "desc", title: "DCT Description", sort: false },
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
    { name: "file", title: "Documents", sort: false },
    // { name: 'comment', title: 'Comments' }
  ];
  quarter: any = "4";
  year: any = "2021";
  tt: any = 2;
  tranche: any = "2";
  reportType:any="cleared"
  quarters = [];
  data: any = [];
  rf:boolean;
  ativeTab:string='maker';
  status=[
    {id:0, status:"pending"},
    {id:1, status:"rejected"},
    {id:2, status:"submitted"}
  ];
  selectedStatus=null;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private tranche2Service: Tranche2Service,
    private workFlowService: WorkFlowService,
    private exportService: ExportService
  ) {}

  ngOnInit() {
    // console.log(this.year, this.quarter);

    // this.workFlowService
    //   .getQts(moment(new Date()).format("YYYY-MM-DD"))
    //   .subscribe((res) => {
    //     // res.payload.splice(0, 1);
    //     this.quarters = res.payload;
    //     // this.quarter = this.quarters[0].quarter;
    //     // this.year = this.quarters[0].year;
    let that = this;
    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      if(params["tab"]=='pending'){
        this.getMaker();
      }
      else if(params["tab"]=='rejected'){
       this.getRejected();
      }
      else if (params["tab"]=='submitted'){
        this.getSubmitted();
      }
     })
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      // let dt = new Date();
      // let month = dt.getMonth() + 1;
      // this.year = dt.getFullYear();
      // if (month > 0 && month < 4) {
      //   this.quarter = 3;
      //   this.year = this.year - 1;
      // } else if (month > 3 && month < 7) {
      //   this.quarter = 4;
      //   this.year = this.year;
      // } else if (month > 6 && month < 10) {
      //   this.quarter = 1;
      //   this.year = this.year ;
      // } else {
      //   this.quarter = 2;
      //   this.year = this.year ;
      // }
      if (params.get("id")) {
        // this.spinner.show()
        this.tt = params.get("id");
        console.log(this.tt);
        // this.getData();
        // that.maker.getMakerAll(that.quarter, that.year, that.tt);
        // that.checker.getCheckerAll(that.quarter, that.year, that.tt);
        // that.info.getInfoAll(that.quarter, that.year, that.tt);
        // that.spinner.hide();
      }
    });
    // });
  }
  recieveLength(e) {
    e > 0
      ? ((this.isMaker = true), (this.action = "Maker"))
      : ((this.isMaker = false), (this.action = "Checker"));
  }
  selectFiles() {
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
      // formData.append("year",this.year);formData.append("year",this.year)
      let that = this;
      let year;
      if (this.quarter != "4") {
        year = parseInt(this.year) - 1;
      } else {
        year = this.year;
      }

      this.spinner.show()
      this.tranche2Service
        .import(formData, this.quarter, this.year, this.tt)
        .subscribe(
          (res) => {
            // console.log(res);
            this.spinner.hide()
            this.toastr.success("File uploaded successfully", "Success");
            let year=that.year;
            // if (that.quarter != "4") {
            //   year = parseInt(that.year) - 1;
            // } else {
            //   year = that.year;
            // }
            that.maker.getMakerAll(that.quarter, year.toString(), that.tt);
            that.checker.getCheckerAll(that.quarter, year.toString(), that.tt);
            that.info.getInfoAll(that.quarter, year.toString(), that.tt);
            // this.getMakerAll(this.quarter, this.year, this.tt);
            // this.data.map(o=>{
            //   if(o.trancheId==this.trancheId){
            //     o.fileID=res.fileID
            //     o.fileName=res.fileName
            //   }
            // })
            // if (this.searchText == "") {
            //   this.getMakerAll(this.quarter, this.year, this.tt);
            // } else {
            //   this.getSearchAll(this.quarter, this.year, this.tt);
            // }
            this.fileInput.nativeElement.value = "";
          },
          (err) => {
            this.spinner.hide()
            this.toastr.error("File upload failed", "Error");
          }
        );
    }
  }



  // getData() {
  //   this.data = [];
  //   this.tranche2Service
  //     .getMakerAll(
  //       "0",
  //       1000,
  //       this.quarter,
  //       this.tt.toString(),
  //       this.year,
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.data = this.data.concat(res.payload.content);
  //       },
  //       (err) => {}
  //     );
  //   this.tranche2Service
  //     .getCheckerAll(
  //       "0",
  //       1000,
  //       this.quarter,
  //       this.tt.toString(),
  //       this.year,
  //       this.tt.toString()
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.data = this.data.concat(res.payload.content);
  //       },
  //       (err) => {}
  //     );
  //   this.tranche2Service
  //     .getInfoAll(
  //       "0",
  //       1000,
  //       this.quarter,
  //       this.tt.toString(),
  //       this.year,
  //       this.tt.toString()
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.data = this.data.concat(res.payload.content);
  //       },
  //       (err) => {}
  //     );
  // }
  download() {
    this.spinner.show();
    let year;
    if (this.quarter != "4") {
      year = parseInt(this.year) - 1;
    } else {
      year = this.year;
    }
    this.tranche2Service
      .downladExcel(this.quarter, this.tt.toString(), year.toString(), this.reportType.toString())
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
            ".xlsx";
          a.click();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  export(format) {
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
    if (this.tt == "2") {
      let data: Array<any> = [
        {
          Risk: "",
          "Parameter No.": "",
          "Control Parameter": "",
          "Control Objective": "",
          "Control Document": "",
          "Type of Control": "",
          "Control Design and Assessment": "",
          "Remarks 2": "",
          "Remarks 3": "",
        },
      ];
      this.data.find((o) => {
        data.push({
          Risk: "",
          "Parameter No.": o.dctNumber,
          "Control Parameter": o.dctDescription,
          "Control Objective": o.remark1ControlObjective,
          "Control Document": o.remark1ControlDocument,
          "Type of Control": o.remark1TypeOfControl,
          "Control Design and Assessment": o.remark1ControlDesignAssement,
          "Remarks 2": o.remark2,
          "Remarks 3": o.remark3,
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
    } else if (this.tt == "3") {
      let data: Array<any> = [
        {
          "Parameter No.": "",
          "Control Parameter": "",
          "Control Type": "",
          "Date of Last review of Control FORMAT- dd/mm/yyyy": "",
          Policy: "",
          Process: "",
          "Review mechanism": "",
          "Control Description max 3000 characters": "",

          "Type of check": "",
          "Sampling Methdology (Audit Function) max 3000 characters": "",
          "Number of samples checked ( Audit Function) Number /Not Applicable":
            "",
          "Audit Conclusion": "",

          "Sampling Methodology (Compliance Function) max 3000 characters": "",
          "Number of Samples Checked ( Compliance Function) Number /Not Applicable":
            "",
          "Observation ( Compliance Function) max 3000 characters": "",
          "Compliance Conclusion": "",
        },
        {},
      ];
      this.data.find((o) => {
        data.push({
          "Parameter No.": o.dctNumber,
          "Control Parameter": o.dctDescription,
          "Control Type": o.controlType,
          "Date of Last review of Control FORMAT- dd/mm/yyyy":
            o.dateOfLastReviewControl,
          Policy: "",
          Process: "",
          "Review mechanism": "",
          "Control Description max 3000 characters": o.controlDescripton,

          "Type of check": o.typeOfCheck,
          "Sampling Methdology (Audit Function) max 3000 characters":
            o.auditSamplingMethodology,
          "Number of samples checked ( Audit Function) Number /Not Applicable":
            o.auditNoOfSamplesChecked,
          "Audit Conclusion": o.auditConclusion,

          "Sampling Methodology (Compliance Function) max 3000 characters":
            o.complianceSamplingMethodology,
          "Number of Samples Checked ( Compliance Function) Number /Not Applicable":
            o.complianceNoOfSamplesChecked,
          "Observation ( Compliance Function) max 3000 characters":
            o.complianceObservation,
          "Compliance Conclusion": o.complianceConclusion,
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
      console.log(data);
      this.exportService.exportExcel(
        data,
        "tranche" + this.tt + "_Quarter" + this.quarter + "_Year" + this.year,
        format
      );
    }
  }
  search() {
    let that = this;
    let year;
    if (that.quarter != "4") {
      year = parseInt(that.year);
    } else {
      year = parseInt(that.year) +1;
    }

    that.maker.getMakerAll(that.quarter, year.toString(), that.tt);
    that.checker.getCheckerAll(that.quarter, year.toString(), that.tt);
    that.info.getInfoAll(that.quarter, year.toString(), that.tt);
  }

  getMaker(){
    this.spinner.show();
    this.tranche2Service.getMaker(
      this.quarter,
      this.rf=false,
      this.tt,
      this.year
    ).subscribe((res)=>{
      console.log(res);
      this.data = res.payload.content;
      console.log(this.data);
      this.isMaker=true;
      this.spinner.hide();
      if(this.data.length==0){
        this.isMaker=false; 
        this.getChecker();
      }
    },
    (err)=>{}
    );

  }

  getChecker(){
    this.tranche2Service.getChecker(
      this.quarter,
      this.tt.toString(),
      this.year
    ).subscribe((res)=>{
      console.log(res);
      this.checkerData=res.payload.content;
      this.isChecker=true;
    })
  }

  getRejected(){
    this.spinner.show();
    this.tranche2Service.getRejected(
      this.quarter,
      this.rf=true,
      this.tt.toString(),
      this.year
    ).subscribe((res)=>{
      console.log(res);
    })
  }

  getSubmitted(){

  }
  gotoStatus(){
    if(this.selectedStatus.status=='rejected'){
      this.rf=true;
      // this.router.navigate(["/tranches/tranche1/1"],{queryParams:{tab:this.selectedStatus.status}});
    }
    else if(this.selectedStatus.status=='pending'){
      this.isMaker=true;
    }

  }
}
