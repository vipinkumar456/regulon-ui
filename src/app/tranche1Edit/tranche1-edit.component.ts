import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Output,
  HostListener,
} from "@angular/core";
import { Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Tranche1Service } from "../Services/trenche1.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tranche1-edit",
  templateUrl: "./tranche1-edit.component.html",
  styleUrls: ["./tranche1-edit.component.css"],
})
export class Tranche1EditComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
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
  type: any = "";
  submitted: boolean = false;
  @HostListener("document:click")
  clickout() {
    /*this.data.map((o) => {
      o.popopen = false;
    });*/
    this.data['popopen']=false;
  }
  clickPop(event) {
    return event.stopPropagation();
  }
  constructor(
    public bsModalRef: BsModalRef,
    private tranche1Service: Tranche1Service,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
  }
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
    let docsRequred: boolean = false;
    if (this.data.systemValue != this.data.inputValue) {
      if (this.data.fileID == null) {
        this.toastrService.error("Document are required");
        this.data.fileReq = true;
        docsRequred = true;
      }
    }
    if (this.data.systemValue != this.data.inputValue) {
      if (!this.data.comments) {
        this.toastrService.error("Comment are required");
        // this.data.fileReq = true;
         docsRequred = true;
      }
    }
    if (docsRequred) {
      return;
    }
    if (form.valid) {
      that.tranche1Service.approveData([that.data]).subscribe(
        (res) => {
          that.toastrService.success("Approved successfully", "Success");
          that.saved.next(true);
        },
        (err) => {
          that.toastrService.error("Approve Failed", "Error");
        }
      );
    }
  }
  rejectData() {
    let that = this;
    that.tranche1Service.rejectData([that.data]).subscribe(
      (res) => {
        that.toastrService.success("Rejected successfully", "Success");
        that.saved.next(true);
      },
      (err) => {
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
      this.tranche1Service
        .uploadDocs(formData, this.data.trancheId, this.tt)
        .subscribe(
          (res) => {
            this.toastrService.success("File uploaded successfully", "Success");
            // this.files = res.fileName;
            // this.getMakerAll(this.quarter, this.year, this.tt);
            this.data.fileID = res.fileID;
            this.data.fileName = res.fileName;

            // if (this.searchText == "") {
            //   this.getMakerAll(this.quarter, this.year, this.tt);
            // } else {
            //   this.getSearchAll(this.quarter, this.year, this.tt);
            // }
            this.fileInput.nativeElement.value = res.fileName;
          },
          (err) => {
            this.toastrService.error("File upload failed", "Error");
          }
        );
    }
  }
  download(el) {
    this.tranche1Service.downloadDocs(el.fileID).subscribe((res) => {
      // console.log(res);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res._body);
      a.download = el.fileName;
      a.click();
    });
  }
  previous() {
    this.prev.next(true);
  }
  nextItm() {
    this.next.next(true);
  }
  delete(itm) {
    itm.fileID = null;
    itm.fileInfo = null;
    this.tranche1Service.updateData(itm, this.tt).subscribe(
      (res) => {
        this.toastrService.success("File Deleted Successfully");
        this.saved.next(true);
      },
      (err) => {
        this.toastrService.error("File Delete Failed");
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
    let that=this;
    this.tranche1Service.updateData(itm, this.tt).subscribe(
      (res) => {
        this.toastrService.success("Input Value Updated Successfully");
        // if (this.searchText == "") {
        //   this.getMakerAll(this.quarter, this.year, this.tt);
        // } else {
        //   this.getSearchAll(this.quarter, this.year, this.tt);
        // }
        that.saved.next(true);
        this.myEvent.emit(null);
      },
      (err) => {
        this.toastrService.error("Input Value Update Failed");
      }
    );
  }
}
