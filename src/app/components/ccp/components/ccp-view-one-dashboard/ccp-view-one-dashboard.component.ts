import { Component, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemService } from 'src/app/shared/services/item.service';
import { SERVER_API_V1 } from 'src/app/app.constants';
import { DataExchangeService } from 'src/app/shared/services/data-exchange.service';
import { Ccp } from '../../model/ccp.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { ccpActionTypes } from '../../state/ccp.actions';
import { getCcps } from '../../state/ccp.selectors';

@Component({
  selector: 'app-ccp-view-one-dashboard',
  templateUrl: './ccp-view-one-dashboard.component.html',
  styleUrls: ['./ccp-view-one-dashboard.component.scss'],
})
export class CcpViewOneDashboardComponent implements OnInit {
  //
  // ###################################################
  //
  itemNameItem: string = 'ccp';
  itemDashItem: string = 'ccp';
  itemsDashItem: string = 'ccps';
  itemCapitalizeFullName: string = 'Credit Card Payment';

  index: number = -1;
  indexInitial: number = -1;
  item!: Ccp;
  items!: Ccp[];

  isFirstLoad: boolean = true;

  itemHeaders: string[] = [
    'Id',
    'Credit Card Number',
    'Card Holder',
    'Expiration Date',
    'Amount',
    'Security Code (CCV)',
  ];

  previousId: number = -1;
  prevId: number = -1;
  nextId: number = -1;

  pathId!: string;
  itemPath!: string;
  itemsPath: string = SERVER_API_V1 + this.itemDashItem;
  pageBrandViewOneItem!: string;
  subscription!: Subscription;

  @Output() viewStatus: string = 'view'; // can be and "edit"

  itemsLength: number = -1;
  currentIndexFromItems: number = -1;

  firstItemOfItemsId: number = -11;
  lastItemOfItemsId: number = -1;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {
    this.index = +this.activatedRoute.snapshot.params.id;

    this.indexInitial = this.index;

    this.viewStatus = 'view';
  }

