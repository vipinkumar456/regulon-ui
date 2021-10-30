import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tranche3Service } from '../../../Services/tranche3.service';
import { Tranche3editComponent } from '../../../tranche3edit/tranche3edit.component';

@Component({
  selector: 'app-maker3-data',
  templateUrl: './maker-data.component.html',
  styleUrls: ['./maker-data.component.scss']
})
export class Tranche3MakerDataComponent implements OnInit {

  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;
  @Input() rf:any;
  activePage: number = 0;
  size = 10;
  rejectedFlag: any;
  sort: string = "dctNumber";
  data: Array<any> = [];
  popIndex: number;
  searchText: string;
  headElements:any

  @Output() myEvent = new EventEmitter();




  constructor(private tranche3service:Tranche3Service,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getMakerAll(this.quarter,this.tt,this.year)
   this.headElements = [
      { name: "paramNo", title:"Param No.", width:"120px", sort: false },
      { name: "controlParameter", title:"Control Parameter", width:"300px", sort: false },
      { name: "controlType", title:"Control Type", width:"150px", sort: false },
      { name: "dateOfLastReview", title:"Date of Last Review", width:"180px", sort: false },
      { name: "controlPolicy", title:"Control Policy", width:"120px", sort: false },
      { name: "controlProcess", title:"Control Process", width:"120px", sort: false },
      { name: "reviewMechanism", title:"Review Mechanism", width:"120px", sort: false },
      { name: "current_owner", title:"Type of check", width:"120px", sort: false },
      { name: "samplingMethdology", title:"Sampling Methdology", width:"300px", sort: false },
      { name: "dctDepartment", title:"Number of Samples Checked", width:"150px", sort: false },
      { name: "unit", title:"Audit Conclusion", width:"180px", sort: false },
      { name: "systemValue", title:"Sampling Methdology", width:"120px", sort: false },
      { name: "lq", title:"Number of Samples Checked", width:"120px", sort: false },
      { name: "fy", title:"Observation", width:"120px", sort: false },
      { name: "current_owner", title:"Complaince Conclusion", width:"120px", sort: false },
      { name: "fy", title:"Current Owner", width:"120px", sort: false },
      { name: "current_owner", title:"Document", width:"120px", sort: false },
    ];
  }

  getMakerAll(qt,tt,year){
    this.tranche3service.getMakerAll(
      this.activePage,
      this.size,
      qt,
      this.rejectedFlag=this.rf,
      this.tt,
      this.year,
      this.sort
    ).subscribe((res)=>{
      console.log(res);
      this.data = res.payload.content;
    })
  }

  edit(itm) {
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
          // that.getSearchAll(this.quarter, this.year, this.tt);
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

}
