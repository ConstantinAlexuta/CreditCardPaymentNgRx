import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataExchangeService } from 'src/app/shared/services/data-exchange.service';
import { Ccp } from '../../model/ccp.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { ccpActionTypes, createCcp } from '../../state/ccp.actions';
import { getCcps } from '../../state/ccp.selectors';
import { areCcpItemsComparedEquals } from '../../shared-locally/are-items-compared-equals';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-ccp-view-one-dashboard',
  templateUrl: './ccp-view-one-dashboard.component.html',
  styleUrls: ['./ccp-view-one-dashboard.component.scss'],
})
export class CcpViewOneDashboardComponent implements OnInit {
  itemsDashItem: string = 'ccps';
  itemCapitalizeFullName: string = 'Credit Card Payment';

  index: number = -1;
  indexInitial: number = -1;
  item!: Ccp;
  items!: Ccp[];

  itemsLength: number = -1;

  isFirstLoad: boolean = true;

  @Output() viewStatus: string = 'view'; // can be and "edit"

  itemHeaders: string[] = [
    'Id',
    'Credit Card Number',
    'Card Holder',
    'Expiration Date',
    'Amount',
    'Security Code (CCV)',
  ];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {}

  ngOnInit() {
    this.isFirstLoad = true;
    this.index = +this.activatedRoute.snapshot.params.id;
    this.indexInitial = this.index;
    this.goToIndexValue = this.index;

    this.getItems();

    this.viewStatus = 'view';

    this.viewComeBackFromCancelEditViewSubscription = this.dataExchangeService.currentMessageFromCancel.subscribe(
      (value) => {
        this.messageFromCancel = value;
        if (value == true) {
          this.viewStatus = 'view';
        }
      }
    );
  }

  async getItems(): Promise<any> {
    this.store.select(getCcps).subscribe(
      (data) => {
        this.items = data;
      },
      (err) => console.error(err),
      () => console.log(this.itemCapitalizeFullName + ' item was loaded')
    );

    const getItemsLengthInterval = setInterval(() => {
      if (!!this.items) {
        this.itemsLength = this.items.length;

        this.getNavigationAvailableOptions();
      }
      if (this.itemsLength != -1) {
        clearInterval(getItemsLengthInterval);
      }
    }, 100);
  }

  itemClassName: string = 'Ccp';
  itemDeleted!: Ccp;
  itemDeletedId!: number;

  itemToDelete!: Ccp;

  showIsItemDeletedFromDataBaseMessage: boolean = false;

  isItemDeletedFromDataBase: boolean = false;

  itemDeletedIfStillExistInDataBase: Ccp = null!;

  deleteCcp(ccpId: string | number) {
    this.store.dispatch(ccpActionTypes.deleteCcp({ ccpId }));
  }

  onDelete() {
    this.item = this.items[this.index - 1];

    this.itemToDelete = { ...this.item };

    this.isItemDeletedFromDataBase = false;
  }

  itemsReloaded!: Ccp[];

  async onDeleteOne() {
    this.deleteCcp(this.item.id + '');

    setTimeout(() => {
      this.store.select(getCcps).subscribe(
        (data) => {
          this.itemsReloaded = data;
          this.items = data;
        },
        (err) => console.error(err),
        () =>
          console.log(
            this.itemCapitalizeFullName +
              ' items array was reloaded after deleting one item'
          )
      );
    }, 200);

    setTimeout(() => {
      this.verifyIfItemIsDeleted(this.itemsReloaded, this.itemToDelete);
    }, 400);
  }

  verifyIfItemIsDeleted(items: Ccp[], item: Ccp) {
    this.isItemDeletedFromDataBase = true;

    this.showIsItemDeletedFromDataBaseMessage = true;

    for (let index = 0; index < items.length; index++) {
      if (areCcpItemsComparedEquals(this.itemToDelete, items[index])) {
        this.isItemDeletedFromDataBase = false;

        console.log(
          'failure on deleting ' +
            this.itemClassName +
            ' with id ' +
            this.index +
            ' to be deleted first was save in itemDeleted'
        );
      }
    }

    if (this.isItemDeletedFromDataBase) {
      this.itemDeleted = { ...this.itemToDelete };
    }
  }

  onCloseDeleteItemConfirmation() {
    this.dataExchangeService.changeMessageFromCancel(false);
    this.viewStatus = 'view';
    this.router.navigate(['../' + this.itemsDashItem + '/view-all']);
  }

  isOnCancelEdit: boolean = false;

  messageFromCancel = false;
  viewComeBackFromCancelEditViewSubscription!: Subscription;

  itemsDashName: string = 'ccps';

