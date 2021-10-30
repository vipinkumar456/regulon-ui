import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { UserService } from "../../Services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  // user: any = {
  //   name: '',
  //   designation: '',
  //   role: '',
  //   username: '',
  //   password: '',
  //   active: true
  // }
  user: any = {};
  userRoles = [];
  public onClose: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.user = {
      accountNonExpired: true,
      accountNonLocked: true,
      authorities: [],
      credentialsNonExpired: true,
      enabled: true,
      id: 0,
      password: "",
      username: "",
    };

    this.getRoles();
  }
  userIn(user) {
    this.user.username = user.toLowerCase();
  }
  ngAfterViewChecked() {
    // this.user.username="";
    // this.user.password="";
    this.cdRef.detectChanges();
  }
  getRoles() {
    if (localStorage.getItem("dgliger")) {
      let user = JSON.parse(localStorage.getItem("dgliger"));
      this.userService.getRoles(user["access_token"]).subscribe((res) => {
        this.userRoles = res.payload;
      });
    }
  }
  onCheckboxChange(role, event) {
    if (event.target.checked) {
      this.user.authorities.push(role);
    } else {
      for (var i = 0; i < this.user.authorities.length; i++) {
        if (this.user.authorities[i] == role) {
          this.user.authorities.splice(i, 1);
        }
      }
    }
    console.log(this.user.authorities);
  }
  submitQuarter(form) {
    if (localStorage.getItem("dgliger") && this.user.authorities.length > 0) {
      let user = JSON.parse(localStorage.getItem("dgliger"));
      this.userService.createUser(this.user, user["access_token"]).subscribe(
        (res) => {
          if (res.statusCode == 208) {
            // this.spinner.hide()
            this.toastr.error("User Name Already Exists", "Error", {
              timeOut: 5000,
            });
            return;
          }
          this.onClose.next(true);
          this.bsModalRef.hide();
        },
        (err) => {
          this.onClose.next(false);
          this.bsModalRef.hide();
        }
      );
    }
  }
}