  async ngOnInit(): Promise<void> {
    this.isFirstLoad = true;

    this.viewStatus = 'view';

    this.itemPath =
      SERVER_API_V1 + this.itemDashItem + '/' + (await this.index); //  e.g.:  '/server/api/v1/ccp/id';

    this.viewComeBackFromCancelEditViewSubscription = this.dataExchangeService.currentMessageFromCancel.subscribe(
      (value) => {
        this.messageFromCancel = value;
        if (value == true) {
          this.viewStatus = 'view';
        }
      }
    );

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
    });

    this.index = +this.activatedRoute.snapshot.params.id;

    // ATTEMP 1 = INSTANT //////////////////////////////////////////////////////////////////
    await this.getItem();
    await this.getItems();

    ///////////////
    this.index = +this.activatedRoute.snapshot.params.id;

    this.itemPath = SERVER_API_V1 + this.itemDashItem + '/' + this.index;

    this.firstItemOfItemsId = +this.items[0].id!;

    this.lastItemOfItemsId = +this.items[this.itemsLength - 1].id!;

    this.currentIndexFromItems = this.items.findIndex(
      (itemIterator) => +itemIterator.id! == this.index
    );

    this.evaluateMarginsForDisablingNavigationButtons();

    //   this.evaluateMarginsForDisablingNavigationButtons();

    setTimeout(() => {
      this.goToIdValue = this.index;
    }, 500);

    setTimeout(() => {
      this.index = +this.activatedRoute.snapshot.params.id;
      this.goToIdValue = this.index;
      this.getItem();
    }, 1000);
  }

  updateItemAndOthers() {
    setTimeout(() => {
      this.index = +this.activatedRoute.snapshot.params.id;
      this.goToIdValue = this.index;
      this.getItem();
    }, 500);
  }

  updateItemsAndOthersIfItemAdded() {
    let currentLastId = this.lastItemOfItemsId;

    this.getItems();

    setTimeout(() => {
      if (currentLastId == this.lastItemOfItemsId) {
        this.getItems();
      }
    }, 700);

    setTimeout(() => {
      if (currentLastId == this.lastItemOfItemsId) {
        this.getItems();
      }
    }, 1500);

    setTimeout(() => {
      if (currentLastId == this.lastItemOfItemsId) {
        this.getItems();
      }
    }, 3000);
  }

  async getItem() {
    (await this.itemService.getItem(this.itemPath)).subscribe(
      (data) => {
        this.item = data;
      },
      (err) => console.error(err),
      () =>
        console.log(
          this.itemNameItem + ' with id ' + this.index + ' was loaded'
        )
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
  itemId!: number;
  itemDeleted!: Ccp;
  itemDeletedId!: number;

  itemToDelete!: Ccp;

  showIsItemDeletedFromDataBaseMessage: boolean = false;
  isItemDeletedFromDataBase: boolean = false;
  itemDeletedIfStillExistInDataBase: Ccp = null!;

  deleteCcp(ccpId: string | number) {
    this.store.dispatch(ccpActionTypes.deleteCcp({ ccpId }));
  }

  async onDelete() {
    this.isItemDeletedFromDataBase = false;

    this.deleteCcp(this.index);
  }

  async onDeleteOne() {
    this.itemService.deleteItem(this.itemPath);

    setTimeout(async () => {
      (await this.itemService.getItem(this.itemPath)).subscribe(
        (data) => {
          this.itemDeletedIfStillExistInDataBase = data;
        },
        (err) => {
          this.isItemDeletedFromDataBase = true;
          this.showIsItemDeletedFromDataBaseMessage = true;
        },
        () => {
          this.showIsItemDeletedFromDataBaseMessage = true;
          console.log(
            'failure on deleting ' +
              this.itemClassName +
              ' with id ' +
              this.index +
              ' to be deleted first was save in itemDeleted'
          );
        }
      );
    }, 800);
  }

  // @Input()
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

  onDeleteItemConfirmation() {
    this.dataExchangeService.changeMessageFromCancel(false);
    this.viewStatus = 'view';
    this.router.navigate(['../' + this.itemDashItem + '/view-all']);
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

  isFirstId: boolean = true;
  isLastId: boolean = false;

  evaluateMarginsForDisablingNavigationButtons() {
    if (this.currentIndexFromItems == 0) {
      this.isFirstId = true;
    } else {
      this.isFirstId = false;
    }
    if (this.currentIndexFromItems == this.itemsLength - 1) {
      this.isLastId = true;
    } else {
      this.isLastId = false;
    }
  }

  setGoToIdValueTo(goToIdNewValue: number) {
    this.goToIdValue = goToIdNewValue;
  }

  hideAllGoToIdMessages() {
    this.showIsLessThanMinimumMessage = false;
    this.showIsBiggerThanMaximumMessage = false;
    this.showIidDoesntExistMessage = false;
  }

  goToIdValue!: number;

  showIsLessThanMinimumMessage: boolean = false;
  isLessThanMinimumMessage: string = 'less than min';

  showIsBiggerThanMaximumMessage: boolean = false;
  isBiggerThanMaximumMessage: string = 'bigger than max';

  showIidDoesntExistMessage: boolean = false;
  idDoesntExistMessage: string = "id doesn't exist";

  onGoToId() {
    this.hideAllGoToIdMessages();

    if (this.goToIdValue < this.firstItemOfItemsId) {
      this.showIsLessThanMinimumMessage = true;
      setTimeout(() => {
        this.showIsLessThanMinimumMessage = false;
      }, 4000);
    }

    if (this.goToIdValue > this.lastItemOfItemsId) {
      this.showIsBiggerThanMaximumMessage = true;
      setTimeout(() => {
        this.showIsBiggerThanMaximumMessage = false;
      }, 4000);
    }

    if (
      this.goToIdValue == null ||
      (this.goToIdValue >= this.firstItemOfItemsId &&
        this.goToIdValue <= this.lastItemOfItemsId &&
        !this.checkIfThisIdExist(this.goToIdValue))
    ) {
      this.showIidDoesntExistMessage = true;
      setTimeout(() => {
        this.showIidDoesntExistMessage = false;
      }, 4000);
    }

    if (
      this.goToIdValue >= this.firstItemOfItemsId &&
      this.goToIdValue <= this.lastItemOfItemsId
    ) {
      this.router.navigate([
        '../' + this.itemDashItem + '/view-one/' + this.goToIdValue + '/view',
      ]);
    }
  }

  checkIfThisIdExist(checkId: number): boolean {
    let answer: boolean = false;
    this.items.forEach((item) => {
      if (+item.id! == checkId) {
        answer = true;
      }
    });
    return answer;
  }

  //To prevent memory leak
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();

    if (this.viewComeBackFromCancelEditViewSubscription)
      this.viewComeBackFromCancelEditViewSubscription.unsubscribe();
  }

  onNew() {}

  idOfLastItemDuplicated!: number;

  showThisIsADuplicateMessage: boolean = false;
  thisIsADuplicateMessage!: string;

  async onDuplicate() {
    this.showThisIsADuplicateMessage = false;

    let itemToDuplicate = Object.assign({}, this.item); // simple clone

    this.idOfLastItemDuplicated = +this.item.id!;

    this.thisIsADuplicateMessage =
      'This is a new item with a new id, duplicated from item with id ' +
      this.idOfLastItemDuplicated;

    // itemToDuplicate.id = undefined;

    ///////////////////////////////// TO BE SOLVED
    // await this.itemService.createItem(this.itemsPath, itemToDuplicate);

    this.updateItemsAndOthersIfItemAdded();

    setTimeout(() => {
      this.router.navigate([
        '../' +
          this.itemDashItem +
          '/view-one/' +
          this.lastItemOfItemsId +
          '/view',
      ]);

      this.showThisIsADuplicateMessage = true;

      setTimeout(() => {
        this.getItem();
      }, 200);
    }, 1000);

    setTimeout(() => {
      this.showThisIsADuplicateMessage = false;
    }, 10000);
  }
}
