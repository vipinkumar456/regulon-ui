import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-pop-up',
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.css']
})
export class ConfirmPopUpComponent implements OnInit {
  heading: string = "";
  action = new Subject();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
 
  }
 
  onYesClick() {
    this.action.next(true);
    this.bsModalRef.hide()
  }

  onNoClick() {
    this.action.next(false);
    this.bsModalRef.hide()
  }
}
