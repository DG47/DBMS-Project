import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dbms-proj-ng';
  constructor(private matIconRegistry: MatIconRegistry, private httpClient: HttpClient, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      "github-circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/github-circle.svg")
    );
  }
}
