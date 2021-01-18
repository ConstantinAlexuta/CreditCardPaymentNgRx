import { CcpService } from './../ccp.service';
import { Component, OnInit } from '@angular/core';
import { CreditCardPayment } from 'src/app/model/credit-card-payment';

@Component({
  selector: 'app-ccp-view-all',
  templateUrl: './ccp-view-all.component.html',
  styleUrls: ['./ccp-view-all.component.scss'],
})
export class CcpViewAllComponent implements OnInit {
  ccps!: Array<CreditCardPayment>;

  constructor(private ccpService: CcpService) {}

  ngOnInit(): void {
    this.getCcps();
  }

  async getCcps() {
    this.ccpService.getCcps().subscribe(
      (data) => (this.ccps = data),
      (err) => console.error(err),
      () => console.log('Credit Card Payments was loaded from database')
    );
  }
}