  onBack() {
    if (this.messageFromCancel) {
      this.viewStatus = 'view';
      this.dataExchangeService.changeMessageFromCancel(false);
    }

    if (this.viewStatus == 'view') {
      this.router.navigate(['../' + this.itemsDashName + '/view-all']);
    }

    if (this.viewStatus == 'edit') {
      this.viewStatus = 'view';
      this.router.navigate([
        '../' + this.itemsDashName + '/view-one/' + this.index + '/view',
      ]);
    }
  }

  onEdit() {
    this.dataExchangeService.changeMessageFromCancel(false);
    this.viewStatus = 'edit';
  }

  isNext: boolean = true;
  isPrev: boolean = true;

  getNavigationAvailableOptions() {
    let ms = 0;

    const getNavigationAvailableOptionsInterval = setInterval(() => {
      let index = +this.activatedRoute.snapshot.params.id;

      if (index < this.itemsLength) {
        this.isNext = true;
      } else {
        this.isNext = false;
      }

      if (index > 1) {
        this.isPrev = true;
      } else {
        this.isPrev = false;
      }

      ms += 100;

      if (this.isFirstLoad || this.indexInitial != index || ms >= 2000) {
        clearInterval(getNavigationAvailableOptionsInterval);
        this.isFirstLoad = false;
        this.indexInitial = index;
        this.goToIndexValue = index;
      }
    }, 100);

    this.dataExchangeService.changeMessageFromCancel(false);
    this.viewStatus = 'view';
  }

  onPrev() {
    if (this.index > 1) {
      this.router.navigate([
        '../' + this.itemsDashItem + '/view-one',
        +this.index - 1,
      ]);

      this.index--;
    }

    this.getNavigationAvailableOptions();
  }

  onNext() {
    if (this.index < this.itemsLength) {
      this.router.navigate([
        '../' + this.itemsDashItem + '/view-one',
        +this.index + 1,
      ]);

      this.index++;
    }

    this.getNavigationAvailableOptions();
  }

  onFirst() {
    if (this.index > 1) {
      this.router.navigate(['../' + this.itemsDashItem + '/view-one', +1]);

      this.index = 1;

      this.getNavigationAvailableOptions();
    }
  }

  onLast() {
    if (this.index != this.itemsLength) {
      this.router.navigate([
        '../' + this.itemsDashItem + '/view-one',
        +this.itemsLength,
      ]);

      this.index = this.itemsLength;
      this.getNavigationAvailableOptions();
    }
  }

  goToIndexValue!: number;

  showIsLessThanMinimumMessage: boolean = false;
  isLessThanMinimumMessage: string = 'less than min';

  showIsBiggerThanMaximumMessage: boolean = false;
  isBiggerThanMaximumMessage: string = 'bigger than max';

  onGoToIndex() {
    this.showIsLessThanMinimumMessage = false;
    this.showIsBiggerThanMaximumMessage = false;

    if (this.goToIndexValue < 1) {
      this.showIsLessThanMinimumMessage = true;
      setTimeout(() => {
        this.showIsLessThanMinimumMessage = false;
      }, 4000);
    }

    if (this.goToIndexValue > this.itemsLength) {
      this.showIsBiggerThanMaximumMessage = true;
      setTimeout(() => {
        this.showIsBiggerThanMaximumMessage = false;
      }, 4000);
    }

    if (this.goToIndexValue >= 1 && this.goToIndexValue <= this.itemsLength) {
      this.router.navigate([
        '../' + this.itemsDashItem + '/view-one',
        +this.goToIndexValue,
      ]);

      this.index = +this.goToIndexValue;
    }

    this.getNavigationAvailableOptions();
  }

  idOfLastItemDuplicated!: number;

  showThisIsADuplicateMessage: boolean = false;
  thisIsADuplicateMessage!: string;

  itemToDuplicate!: Ccp;

  onDuplicate() {
    this.itemToDuplicate = this.items[this.index - 1];
    this.showThisIsADuplicateMessage = false;
  }

  onDuplicateConfirmation() {
    let initialIndex = this.index;

    let newId = uuidv4();

    const ccp: Ccp = { ...this.itemToDuplicate };

    ccp.id = newId;

    this.store.dispatch(createCcp({ ccp }));

    this.onLast();

    this.thisIsADuplicateMessage =
      'This is a new item with a new id (autogenerated), duplicated from item with index ' +
      initialIndex;

    setTimeout(() => {
      this.showThisIsADuplicateMessage = true;
    }, 1000);

    setTimeout(() => {
      this.showThisIsADuplicateMessage = false;
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.viewComeBackFromCancelEditViewSubscription)
      this.viewComeBackFromCancelEditViewSubscription.unsubscribe();
  }
}
