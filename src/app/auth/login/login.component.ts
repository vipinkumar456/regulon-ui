import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading: boolean=false;
  resetPassword: boolean = false;
  user = {
    username: "",
    password: "",
    "rbsOrGapAPI": true,
  };
  invalid: boolean = false;
  constructor(
    private router: Router,
  private authService: AuthService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    
  }
  userIn(user) {
    this.user.username = user.toLowerCase();
  }

  doLogin() {
    this.isLoading = true;
    this.user.username = this.user.username.toLowerCase();
    this.authService.logIn(this.user).subscribe(
      (res) => {
        console.log(res);
        console.log(res["token"]);
        localStorage.setItem("rbsToken", res["token"]);
        localStorage.setItem("dgliger", JSON.stringify(res.username));
        localStorage.setItem("dgligerUser", JSON.stringify(res.username));
        this.router.navigate(["home"]);
        this.isLoading = false;
      },
      (err) => {
        this.invalid = true;
        this.isLoading = false;
      }
    );
  }
  
}
