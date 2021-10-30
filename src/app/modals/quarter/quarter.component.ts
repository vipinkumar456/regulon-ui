import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quarter',
  templateUrl: './quarter.component.html',
  styleUrls: ['./quarter.component.css']
})
export class QuarterComponent implements OnInit {
  quarter: any = "1";
  public onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }
  submitQuarter() {
    this.onClose.next(this.quarter);
    this.bsModalRef.hide()
  }
}
