import { CcpService } from './../ccp.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreditCardPayment } from 'src/app/model/credit-card-payment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ccp-view-one',
  templateUrl: './ccp-view-one.component.html',
  styleUrls: ['./ccp-view-one.component.scss'],
})
export class CcpViewOneComponent implements OnInit {
  ccps!: Array<CreditCardPayment>;

  ccp!: CreditCardPayment;

  currentId!: number;

  constructor(
    private ccpService: CcpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentId = +this.activatedRoute.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    this.currentId = +this.activatedRoute.snapshot.params.id;

    await this.getCcps();

    setTimeout(() => {
      this.getCcp(this.currentId);
    }, 500);
  }

  async getCcps() {
    this.ccpService.getCcps().subscribe(
      (data) => (this.ccps = data),
      (err) => console.error(err),
      () => console.log('Credit Card Payments was loaded from database')
    );
  }

  getCcp(id: number) {
    this.ccp = this.ccps[this.currentId - 1];
  }

  isAfterDelay: boolean = false;
  setDelayToShowIf() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 1000);
  }
}
