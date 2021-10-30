import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { QuarterComponent } from "../../modals/quarter/quarter.component";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../Services/user.service";
import * as _ from "lodash";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public itemsMnimized = true;
  public navItems = navItems;
  isAdmin: boolean;
  user = { id: 2, userName: "", roles: [{}] };
  bsModalRef: BsModalRef;
  token: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private userService: UserService
  ) {
    // this.activatedRoute.firstChild.params.subscribe((res) => {
    //   if (res.token) {
    //     this.token = res.token;
    //     window.sessionStorage.setItem("rbsToken", this.token);
    //     this.router.navigate(["home"]);
    //   }
    // });
    this.getUser();
    if (this.token) {
      // window.sessionStorage.setItem("gapToken1", this.token);
    }
    // this.router.navigate(["home"]);
  }
  getUser() {
    this.userService.validateUser().subscribe(
      res => {
        this.user = res;
        let i = _.findIndex(res.authorities, function(o) {
          return o.name == "ADMIN";
        });
        i >= 0 ? (this.isAdmin = true) : (this.isAdmin = false);
        console.log(this.user)
      },
      err => {
        console.log(err);
        if ((err = "invalid_token")) {
          this.logout()
        }
      }
    );
    return this.isAdmin;
  }
  getAuth(role?: string) {
    if (role != "ADMIN") {
      return true;
    }
    if (role == "ADMIN" && this.user) {
      let i = _.findIndex(this.user.roles, function(o) {
        return o.name == role;
      });
      if (i >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  tranchClick(url) {
    this.bsModalRef = this.modalService.show(QuarterComponent, {
      class: "modal-sm modal-info"
    });
    this.bsModalRef.content.onClose.subscribe(result => {
      this.router.navigate([url]);
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
    // window.location.reload();
  }
  goTo(itm) {
    if (itm.url != "") {
      this.router.navigate([itm.url]);
    } else {
      const a = document.createElement("a");
      if (itm.text == "excel") {
        a.href = "../../assets/sample.xlsx";
        a.download = "sample.xlsx";
        // window.open("../../assets/sample.elsx", '_blank');
      }
      if (itm.text == "csv") {
        a.href = "../../assets/sample.csv";
        a.download = "sample.csv";
        // window.open("../../assets/sample.elsx", '_blank');
      }
      if (itm.text == "xbrl") {
        a.href = "../../assets/sample.rar";
        a.download = "sample.rar";
        // window.open("../../assets/sample.elsx", '_blank');
      }
      a.click();
    }
  }
  download(format) {
    const a = document.createElement("a");
    if (format == "excel") {
      a.href = URL.createObjectURL("../assets/sample.excel");
      a.download = "sample.excel";
    }
    a.click();
  }
}
