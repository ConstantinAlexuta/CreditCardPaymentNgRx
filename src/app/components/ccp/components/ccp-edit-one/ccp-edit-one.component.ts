import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataExchangeService } from 'src/app/shared/services/data-exchange.service';
import { Ccp } from '../../model/ccp.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { getCcps } from '../../state/ccp.selectors';
import { Update } from '@ngrx/entity';
import { ccpActionTypes } from '../../state/ccp.actions';

@Component({
  selector: 'app-ccp-edit-one',
  templateUrl: './ccp-edit-one.component.html',
  styleUrls: ['./ccp-edit-one.component.scss'],
})
export class CcpEditOneComponent implements OnInit {
  itemsLowerCaseDashName: string = 'ccps';
  index!: number;
  item!: Ccp;
  items!: Ccp[];

  @Input() viewStatus: string = 'view'; // can be 'view' or "edit" in parent

  itemForm = new FormGroup({
    index: new FormControl(''),
    id: new FormControl(''),
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
    securityCodeCCV: new FormControl('', []),
  });

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {}

  viewComeBackFromCancelEditViewSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.index = +this.activatedRoute.snapshot.parent?.params.id;

    this.getItem();

    this.loadItemIntoItemForm();

    this.messageFromCancel = false;

    this.viewComeBackFromCancelEditViewSubscription = this.dataExchangeService.currentMessageFromCancel.subscribe(
      (value) => (this.messageFromCancel = value)
    );
  }

  async getItem() {
    let currentIndex = await this.activatedRoute.snapshot.parent?.params.id;

    this.store.select(getCcps).subscribe(
      (data) => {
        this.items = data;
        this.item = this.items[currentIndex];
      },
      (err) => console.error(err),
      () => console.log('items array loaded')
    );
  }

  submitForm() {
    if (!this.itemForm.valid) {
      this.showMessageIfItemFormIsInvalid = true;
      setTimeout(() => {
        this.showMessageIfItemFormIsInvalid = false;
      }, 10000);
    } else {
      // form is valid
      this.showMessageIfItemFormIsInvalid = false;

      this.showMessageIfWasSavedWithBankSpacesAtMargins = false;

      this.verifyIfItemFromFormIsEqualWithInitialItem();

      if (!this.editedItemIsDifferentThanInitialItem) {
        this.showMessageItemHasNotthingChanged = true;

        this.itemForm.markAsUntouched;
        this.itemForm.markAsPristine;
      }

      if (this.editedItemIsDifferentThanInitialItem) {
        this.updateItem();

        this.verifyIfModificationIsSavedOnServer();

        this.checkIfWasSavedWithBankSpacesAtMargins(10000);
      }

      setTimeout(() => {
        this.showMessageItemHasNotthingChanged = false;
        this.showMessageIfModificationIsSavedOnServerWithSuccess = false;
      }, 10000);

      setTimeout(() => {
        this.showMessageIfModificationIsSavedOnServerWithFailure = false;
      }, 15000);
    }
  }

  itemModifiedSentToServer!: Ccp;

  updateItem() {
    const update: Update<Ccp> = {
      id: this.item!.id!,
      changes: {
        ...this.item,
        ...this.itemForm.value,
      },
    };

    this.itemModifiedSentToServer = { ...this.itemForm.value };

    this.store.dispatch(ccpActionTypes.updateCcp({ update }));
  }

  showMessageIfItemFormIsInvalid: boolean = false;

  messageIfItemFormIsInvalid: string =
    'Please fill all the required fields with valid input.';

  editedItemIsDifferentThanInitialItem: boolean = false;

  showMessageItemHasNotthingChanged = false;

  messageItemHasNotthingChanged: string =
    'The item was not saved because is the same like the initial one.';

  itemEdited!: Ccp;

  verifyIfItemFromFormIsEqualWithInitialItem() {
    this.itemEdited = { ...this.itemForm.value };

    if (!this.areItemsComparedEquals(this.item, this.itemEdited)) {
      this.editedItemIsDifferentThanInitialItem = true;
    } else {
      this.editedItemIsDifferentThanInitialItem = false;
    }
  }

  areItemsComparedEquals(item1: Ccp, item2: Ccp) {
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
  }

  updatedItemFromServer!: Ccp;

  isModificationSavedOnServerWithSuccess = false;

  showMessageIfModificationIsSavedOnServerWithSuccess: boolean = false;
  showMessageIfModificationIsSavedOnServerWithFailure: boolean = false;

  messageIfModificationIsSavedOnServerWithSuccess: string =
    'The modifications was saved with success on server.';

  messageIfModificationIsSavedOnServerWithFailure: string =
    'Failure on salvation. Please try to save again.';

  itemsReloaded!: Ccp[];

  timeToVerifyIfModificationIsSavedOnServer = 5000;
  timeStepToVerifyIfModificationIsSavedOnServer = 100;

  verifyIfModificationIsSavedOnServer() {
    let timeVerifiedIfModificationIsSavedOnServer = 0;

    const intervalToVerifyIfModificationIsSavedOnServer = setInterval(() => {
      if (!this.itemsReloaded) {
        this.store.select(getCcps).subscribe(
          (data) => {
            this.itemsReloaded = data;

            if (this.itemsReloaded) {
              this.isModificationSavedOnServerWithSuccess = false;

              for (let index = 0; index < this.itemsReloaded.length; index++) {
                if (this.itemsReloaded[index].id == this.item.id) {
                  if (
                    this.areItemsComparedEquals(
                      this.itemModifiedSentToServer,
                      this.itemsReloaded[index]
                    )
                  ) {
                    this.isModificationSavedOnServerWithSuccess = true;

                    this.itemForm.markAsPristine();

                    this.item = { ...this.itemModifiedSentToServer };
                    this.itemEdited = { ...this.itemModifiedSentToServer };

                    this.showMessageIfModificationIsSavedOnServerWithSuccess = true;
                    this.showMessageIfModificationIsSavedOnServerWithFailure = false;
                    this.showMessageItemHasNotthingChanged = false;
                  }
                  break;
                }
              }
            }
          },
          (err) => console.error(err),
          () => console.log('items array loaded')
        );

        clearInterval(intervalToVerifyIfModificationIsSavedOnServer);
      }

      timeVerifiedIfModificationIsSavedOnServer += this
        .timeStepToVerifyIfModificationIsSavedOnServer;
    }, this.timeStepToVerifyIfModificationIsSavedOnServer);

    if (
      timeVerifiedIfModificationIsSavedOnServer >=
      this.timeToVerifyIfModificationIsSavedOnServer
    ) {
      clearInterval(intervalToVerifyIfModificationIsSavedOnServer);
      this.showMessageIfModificationIsSavedOnServerWithFailure = true;
    }
  }

  showMessageIfWasSavedWithBankSpacesAtMargins: boolean = false;

  messageIfWasSavedWithBankSpacesAtMargins: string =
    'The item was saved with empty spaces at margins of at least one field.';

  checkIfWasSavedWithBankSpacesAtMargins(timeToShowMessageInMiliSec: number) {
    let itemForm: Ccp = { ...this.itemForm.value };
    let itemFormTrimed: Ccp = { ...itemForm };

    itemFormTrimed.creditCardNumber = itemForm.creditCardNumber!.trim();
    itemFormTrimed.cardHolder = itemForm.cardHolder!.trim();
    itemFormTrimed.expirationDate = itemForm.expirationDate!.trim();
    itemFormTrimed.amount = itemForm.amount!.trim();
    itemFormTrimed.securityCodeCCV = itemForm.securityCodeCCV!.trim();

    if (!this.areItemsComparedEquals(itemFormTrimed, itemForm)) {
      this.showMessageIfWasSavedWithBankSpacesAtMargins = true;

      setTimeout(() => {
        this.showMessageIfWasSavedWithBankSpacesAtMargins = false;
      }, timeToShowMessageInMiliSec);
    }
  }

  loadItemIntoItemForm() {
    const intervalToLoadItemIntoItemForm = setInterval(() => {
      if (this.item) {
        this.itemForm.patchValue({
          index: +this.index + 1,
          id: this.item.id,
          creditCardNumber: this.item.creditCardNumber,
          cardHolder: this.item.cardHolder,
          expirationDate: this.item.expirationDate,
          amount: this.item.amount,
          securityCodeCCV: this.item.securityCodeCCV,
        });

        clearInterval(intervalToLoadItemIntoItemForm);
      }
    }, 20);
  }

  clearItemForm() {
    this.itemForm.patchValue({
      creditCardNumber: '',
      cardHolder: '',
      expirationDate: '',
      amount: '',
      securityCodeCCV: '',
    });
  }

  private messageFromCancel: boolean = false;

  onCancelOrExitEdit() {
    this.messageFromCancel = true;
    this.dataExchangeService.changeMessageFromCancel(this.messageFromCancel);

    this.router.navigate([
      '../' + this.itemsLowerCaseDashName + '/view-one/' + this.index + '/view',
    ]);
  }

  ngOnDestroy() {
    this.viewComeBackFromCancelEditViewSubscription.unsubscribe();
  }
}
