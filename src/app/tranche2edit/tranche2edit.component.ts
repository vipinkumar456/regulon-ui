import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Tranche2Service } from "../Services/tranche2.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-tranche2edit",
  templateUrl: "./tranche2edit.component.html",
  styleUrls: ["./tranche2edit.component.css"]
})
export class Tranche2editComponent implements OnInit {
  isMaker: boolean = true;
  saved: EventEmitter<any> = new EventEmitter();
  next: EventEmitter<any> = new EventEmitter();
  prev: EventEmitter<any> = new EventEmitter();
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  heading: string = "";
  action = new Subject();
  data: any = {};
  edit: boolean = true;
  tt: any = "";
  type:any=""
  submitted: boolean = false;
  constructor(
    public bsModalRef: BsModalRef,
    private tranche2Service: Tranche2Service,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {}
  onYesClick() {
    this.action.next(true);
    this.bsModalRef.hide();
  }

  onNoClick() {
    this.action.next(false);
    this.bsModalRef.hide();
  }
  approveData(form) {
    this.submitted = true;
    let that = this;
    if (form.valid) {
      that.tranche2Service.approveData([that.data], this.tt).subscribe(
        res => {
          that.toastrService.success("Approved successfully", "Success");
          that.saved.next(true);
          // that.checkedData = [];
          // // that.getMakerAll(this.quarter, this.year, this.tt);
          // if (this.searchText == "") {
          //   this.getMakerAll(this.quarter, this.year, this.tt);
          // } else {
          //   this.getSearchAll(this.quarter, this.year, this.tt);
          // }
          // that.myEvent.emit(null);
          // this.action.next(true);
          // this.bsModalRef.hide();
        },
        err => {
          that.toastrService.error("Approve Failed", "Error");
        }
      );
    }
  }
  rejectData() {
    let that = this;
    that.tranche2Service.rejectData([that.data], that.tt).subscribe(
      res => {
        // that.getCheckerAll(this.quarter, this.year, this.tt);

        // if (this.searchText == "") {
        //   this.getCheckerAll(this.quarter, this.year, this.tt);
        // } else {
        //   this.getSearchAll(this.quarter, this.year, this.tt);
        // }
        that.toastrService.success("Rejected successfully", "Success");
        that.saved.next(true);
        // that.checker.getCheckerAll(that.quarter, that.year, that.tt);
        // that.info.getInfoAll(that.quarter, that.year, that.tt);
        // that.checkerEvent.emit(null);
      },
      err => {
        that.toastrService.error("Rejection Failed", "Error");
      }
    );
  }
  selectFiles(el) {
    // this.trancheId = el.trancheId;
    this.fileInput.nativeElement.click();
  }
  uploadFile() {
    // this.fileUploading = true;
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let size = fileBrowser.files[0].size / 1024 / 1024;
      if (size > 1) {
        this.toastrService.error("File size cannot exceed 1 MB", "Error");
        return;
      }
      const formData = new FormData();
      formData.append("file", fileBrowser.files[0]);
      this.tranche2Service
        .uploadDocs(formData, this.data.trancheId, this.tt)
        .subscribe(
          res => {
            this.toastrService.success("File uploaded successfully", "Success");
            // this.getMakerAll(this.quarter, this.year, this.tt);
            this.data.fileID = res.fileID;
            this.data.fileName = res.fileName;

            // if (this.searchText == "") {
            //   this.getMakerAll(this.quarter, this.year, this.tt);
            // } else {
            //   this.getSearchAll(this.quarter, this.year, this.tt);
            // }
            this.fileInput.nativeElement.value = "";
          },
          err => {
            this.toastrService.error("File upload failed", "Error");
          }
        );
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
  previous(){
    this.prev.next(true);
  }
  nextItm(){
    this.next.next(true);
  }
  delete(itm){
    itm.fileID =null;
    itm.fileInfo=null;
    this.tranche2Service.updateData(itm,this.tt).subscribe(res=>{
      this.toastrService.success('File Deleted Successfully');
      this.saved.next(true);
    },err=>{
      this.toastrService.error('File Delete Failed');
    })
  }
}
