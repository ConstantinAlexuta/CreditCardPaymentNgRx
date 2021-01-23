import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { showDebug } from 'src/app/app.constants';
import { DataExchangeService } from 'src/app/shared/services/data-exchange.service';
import { Status } from 'src/app/shared/classes/status';
import { Ccp } from '../../model/ccp.model';
import { CcpService } from '../../service/ccp.service';

@Component({
  selector: 'app-ccp-edit-one',
  templateUrl: './ccp-edit-one.component.html',
  styleUrls: ['./ccp-edit-one.component.scss'],
})
export class CcpEditOneComponent implements OnInit {
  //
  // ###################################################
  //
  itemNameItem: string = 'ccp';
  itemDashItem: string = 'ccp';

  // item!: Ccp;
  // items!: Ccp[];
  // itemHeaders: string[] = ['Id', 'Credit Card Number', 'Card Holder', 'Expiration Date', 'Amount', 'Security Code (CCV)'];
  // itemFields: string[] = ['id', 'creditCardNumber', 'cardHolder', 'expirationDate', 'amount', 'securityCodeCCV'];
  //
  // ###################################################
  //
  currentId: any;
  // pathId!: string;
  // itemPath!: string;
  // itemsPath: string = SERVER_API_V1 + this.itemDashItem;
  // pageBrandViewOneItem!: string;
  // subscription!: Subscription;
  // currentLongRouter!: string;
  // currentShortRouter!: string; // view-one
  //
  // ###################################################
  //

  @Input() viewStatus: string = 'view'; // can be and "edit"

  itemClassName: string = 'Ccp';
  componentTypeName: string = 'EditOneComponent';

  itemId!: number;

  item!: Ccp; // = new Ccp('0', '0', '0', '0', '0', '0');

  itemFormNgModel!: Ccp;

  itemForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(1)]),
    creditCardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    cardHolder: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    expirationDate: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    amount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    securityCodeCCV: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    // status: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(
    private ccpService: CcpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {
    if (showDebug) {
      console.log(
        'in constructor  ====================================================================  EDIT ONE '
      );
      console.log('in constructor  ===  itemClassName = ' + this.itemClassName);
      console.log(
        'in constructor  ===  componentTypeName = ' + this.componentTypeName
      );
    }

    this.getItemId();

    this.getItem(this.itemId);
    //
  } ////////////////////////////// END constructor

  async getItemId(): Promise<number> {
    this.currentId = +this.activatedRoute.snapshot.parent?.params.id;
    this.itemId = +this.activatedRoute.snapshot.parent?.params.id;
    return this.itemId;
  }

  //showInConsoleIfDebugIsON
  show(message: string) {
    if (showDebug) console.log(message);
  }

  viewComeBackFromCancelEditViewSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.messageFromCancel = false;
    this.viewComeBackFromCancelEditViewSubscription = this.dataExchangeService.currentMessageFromCancel.subscribe(
      (value) => (this.messageFromCancel = value)
    );

    if (showDebug)
      console.log(
        '---- in ngOnInit   ===================================================================='
      );

    this.getItemId();

    this.show(
      '---- in ngOnInit >> itemId = ' + this.itemId + '      BEFORE TIMEOUT   '
    );

    if (showDebug) {
      if (this.itemId != undefined) {
        console.log(
          '---- in ngOnInit >> itemId = ' + this.itemId + ' read it  OK '
        );
      } else {
        console.log(
          '---- in ngOnInit >> itemId = ' +
            this.itemId +
            '   <<<<< this.itemId WAS NOT POSSIBLE TO BE READ IT NOW  <<<<<<<<<<<  ISSUE'
        );
      }
    }

    this.getItem(this.itemId);

    setTimeout(() => {
      this.getItem(this.itemId);
      if (showDebug)
        console.log(
          '---- in ngOnInit >> getItem >> item = ' +
            JSON.stringify(this.item) +
            '    >> 100 ms'
        );
    }, 100);

    setTimeout(() => {
      if (showDebug)
        console.log(
          '---- in ngOnInit >> getItem >> item = ' +
            JSON.stringify(this.item) +
            '    >> 300 ms'
        );
    }, 300);

    setTimeout(() => {
      this.getItem(this.itemId);
      if (showDebug)
        console.log(
          '---- in ngOnInit >> getItem >> item = ' +
            JSON.stringify(this.item) +
            '   // RESERVE UPLOADED AGAIN AFTER 400 ms'
        );
    }, 400);

    console.log(
      '---- in ngOnInit >> getItem >> item = ' +
        JSON.stringify(this.item) +
        '   //  NOT LOADED YET'
    );

    setTimeout(() => {
      this.loadItemIntoItemForm();
      if (showDebug)
        console.log('---- in ngOnInit >> in loadItemIntoItemForm()');
    }, 600);

    this.setDelayToShowIf();
  } ///// END ngOnInit ///////////////////////////////////////////////////// END ngOnInit

  getItem(id: number) {
    if (showDebug) console.log('in getItem ');
    this.ccpService.getCcp(id).subscribe(
      (data) => {
        this.item = data;

        if (showDebug)
          console.log(
            'item service > get method > item with id ' +
              id +
              ' was retrieved from server database'
          );

        if (showDebug)
          console.log(
            'in ngOnInit >> getItem >> item = ' + JSON.stringify(this.item)
          );
      },
      (err) => {
        console.error(err);
        if (showDebug)
          console.log(
            'item service > get method > item with id ' +
              id +
              ' was failed to be loaded'
          );
      },
      () => {
        if (showDebug)
          console.log(
            'item service > get method > item with id ' +
              id +
              ' was loaded successfully from database server'
          );
      }
    );
  } ////// END getItem ////////////////////////////////////// END getItem

  /////
  submitForm() {
    if (showDebug)
      console.log(
        '////////////////////////////// in submitForm >>   ===================================================================='
      );

    if (!this.itemForm.valid) {
      this.showMessageIfItemFormIsInvalid = true;
      setTimeout(() => {
        this.showMessageIfItemFormIsInvalid = false;
      }, 10000);
    } // END if (!this.itemForm.valid)
    else {
      this.showMessageIfItemFormIsInvalid = false;
      this.isFormItemEqualWithInitialItem();

      if (!this.editedItemIsDifferentThanInitialItem) {
        this.showMessageItemHasNotthingChanged = true;

        this.itemForm.markAsUntouched;
        this.itemForm.markAsPristine;
      }

      if (this.editedItemIsDifferentThanInitialItem) {
        // console.log('====TEST================= touched');
        this.ccpService.updateCcp(this.itemId, this.itemForm.value);

        this.checkIfWasSavedWithBankSpacesAtMarginsAndShowMessageForTheseMiliSeconds(
          10000
        );

        if (showDebug)
          console.log(
            '////////////////////////////// in submitForm >> call service >> replace method >> item send it to PUT on server'
          );

        this.isModificationSavedOnServerAfter2000ms();

        setTimeout(() => {
          if (this.isModificationSavedOnServerWithSuccess) {
            this.showMessageIfModificationIsSavedOnServerWithSuccess = true;
            this.showMessageIfModificationIsSavedOnServerWithFailure = false;
            this.showMessageItemHasNotthingChanged = false;
            this.toggleCancelOrExitButtonName();
            //  END this.loadItemModifiedAndRetrievedFromServerIntoItemForm();
          }
        }, 2500);

        setTimeout(() => {
          if (!this.isModificationSavedOnServerWithSuccess) {
            this.showMessageIfModificationIsSavedOnServerWithFailure = true;
            this.showMessageItemHasNotthingChanged = false;
            this.showMessageIfModificationIsSavedOnServerWithSuccess = false;
            this.cancelOrExitButtonName = 'Cancel';
          }
        }, 4000);
      }

      setTimeout(() => {
        this.showMessageItemHasNotthingChanged = false;
        this.showMessageIfModificationIsSavedOnServerWithSuccess = false;
        this.showMessageIfModificationIsSavedOnServerWithFailure = false;
      }, 10000);
    } //  END if (this.itemForm.valid)
    //
  } ////////////////////////////// END  submitForm

  showMessageIfItemFormIsInvalid: boolean = false;
  messageIfItemFormIsInvalid: string =
    'Please fill all the required fields with valid input.';

  editedItemIsDifferentThanInitialItem: boolean = false;
  showMessageItemHasNotthingChanged = false;
  messageItemHasNotthingChanged: string =
    'The item was not saved because is the same like the initial one.';
  itemEdited!: Ccp;

  isFormItemEqualWithInitialItem(): boolean {
    this.itemEdited = Object.assign({}, this.itemForm.value); // copy object

    if (showDebug) {
      console.log(
        'isFormItemEqualWithInitialItem() >>  let itemEdited:   Ccp = this.itemForm.value = ' +
          JSON.stringify(this.itemEdited)
      );
      console.log(
        'isFormItemEqualWithInitialItem() >>  let item INITIAL: Ccp = this.itemForm.value = ' +
          JSON.stringify(this.item)
      );
    }

    if (!this.isItemsComparedEquals(this.item, this.itemEdited)) {
      this.editedItemIsDifferentThanInitialItem = true;
      if (showDebug)
        console.log(
          'isFormItemEqualWithInitialItem() >>  this.item == this.itemEdited >>> ARE DIFFERENT'
        );
    } else {
      this.editedItemIsDifferentThanInitialItem = false;
      if (showDebug)
        console.log(
          'isFormItemEqualWithInitialItem() >>  this.item == this.itemEdited >>> ARE EQUALS'
        );
    }

    return !this.editedItemIsDifferentThanInitialItem;
  } //////////////////////// END isFormItemEqualWithInitialItem

  isItemsComparedEquals(item1: Ccp, item2: Ccp) {
    if (showDebug) {
      console.log('isItemsComparedEquals() >> ');
      console.log(
        'isItemsComparedEquals() >> item1 = ' + JSON.stringify(item1)
      );
      console.log(
        'isItemsComparedEquals() >> item2 = ' + JSON.stringify(item2)
      );
    }

    if (
      item1.id != item2.id ||
      item1.creditCardNumber != item2.creditCardNumber ||
      item1.cardHolder != item2.cardHolder ||
      item1.expirationDate != item2.expirationDate ||
      item1.amount != item2.amount ||
      item1.securityCodeCCV != item2.securityCodeCCV
    ) {
      return false;
    } else return true;
  } /////////////////////// END isItemsComparedEquals

  showExitOption: boolean = false;
  cancelOrExitButtonName: string = 'Cancel';
  toggleCancelOrExitButtonName() {
    this.showExitOption = !this.showExitOption;
    if (this.showExitOption) {
      this.cancelOrExitButtonName = 'Exit ';
    } else {
      this.cancelOrExitButtonName = 'Cancel';
    }
  }

  ///
  updatedItemFromServer!: Ccp;
  isModificationSavedOnServerWithSuccess = false;
  isModificationSavedOnServerWithFailure = false;

  showMessageIfModificationIsSavedOnServerWithSuccess: boolean = false;
  showMessageIfModificationIsSavedOnServerWithFailure: boolean = false;

  messageIfModificationIsSavedOnServerWithSuccess: string =
    'The modifications was saved with success on server.';
  messageIfModificationIsSavedOnServerWithFailure: string =
    'Failure on salvation. Please try to save again.';

  isModificationSavedOnServerAfter2000ms(): boolean {
    if (showDebug)
      console.log('isModificationSavedOnServerAfter2000ms() >>>>>>');

    setTimeout(() => {
      this.ccpService.getCcp(this.itemId).subscribe(
        (data) => {
          this.updatedItemFromServer = data;
        },
        (err) => {
          console.error(err);
        },
        () => {
          if (showDebug)
            console.log(
              'isModificationSavedOnServerAfter2000ms() >>>>>> updatedItemFromServer loaded back from server >> ' +
                JSON.stringify(this.updatedItemFromServer)
            );
        }
      );
    }, 1500); // wait first to be saved on server

    setTimeout(() => {
      if (
        this.isItemsComparedEquals(this.itemEdited, this.updatedItemFromServer)
      ) {
        if (showDebug)
          console.log(
            'isModificationSavedOnServerAfter2000ms() >>>>>> itemEdited is equal with updatedItemFromServer'
          );
        this.isModificationSavedOnServerWithSuccess = true;
        this.item = Object.assign({}, this.updatedItemFromServer);
        this.itemEdited = Object.assign({}, this.updatedItemFromServer);
      } else {
        this.isModificationSavedOnServerWithSuccess = false;
      }
      return this.isModificationSavedOnServerWithSuccess;
    }, 2500); // wait verification until retrieve data from server
    ///
    return this.isModificationSavedOnServerWithSuccess;
  } //////////////////////////////// END isModificationSavedOnServerAfter2000ms

  showMessageIfWasSavedWithBankSpacesAtMargins: boolean = false;
  messageIfWasSavedWithBankSpacesAtMargins: string =
    'The item was saved with empty spaces at margins of at least one field.';
  checkIfWasSavedWithBankSpacesAtMarginsAndShowMessageForTheseMiliSeconds(
    ms: number
  ) {
    let itemFromFormTrimed: Ccp = this.itemForm.value;
    let itemFromForm: Ccp = this.itemForm.value;

    itemFromFormTrimed.creditCardNumber = itemFromForm.creditCardNumber!.trim();
    itemFromFormTrimed.cardHolder = itemFromForm.cardHolder!.trim();
    itemFromFormTrimed.expirationDate = itemFromForm.expirationDate!.trim();
    itemFromFormTrimed.amount = itemFromForm.amount!.trim();
    itemFromFormTrimed.securityCodeCCV = itemFromForm.securityCodeCCV!.trim();
    // itemFromFormTrimed.status = itemFromForm.status!.trim();

    if (!this.isItemsComparedEquals(itemFromFormTrimed, itemFromForm)) {
      this.showMessageIfWasSavedWithBankSpacesAtMargins = true;

      setTimeout(() => {
        this.showMessageIfWasSavedWithBankSpacesAtMargins = false;
      }, ms);
    }
  }

  loadItemIntoItemForm(): boolean {
    if (this.item == undefined) {
      if (showDebug)
        console.log(
          'in loadItemIntoItemForm() >> form  >>> NOT <<< initialized with item data'
        );
      return false;
    } else {
      this.itemForm.patchValue({
        id: this.item.id,
        creditCardNumber: this.item.creditCardNumber,
        cardHolder: this.item.cardHolder,
        expirationDate: this.item.expirationDate,
        amount: this.item.amount,
        securityCodeCCV: this.item.securityCodeCCV,
      });
      if (showDebug)
        console.log(
          'in loadItemIntoItemForm() >> form initialized with item data'
        );
    }
    return true;
  }

  clearItemForm() {
    this.itemForm.patchValue({
      creditCardNumber: '',
      cardHolder: '',
      expirationDate: '',
      amount: '',
      securityCodeCCV: '',
      // status: 'NEW',
    });
    if (showDebug)
      console.log(
        'in clearItemForm() >> form cleared with empty data exept id field'
      );
  }

  restoreInitialItemForm() {
    this.clearItemForm();
    setTimeout(() => {
      this.loadItemIntoItemForm();
    }, 300);
    if (showDebug)
      console.log(
        'in restoreInitialItemForm() >> form reinitialized with with initial item data'
      );
  }

  ngOnDestroy() {
    this.viewComeBackFromCancelEditViewSubscription.unsubscribe();

    if (showDebug) {
      console.log('in ngOnDestroy');
      console.log('itemClassName = ' + this.itemClassName + '  ===>  END');
      console.log(
        'componentTypeName = ' + this.componentTypeName + '  ===>  END'
      );
      console.log(
        '===================================================================='
      );
    }
  }

  ifModifiedEnableSaveButton() {}

  showIf: boolean = false;
  setDelayToShowIf() {
    setTimeout(() => {
      this.showIf = true;
    }, 1000);
  }

  // @Output() isOnCancelEdit: EventEmitter<boolean> = new EventEmitter();

  private messageFromCancel: boolean = false;

  onCancelEdit() {
    this.messageFromCancel = true;
    this.dataExchangeService.changeMessageFromCancel(this.messageFromCancel);

    // this.isOnCancelEdit.emit(true);

    this.router.navigate([
      '../' + this.itemDashItem + '/view-one/' + this.currentId + '/view',
    ]);

    // this.router.navigate(['view-one/' + this.itemId + '/view']);
  }

  statuses: Status[] = [
    { value: 'NEW' },
    { value: 'DRAFT' },
    { value: 'VERIFIED' },
    { value: 'APPROVED' },
    { value: 'ACTIVE' },
    { value: 'INCOMPLETE' },
    { value: 'DISABLED' },
    { value: 'ARCHIVED' },
  ];
}
