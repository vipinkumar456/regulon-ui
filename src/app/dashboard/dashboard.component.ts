import { Component, OnInit } from "@angular/core";
import { Tranche1Service } from "../Services/trenche1.service";
import { WorkFlowService } from "../Services/workflow.service";
import { UserService } from "../Services/user.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  
  cols: any[];
  data: Array<any> = [];
  tranche1Data:any = [];
  tranche2Data:any = [];
  tranche3Data:any = [];
  qt: any = "4";
  year: any = "2021";
  quarter: any = "4";
  tt: any = 2;
  quarters = [];
  constructor(
    private workFlowService: WorkFlowService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.getCount();
  }

  ngOnInit() {
    this.getCount();
    this.prepareCols();
  }

  rowToggle(row){
    row.showdetail = !row.showdetail
    if(row.showdetail){
      // let data = [{"label":"RBS Head","value":12},{"label":"RBS Application","value":21},{"label":"RBS Agent","value":10}]
      // row.submittedData = data;
      this.spinner.show();
      this.userService.getSubmittedRecord(this.quarter, this.year, row.tracheType).subscribe((res) => {
        row.submittedData = res.payload;
        this.spinner.hide();
      })
    }
  }

  gotoTrache(row){
    console.log(row.tracheType);
    switch (row.tracheType) {
      case "TRANCHE 1":
        this.router.navigate(["/tranches/tranche1/1"]);
        break;
      case "TRANCHE 1A":
        this.router.navigate(["/tranches/tranche1/a"]);
        break;
      case "TRANCHE 1B":
        this.router.navigate(["/tranches/tranche1/b"]);
        break;
      case "TRANCHE 1C":
        this.router.navigate(["/tranches/tranche1/c"]);
        break;
      case "TRANCHE 1D":
        this.router.navigate(["/tranches/tranche1/d"]);
        break;
      case "TRANCHE 1E":
        this.router.navigate(["/tranches/tranche1/e"]);
        break;
      case "TRANCHE 1F":
        this.router.navigate(["/tranches/tranche1/f"]);
        break;
      case "TRANCHE 1G":
        this.router.navigate(["/tranches/tranche1/g"]);
        break;
      case "TRANCHE 2":
        this.router.navigate(["/tranches/tranche/2"]);
        break;
      case "TRANCHE 3":
        this.router.navigate(["/tranches/tranche/3"]);
        break;
    }
  }

  getCount() {
    this.spinner.show();
    this.userService.getReports(this.quarter, this.year).subscribe((res) => {
      
      this.data = res.payload;
      console.log(this.data);
      this.data.forEach(elm =>{
        console.log('vipin');
        console.log(elm);
        elm.myTask = elm.todoCount+elm.rejectedCount+elm.submittedCount
        if(elm.tracheType.includes('TRANCHE 1')){
          this.tranche1Data.push(elm)
        }
        if(elm.tracheType.includes('TRANCHE 2')){
          this.tranche2Data.push(elm)
        }
        if(elm.tracheType.includes('TRANCHE 3')){
          this.tranche3Data.push(elm)
        }
      })
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
    })
  }

  goto(report, tab) {
    // this.router.navigate(["/tranches/tranche1/1"])
    console.log('gotocall');
    console.log(report);
    console.log(report.tracheType);
    switch (report.tracheType) {
      case "TRANCHE 1":
        this.router.navigate(["/tranches/tranche1/1"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1A":
        this.router.navigate(["/tranches/tranche1/a"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1B":
        this.router.navigate(["/tranches/tranche1/b"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1C":
        this.router.navigate(["/tranches/tranche1/c"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1D":
        this.router.navigate(["/tranches/tranche1/d"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1E":
        this.router.navigate(["/tranches/tranche1/e"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1F":
        this.router.navigate(["/tranches/tranche1/f"], {
          queryParams: { tab: tab },
        });
        break;
      case "tranche 1G":
        this.router.navigate(["/tranches/tranche1/g"], {
          queryParams: { tab: tab },
        });
        break;
      case "TRANCHE 2":
        this.router.navigate(["/tranches/tranche2/2"], {
          queryParams: { tab: tab },
        });
        break;
      case "TRANCHE 3":
        this.router.navigate(["/tranches/tranche3/3"], {
          queryParams: { tab: tab },
        });
        break;
    }
  }

  prepareCols(){
    this.cols = [
      { field:"tranche", header:"", sort:false },
      { field:"desc", header:"My Task", sort:true },
      { field:"dctDepartment", header:"Pending", sort:true },
      { field:"unit", header:"Rejected", sort:true },
      { field:"systemValue", header:"Submitted", sort:true },
      // { field:"action", header:"", sort:false }
    ];
  }

}
