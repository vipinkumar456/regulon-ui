import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
})
export class FaqComponent implements OnInit {
  query: string = "";
  constructor() {}

  ngOnInit() {}
  submitQuery() {
    window.alert("Your Query submitted successfully");
    this.query = "";
  }
}
