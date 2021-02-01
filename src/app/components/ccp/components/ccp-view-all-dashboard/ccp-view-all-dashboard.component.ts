import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccp-view-all-dashboard',
  templateUrl: './ccp-view-all-dashboard.component.html',
  styleUrls: ['./ccp-view-all-dashboard.component.scss'],
})
export class CcpViewAllDashboardComponent implements OnInit {
  pageBrandItem: string = 'Credit Card Payment';

  constructor() {}

  itemDashboardName: string = 'Credit Card Number';

  ngOnInit(): void {}
}
