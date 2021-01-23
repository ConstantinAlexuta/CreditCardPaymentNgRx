import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ccp-view-all-dashboard',
  templateUrl: './ccp-view-all-dashboard.component.html',
  styleUrls: ['./ccp-view-all-dashboard.component.scss'],
})
export class CcpViewAllDashboardComponent implements OnInit {
  pageBrandItem: string = 'Credit Card Payment';

  constructor(private activatedRoute: ActivatedRoute) {}

  itemDashboardName: string = 'Credit Card Number';
  ngOnInit(): void {}
}
