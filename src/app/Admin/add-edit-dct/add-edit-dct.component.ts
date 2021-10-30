import { Component, OnInit } from "@angular/core";
import { WorkFlowService } from "../../Services/workflow.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-edit-dct",
  templateUrl: "./add-edit-dct.component.html",
  styleUrls: ["./add-edit-dct.component.css"],
})
export class AddEditDctComponent implements OnInit {
  dct = {
    active: true,
    businessDefination: "",
    businessLogic: "",
    dctDescription: "",
    dctID: 0,
    dctNumber: "",
    dataUnit: "",
    department: "",
    editable: true,
    trancheType: "",
    inputTypeValue: "",
    riskType: "",
  };
  dctDepts = [];
  dctUnits = [];
  trancheTypes = [];
  riskTypes: Array<any> = [];
  isRiskType:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workFlowService: WorkFlowService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.getDctTypes();
    this.getTrancheTypes();
    this.getRiskTypes();
    this.getDctUnits();
  }
  getDctTypes() {
    this.workFlowService.getDctTypes().subscribe((res) => {
      this.dctDepts = res.payload;
    });
  }
  getDctUnits() {
    this.workFlowService.getDctUnits().subscribe((res) => {
      this.dctUnits = res.payload;
    });
  }
  getTrancheTypes() {
    this.workFlowService.getTrancheTypes().subscribe((res) => {
      this.trancheTypes = res.payload;
    });
  }
  getRiskTypes() {
    this.workFlowService.getRiskTypesAll().subscribe((res) => {
      this.riskTypes = res.payload;
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get("id")) {
        this.spinner.show();
        this.workFlowService.getDctById(params.get("id")).subscribe(
          (res) => {
            this.dct = res.payload;
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }
  onSubmit(form) {
    switch (this.dct.trancheType) {
      case "TRANCHE 1":
        this.dct["trancheTypeValue"] = 1;
        break;
      case "TRANCHE 1A":
        this.dct["trancheTypeValue"] = 11;
        break;
      case "TRANCHE 1B":
        this.dct["trancheTypeValue"] = 12;
        break;
      case "TRANCHE 1C":
        this.dct["trancheTypeValue"] = 13;
        break;
      case "TRANCHE 1D":
        this.dct["trancheTypeValue"] = 14;
        break;
      case "TRANCHE 2":
        this.dct["trancheTypeValue"] = 2;
        break;
      case "TRANCHE 3":
        this.dct["trancheTypeValue"] = 3;
        break;
    }
    this.spinner.show();
    // debugger;
    if (this.dct.dctID) {
      this.workFlowService.updateDct(this.dct).subscribe(
        (res) => {
          this.spinner.hide();
          this.toastr.success("DCT updated successfully", "Success");
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error("DCT update failed", "Error");
        }
      );
    } else {
      this.workFlowService.createDct(this.dct).subscribe(
        (res) => {
          this.spinner.hide();

          if (res.statusCode == 208) {
            // this.spinner.hide()
            this.toastr.error("DCT Already Exists", "Error", {
              timeOut: 5000,
            });
            return;
          }
          this.toastr.success("DCT created successfully", "Success");
          this.router.navigate(["admin/dct/edit/" + res.payload.dctID]);
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error("DCT creation failed", "Error");
        }
      );
    }
  }
  cancel() {
    this.router.navigate(["/admin/dcts"]);
  }
  trancheTypeChange(){
    console.log(this.dct.trancheType)
    if(this.dct.trancheType=='TRANCHE 2'){
      this.isRiskType=true;
    }
    else
    {
      this.isRiskType=false;
    }

  }
}
