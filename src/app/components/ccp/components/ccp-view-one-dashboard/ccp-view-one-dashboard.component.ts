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

  item!: Ccp;
  items!: Ccp[];
  itemHeaders: string[] = [
    'Id',
    'Credit Card Number',
    'Card Holder',
    'Expiration Date',
    'Amount',
    'Security Code (CCV)',
  ];
  itemFields: string[] = [
    'id',
    'creditCardNumber',
    'cardHolder',
    'expirationDate',
    'amount',
    'securityCodeCCV',
  ];
  //
  // ###################################################
  //
  previousId: number = -1;
  currentId: number = -1;
  prevId: number = -1;
  nextId: number = -1;

  pathId!: string;
  itemPath!: string;
  itemsPath: string = SERVER_API_V1 + this.itemDashItem;
  pageBrandViewOneItem!: string;
  subscription!: Subscription;
  // currentLongRouter!: string;
  currentShortRouter!: string; // view-one
  currentShortRouterId!: string; // 34
  @Output() viewStatus: string = 'view'; // can be and "edit"

  itemsLength: number = -1;
  currentIndexFromItems: number = -1;

  firstItemOfItemsId: number = -11;
  lastItemOfItemsId: number = -1;
  //
  // ###################################################
  //

  // ccp!: Ccp;
  activeId!: number;
  // nextIdExistingInDataBase: number = -1;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {
    this.viewStatus = 'view';
    this.currentShortRouter = activatedRoute.snapshot.url[0].path; // view-one
    this.currentShortRouterId = activatedRoute.snapshot.url[1].path; // view-one
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  async ngOnInit(): Promise<void> {
    //
    // ###################################################
    //
    this.viewStatus = 'view';
    // this.currentLongRouter = this.router.url;
    this.currentId = +this.activatedRoute.snapshot.paramMap.get('id')
      ?.toString!;
    this.itemPath =
      SERVER_API_V1 + this.itemDashItem + '/' + (await this.currentId); //  e.g.:  '/server/api/v1/ccp/id';
    //
    // ###################################################
    //

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

    this.activeId = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.currentId = +this.activatedRoute.snapshot.params.id;

    // ATTEMP 1 = INSTANT //////////////////////////////////////////////////////////////////
    await this.getItem();
    await this.getItems();

    ///////////////
    this.currentId = +this.activatedRoute.snapshot.params.id;

    this.itemPath = SERVER_API_V1 + this.itemDashItem + '/' + this.currentId;

    this.firstItemOfItemsId = +this.items[0].id!;

    this.lastItemOfItemsId = +this.items[this.itemsLength - 1].id!;

    this.currentIndexFromItems = this.items.findIndex(
      (itemIterator) => +itemIterator.id! == this.currentId
    );

    this.getPrevId();
    this.getNextId();
    this.evaluateMarginsForDisablingNavigationButtons();
    

    // var checkData = setInterval(() => {
    //   this.currentId = +this.activatedRoute.snapshot.params.id;

    //   this.itemPath = SERVER_API_V1 + this.itemDashItem + '/' + this.currentId;

    //   this.firstItemOfItemsId = +this.items[0].id!;

    //   this.lastItemOfItemsId = +this.items[this.itemsLength - 1].id!;

    //   this.currentIndexFromItems = this.items.findIndex(
    //     (itemIterator) => +itemIterator.id! == this.currentId
    //   );

    //   this.getPrevId();
    //   this.getNextId();
    //   this.evaluateMarginsForDisablingNavigationButtons();

    //   if (false) {
    //     clearInterval(checkData);
    //   }
    // }, 200);

    setTimeout(() => {
      this.goToIdValue = this.currentId;
    }, 500);

    setTimeout(() => {
      this.currentId = +this.activatedRoute.snapshot.params.id;
      this.goToIdValue = this.currentId;
      this.getItem();
    }, 1000);
  }

  updateItemAndOthers() {
    setTimeout(() => {
      this.currentId = +this.activatedRoute.snapshot.params.id;
      this.goToIdValue = this.currentId;
      this.getItem();
    }, 500);
  }

  updateItemsAndOthersIfItemAdded() {
    let currentLastId = this.lastItemOfItemsId;

    setTimeout(() => {
      this.getItems();
    }, 200);

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
          this.itemNameItem + ' with id ' + this.currentId + ' was loaded'
        )
    );
  }

  async getItems(): Promise<any> {
    (await this.itemService.getItems(this.itemsPath)).subscribe(
      (data) => {
        this.items = data;
        this.itemsLength = data.length;
        console.log(data);
      },
      (err) => console.error(err),
      () => {
        console.log('destination categories loaded');
      }
    );
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

    this.deleteCcp(this.currentId);

    // (await this.itemService.getItem(this.itemPath)).subscribe(
    //   (data) => {
    //     this.itemDeleted = data;
    //     this.itemToDelete = data;
    //     this.itemDeletedId = +this.itemDeleted.id!;
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    //   () => {
    //     console.log(
    //       'item ' +
    //         this.itemClassName +
    //         ' with id ' +
    //         this.currentId +
    //         ' to be deleted first was save in itemDeleted'
    //     );
    //   }
    // );
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
              this.currentId +
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
        '../' + this.itemsDashName + '/view-one/' + this.currentId + '/view',
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

  setCommonNavigationSettingsAndGoToIdValue() {
    this.setCommonNavigationSettings();

    this.goToIdValue = this.currentId;
  }

  setCommonNavigationSettings() {
    this.previousId = this.currentId;
    this.dataExchangeService.changeMessageFromCancel(false);
    this.viewStatus = 'view';
  }

  onPrev() {
    this.setCommonNavigationSettingsAndGoToIdValue();
    this.setGoToIdValueTo(this.prevId);

    this.router.navigate([
      '../' + this.itemDashItem + '/view-one/' + this.prevId + '/view',
    ]);

    this.updateItemAndOthers();
  }

  async onNext() {
    this.setCommonNavigationSettingsAndGoToIdValue();
    this.setGoToIdValueTo(this.nextId);

    this.router.navigate([
      '../' + this.itemDashItem + '/view-one/' + this.nextId + '/view',
    ]);

    this.updateItemAndOthers();
  }

  onFirst() {
    this.setCommonNavigationSettingsAndGoToIdValue();
    this.setGoToIdValueTo(this.firstItemOfItemsId);

    this.router.navigate([
      '../' +
        this.itemDashItem +
        '/view-one/' +
        this.firstItemOfItemsId +
        '/view',
    ]);

    this.updateItemAndOthers();
  }

  onLast() {
    this.setCommonNavigationSettingsAndGoToIdValue();
    this.setGoToIdValueTo(this.lastItemOfItemsId);

    this.router.navigate([
      '../' +
        this.itemDashItem +
        '/view-one/' +
        this.lastItemOfItemsId +
        '/view',
    ]);

    this.updateItemAndOthers();
  }

  isPrevId: boolean = false;
  getPrevId() {
    if (this.currentIndexFromItems > 0) {
      this.isPrevId = true;
      this.prevId = +this.items[this.currentIndexFromItems - 1].id!;
    } else {
      this.isPrevId = false;
    }
  }

  isNextId: boolean = true;
  getNextId() {
    if (this.currentIndexFromItems < this.itemsLength - 1) {
      this.isNextId = true;
      this.nextId = +this.items[this.currentIndexFromItems + 1].id!;
    } else {
      this.isNextId = false;
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

    this.setCommonNavigationSettings();

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
