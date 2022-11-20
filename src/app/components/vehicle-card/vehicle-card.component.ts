import {Component, Inject, Input} from '@angular/core';
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {

  @Input() vehicle: any;

  constructor() {

  }

  public formatMSRP(MSRP: number): String {
    return formatCurrency(MSRP, 'en-US', '$');
  }
}
