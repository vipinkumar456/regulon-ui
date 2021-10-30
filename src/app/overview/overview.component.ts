import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  constructor() {
  }

  ngOnInit() {}
}
