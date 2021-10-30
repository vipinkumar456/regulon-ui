import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {
  public onClose: Subject<boolean>;
  data= { id: 0, name: '' }
  constructor(public bsModalRef: BsModalRef, private userService: UserService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }
  submitQuarter() {
    // this.onClose.next(true);
    // this.bsModalRef.hide()
    if (localStorage.getItem('dgliger')) {
      let user = JSON.parse(localStorage.getItem('dgliger'));
      this.userService.createUserRole(this.data, user['access_token']).subscribe(res => {
        this.onClose.next(true);
        this.bsModalRef.hide()
      }, err => {
        this.onClose.next(false);
        this.bsModalRef.hide()
      })
    }
  }
}
