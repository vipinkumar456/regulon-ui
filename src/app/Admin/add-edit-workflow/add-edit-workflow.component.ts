import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { UserService } from "../../Services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { WorkFlowService } from "../../Services/workflow.service";
import * as _ from "lodash";
import { ToastrService } from "ngx-toastr";
import { PagerService } from "../../Services/page.service";
@Component({
  selector: "app-add-edit-workflow",
  templateUrl: "./add-edit-workflow.component.html",
  styleUrls: ["./add-edit-workflow.component.css"],
})
export class AddEditWorkflowComponent implements OnInit {
  workFlow = {
    description: "",
    name: "",
    workflowID: 0,
  };
  workflowDcts = [];
  workflowUSer = [
    {
      level: 1,
      userName: 0,
      workflowID: 0,
    },
  ];
  dctList = { tranche: "all", dept: "all", riskType: "all" };
  data: any = {};
  dcts = [];
  mappedDcts = [];
  unMappedDcts = [];
  users = [];
  checkedAll: boolean = false;
  levels = [{ level: "1", userName: "", workflowID: 0 }];
  dctDepts = [];
  trancheTypes = [];
  selectedDcts = [];
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  sort: "workflowID";
  addDcts: Array<any> = [];
  deleteDcts: Array<any> = [];
  mappedPager: any = { size: 10, activePage: 0 };
  unMappedPager: any = { size: 10, activePage: 0 };
  riskTypes: Array<any> = [];
  getUnDct: boolean = false;
  isRiksType:boolean=false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private workFlowService: WorkFlowService,
    private toastr: ToastrService,
    private pagerService: PagerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get("id")) {
       this.getworkflow(params.get("id"))
      } else {
        this.getDcts();
      }
    });
    this.getUsers();
    this.getTrancheTypes();
    this.getDctTypes();
    this.getRiskTypes();
    this.getUnmapped();
  }
  getworkflow(id){
    this.workFlowService
    .getWorkFlowById(id)
    .subscribe((res) => {
      this.workFlow = res.payload;
      // console.log(this.workFlow)
      // this.getWorkFlowDcts(this.workFlow.workflowID);
      this.getDcts();
      this.getWorkFlowUsers(this.workFlow.workflowID);
    });
  }
  getRiskTypes() {
    this.workFlowService.getRiskTypesAll().subscribe((res) => {
      this.riskTypes = res.payload;
    });
  }
  getDctTypes() {
    this.workFlowService.getDctTypes().subscribe((res) => {
      this.dctDepts = res.payload;
    });
  }
  getTrancheTypes() {
    this.workFlowService.getTrancheTypes().subscribe((res) => {
      this.trancheTypes = res.payload;
    });
  }
  getWorkFlowDcts(id) {
    this.spinner.show();
    this.workFlowService.getWorkflowDct(id).subscribe(
      (res) => {
        // let dcts = []
        // console.log(res.payload)
        if (res.payload.length > 0) {
          // res.payload.map(o => {
          //   o.dctDescription.checked = true;
          //   dcts.push(o.dctDescription)
          // })
          this.workflowDcts = res.payload;
          // console.log(this.workflowDcts)
          // this.setPage(1);
        }

        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  getWorkFlowUsers(id) {
    this.workFlowService.getWorkflowUsers(id).subscribe((res) => {
      // res.payload.map(o => {
      //   o.user = o.user.id
      // })
      let levels = [];
      res.payload.map((o) => {
        o.userName = o.userName;
        o.workflowID = o.workflow.workflowID;
        delete o.workflow;
        delete o.user;
        levels.push(o);
      });
      this.levels =_.sortBy(levels, [function(o) { return o.level; }]);
      // this.levels = levels;
       console.log(this.levels)
    });
  }
  getUsers() {
    if (localStorage.getItem("dgliger")) {
      let user = JSON.parse(localStorage.getItem("dgliger"));
      this.spinner.show();
      this.userService.getAll(user["access_token"]).subscribe(
        (res) => {
          console.log(res);
          this.spinner.hide();
          this.users=_.sortBy(res, [function(o) { return o.userName; }]);
          console.log(this.users);
          //  = res.payload;

          // console.log(res.payload)
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }
  getMapped() {
    debugger
    console.log('getmapped');
    this.spinner.show();
    if (this.dctList.tranche == "TRANCHE 2") {
      this.workFlowService
        .getMappedByRisk(
          this.mappedPager.activePage.toString(),
          this.mappedPager.size,
          this.sort,
          this.workFlow.workflowID.toString(),
          this.dctList.dept,
          this.dctList.tranche,
          this.dctList.riskType
        )
        .subscribe(
          (res) => {
            this.mappedDcts = res.payload.content;
            this.mappedPager.totalPages = res.payload.totalPages;
            this.mappedPager.pages = Array(res.payload.totalPages);
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    } else {
      this.workFlowService
        .getMapped(
          this.mappedPager.activePage.toString(),
          this.mappedPager.size,
          this.sort,
          this.workFlow.workflowID.toString(),
          this.dctList.dept,
          this.dctList.tranche
        )
        .subscribe(
          (res) => {
            this.mappedDcts = res.payload.content;
            this.mappedPager.totalPages = res.payload.totalPages;
            this.mappedPager.pages = Array(res.payload.totalPages);
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }
  getUnmapped() {
    this.spinner.show();
    if (this.dctList.tranche == "TRANCHE 2") {
      this.workFlowService
        .getUnMappedByRisk(
          this.unMappedPager.activePage.toString(),
          this.unMappedPager.size,
          this.sort,
          this.workFlow.workflowID.toString(),
          this.dctList.dept,
          this.dctList.tranche,
          this.dctList.riskType
        )
        .subscribe(
          (res) => {
            // this.dcts = res.payload;
            let that = this;
            this.unMappedPager.totalPages = res.payload.totalPages;
            this.unMappedPager.pages = Array(res.payload.totalPages);
            this.unMappedDcts = res.payload.content;
            // this.unMappedDcts = _.filter(this.dcts, function(o) {
            //   return o.workflowID == that.workFlow.workflowID || !o.workflowID;
            // });
            // this.mappedDcts = _.filter(this.dcts, function(o) {
            //   return o.workflowID != that.workFlow.workflowID && o.workflowID;
            // });
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    } else {
      this.workFlowService
        .getUnMapped(
          this.unMappedPager.activePage.toString(),
          this.unMappedPager.size,
          this.sort,
          this.workFlow.workflowID.toString(),
          this.dctList.dept,
          this.dctList.tranche,
          this.dctList.riskType
        )
        .subscribe(
          (res) => {
            // this.dcts = res.payload;
            let that = this;
            this.unMappedPager.totalPages = res.payload.totalPages;
            this.unMappedPager.pages = Array(res.payload.totalPages);
            this.unMappedDcts = res.payload.content;
            // this.unMappedDcts = _.filter(this.dcts, function(o) {
            //   return o.workflowID == that.workFlow.workflowID || !o.workflowID;
            // });
            // this.mappedDcts = _.filter(this.dcts, function(o) {
            //   return o.workflowID != that.workFlow.workflowID && o.workflowID;
            // });
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }

  getDcts() {
    this.spinner.show();
    // let t = "all";
    // if (this.dctList.tranche == "ALE") {
    //   t = 'ALE';
    // }

    this.getMapped();
    if (this.getUnDct) {
      this.getUnmapped();
    }

    return;
    this.workFlowService
      .getUnMapped(
        this.activePage.toString(),
        this.size,
        this.sort,
        this.workFlow.workflowID.toString(),
        this.dctList.dept,
        this.dctList.tranche,
        this.dctList.riskType
      )
      .subscribe(
        (res) => {
          let that = this;
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.dcts = res.payload.content;
          this.unMappedDcts = _.filter(this.dcts, function (o) {
            return o.workflowID == that.workFlow.workflowID || !o.workflowID;
          });
          this.mappedDcts = _.filter(this.dcts, function (o) {
            return o.workflowID != that.workFlow.workflowID && o.workflowID;
          });
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  addLevel(valid) {
    if(!valid){
      //this.toastr.error('Please Create a Workflow first')
      return true;
    }
    this.levels.push({
      level: (this.levels.length + 1).toString(),
      userName: "",
      workflowID: 0,
    });
  }
  deleteLevel() {
    this.levels.pop();
    // return user;
  }
  checkAll() {
    let that = this;
    //debugger
    if (this.checkedAll) {
      that.unMappedDcts.map((o) => {
        let i = _.findIndex(this.deleteDcts, function (d) {
          return d == o.dctID;
        });
        i >= 0 ? this.deleteDcts.splice(i, 1) : null;
        let j = _.findIndex(this.addDcts, function (d) {
          return d == o.dctID;
        });
        j >= 0 ? this.addDcts.splice(j, 1) : null;
        if (
          that.addDcts.indexOf(o.dctID) < 0 &&
          (o.workflowID == that.workFlow.workflowID || !o.workflowID)
        ) {
          that.addDcts.push(o.dctID);
          o.checked=true;
          o.workflowID = this.workFlow.workflowID;
          // console.log(this.addDcts, this.deleteDcts)
        }
      });

      // let workflowDcts = _.filter(that.dcts, function (o) { return o.workflowID == that.workFlow.workflowID || !o.workflowID; });
      // this.workflowDcts = this.workflowDcts.concat(workflowDcts)
      // this.workflowDcts=this.dcts
      // console.log(this.workflowDcts)
    } else {
      // this.workflowDcts = []
      that.unMappedDcts.map((o) => {
        let i = _.findIndex(this.deleteDcts, function (d) {
          return d == o.dctID;
        });
        i >= 0 ? this.deleteDcts.splice(i, 1) : null;
        let j = _.findIndex(this.addDcts, function (d) {
          return d == o.dctID;
        });
        j >= 0 ? this.addDcts.splice(j, 1) : null;
        if (
          that.deleteDcts.indexOf(o.dctID) < 0 &&
          (o.workflowID == that.workFlow.workflowID || !o.workflowID)
        ) {
          that.deleteDcts.push(o.dctID);
          o.workflowID = null;
          o.checked=false;
          // console.log(this.addDcts, this.deleteDcts)
        }
      });
    }
    // console.log(this.addDcts, this.deleteDcts)
  }
  save() {
    let that = this;
    this.spinner.show();
    if (this.workFlow.workflowID) {
      this.workFlowService.updateWorkFlow(this.workFlow).subscribe(
        (res) => {
          this.workFlow = res.payload;
          this.toastr.success("WorkFlow updated successfully", "Success");
          this.addWorkflowDcts();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.workFlowService.createWorkFlow(this.workFlow).subscribe(
        (res) => {
          if (res.statusCode == 208) {
            this.spinner.hide();
            this.toastr.error("Workflow Name Already Exists", "Error", {
              timeOut: 5000,
            });
            return;
          }
          this.workFlow = res.payload;
          this.toastr.success("WorkFlow created successfully", "Success");
          // that.cerateWorkFlowDcts()
          //this.router.navigate
          
          this.addWorkflowDcts();
          // this.deleteWorkFlowDcts();
          // that.createWorkflowUsers()
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }
  cerateWorkFlowDcts() {
    this.spinner.show();
    // let checkedDcts = _.filter(this.dcts, ['checked', true])
    // console.log(checkedDcts)
    this.workflowDcts.map((o) => {
      !o.dctID ? (o.dctID = o.dctDescription.dctID) : null;
      delete o.dctDescription;
      delete o.workflow;
      delete o.id;
    });
    this.workFlowService
      .createWorkflowDct(this.workFlow.workflowID, this.workflowDcts)
      .subscribe(
        (res) => {
          // console.log(res)
          // this.createWorkflowUsers();
          // this.toastr.success('DCTs added to WorkFlow','Success');
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error("DCTs update failed", "Error");
        }
      );
  }
  createWorkflowUsers() {
    // let checkedUsers = _.filter(this.levels, ['checked', true])
    // let data = []
    this.levels.forEach((x, i) => {
      x.workflowID = this.workFlow.workflowID;
    });
    this.workFlowService
      .createWorkflowUsers(this.workFlow.workflowID, this.levels)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.router.navigate([
            "admin/workflow/edit/" + this.workFlow.workflowID,
          ]);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  searchDcts() {
    this.dcts = [];
    this.spinner.show();
    this.workFlowService
      .getUnMapped(
        this.activePage.toString(),
        this.size,
        this.sort,
        this.workFlow.workflowID.toString(),
        this.dctList.dept,
        this.dctList.tranche,
        this.dctList.riskType
      )
      .subscribe(
        (res) => {
          this.dcts = res.payload;
          // console.log(this.dcts);
          this.spinner.hide();
          if (this.workFlow.workflowID) {
            this.getWorkFlowDcts(this.workFlow.workflowID);
          } else {
            this.setPage(1);
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  cancel() {
    this.router.navigate(["admin/workflow"]);
  }
  onClickPage(pageNumber: number) {
    if (pageNumber < 1) return;
    if (pageNumber > this.pages.length) return;
    this.activePage = pageNumber;
    // this.onPageChange.emit(this.activePage);
  }
  // setPage(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //     return;
  //   }

  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.dcts.length, page);

  //   // get current page of items
  //   this.pagedItems = this.dcts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
  setPage(page: number) {
    this.activePage = page;
    this.getDcts();
  }
  setMappedPage(page: number) {
    this.mappedPager.activePage = page;
    this.getMapped();
  }
  setUnMappedPage(page: number) {
    this.unMappedPager.activePage = page;
    this.getUnmapped();
  }
  checkDct(event, dct) {
    let i = _.findIndex(this.deleteDcts, function (o) {
      return o == dct.dctID;
    });
    i >= 0 ? this.deleteDcts.splice(i, 1) : null;
    let j = _.findIndex(this.addDcts, function (o) {
      return o == dct.dctID;
    });
    j >= 0 ? this.addDcts.splice(j, 1) : null;
    if (event.target.checked) {
      this.addDcts.push(dct.dctID);
      dct.workflowID = this.workFlow.workflowID;
      // this.workflowDcts.push(dct)
    } else {
      this.deleteDcts.push(dct.dctID);
      dct.workflowID = null;
      // let i = _.findIndex(this.workflowDcts, function (o) { return o.dctID == dct.dctID; });
      // this.workflowDcts.splice(i, 1)
    }
    // console.log(this.addDcts, this.deleteDcts)
  }
  addWorkflowDcts() {
    this.workFlowService
      .addWorkflowDcts(this.workFlow.workflowID, this.addDcts)
      .subscribe(
        (res) => {
          // console.log(res)
          // this.createWorkflowUsers();
          // this.toastr.success('DCTs added to WorkFlow','Success');
          this.deleteWorkFlowDcts();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error("DCTs update failed", "Error");
        }
      );
  }
  deleteWorkFlowDcts() {
    this.workFlowService
      .deleteWorkflowDcts(this.workFlow.workflowID, this.deleteDcts)
      .subscribe(
        (res) => {
          // console.log(res)
          // this.createWorkflowUsers();
          // this.toastr.success('DCTs added to WorkFlow','Success');
          this.createWorkflowUsers();
          this.spinner.hide();
        },
        (err) => {
          this.createWorkflowUsers();
          this.spinner.hide();

          this.toastr.error("DCTs update failed", "Error");
        }
      );
  }

  check(dct) {
    let i = this.addDcts.findIndex((o) => {
      return o == dct.dctID;
    });
    if (dct.workflowID == this.workFlow.workflowID || i >= 0) {
      dct.checked = true;
      return;
    }
  }
  ngAfterViewChecked() {
    // this.paging(this.pageSize)
    this.cdRef.detectChanges();
  }
  trancheTypeChange(){
    console.log(this.dctList.tranche);
    if(this.dctList.tranche=='TRANCHE 2'){
      this.isRiksType=true;
    }
    else
    {
      this.isRiksType=false;
    }
  }
}
