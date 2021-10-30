import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"],
})
export class AdminPanelComponent implements OnInit {
  popopen: boolean = false;
  @HostListener("document:click")
  clickout() {
    this.popopen = false;
  }
  clickPop(event) {
    return event.stopPropagation();
  }

  constructor() {}

  ngOnInit() {}
  openPop(e) {
    e.stopPropagation();
    this.popopen = true;
  }
}
