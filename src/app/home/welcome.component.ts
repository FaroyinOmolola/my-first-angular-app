import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  pageTitle: string = "Welcome";

  constructor() {}

  ngOnInit(): void {}
}
