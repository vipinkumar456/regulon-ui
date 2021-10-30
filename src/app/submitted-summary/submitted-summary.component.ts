import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tranche1Service } from '../Services/trenche1.service';

@Component({
  selector: 'app-submitted-summary',
  templateUrl: './submitted-summary.component.html',
  styleUrls: ['./submitted-summary.component.scss']
})
export class SubmittedSummaryComponent implements OnInit {

  data: Array<any> = [];
  paging = {};
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  sort: string = "dctNumber";

  @Input() quarter: any;
  @Input() year: any;
  @Input() tt: any;

  constructor(
    private spinner: NgxSpinnerService,
    private tranche1Service: Tranche1Service,
  ) { }

  ngOnInit(): void {
    this.getSubmittedValue(this.quarter,this.year,this.tt, this.pagedItems, this.size, this.sort);
  }

  headElements = [
    { name: "dctNumber", title: "DCT#", width:"120px", sort: true },
    { name: "desc", title: "DCT Description", width:"300px", sort: false },
    { name: "dctDepartment", title: "Department", width:"150px", sort: false },
    { name: "unit", title: "Units", width:"120px", sort: false },
    { name: "systemValue", title: "System Value", width:"120px", sort: false },
    { name: "lq", title: "Last Quarter", width:"120px", sort: false },
    { name: "slq", title: "Second Last Quarter", width:"120px", sort: false },
    { name: "current_owner", title:"Current Owner", width:"120px", sort: false },
  ];

  getSubmittedValue(qt, year, tt, page, size, sort) {
    debugger;
    this.data = [];
    this.spinner.show();
    this.tranche1Service
      .getSubmittedValue(
        qt,
        year,
        tt,
        page,
        size,
        sort
      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.pager.totalPages = res.payload.totalPages;
          this.pages = Array(res.payload.totalPages);
          this.spinner.hide();
          res.payload.map((o) => {
            if (o.dateOfLastReviewControl) {
              let dateParts = o.dateOfLastReviewControl.split("/");
              // console.log(dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0])
              o.dateOfLastReviewControl = new Date(
                dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]
              );

              // o.dateOfLastReviewControl = new Date(o.dateOfLastReviewControl);
            }
          });
          this.data = res.payload;
          console.log(this.data)
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

}
