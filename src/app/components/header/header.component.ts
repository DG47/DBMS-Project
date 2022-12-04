import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showFiller = false;
  admin: boolean = false;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
    this.admin = params['admin'] != undefined ? true : false;
    console.log(this.admin);
  });
  }

}
