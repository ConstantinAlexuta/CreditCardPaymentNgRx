import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ccp } from '../../model/ccp.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { getCcps } from '../../state/ccp.selectors';

@Component({
  selector: 'app-ccp-view-one',
  templateUrl: './ccp-view-one.component.html',
  styleUrls: ['./ccp-view-one.component.scss'],
})
export class CcpViewOneComponent implements OnInit {
  index!: number;
  item!: Ccp;
  itemCapitalizeFullName: string = 'Credit Card Payment';

  itemHeaders: string[] = [
    'Internal id',
    'Credit Card Number',
    'Card Holder',
    'Expiration Date',
    'Amount',
    'Security Code (CCV)',
  ];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.index = this.activatedRoute.snapshot.parent?.params.id;

    this.getItem();

    this.showItemListEmptyMessageAfterDelay();
  }

  getItem() {
    this.store.select(getCcps).subscribe(
      (data) => {
        this.item = data[this.index];
      },
      (err) => console.error(err),
      () => console.log(this.itemCapitalizeFullName + ' item was loaded')
    );
  }

  isAfterDelay: boolean = false;

  showItemListEmptyMessageAfterDelay() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 200);
  }
}
