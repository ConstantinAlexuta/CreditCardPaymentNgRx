import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Ccp } from '../../model/ccp.model';

import { v4 as uuidv4 } from 'uuid';
import { AppState } from 'src/store/reducers';
import { Store } from '@ngrx/store';
import { createCcp } from '../../state/ccp.actions';
import { Observable } from 'rxjs';
import { getCcps } from '../../state/ccp.selectors';

@Component({
  selector: 'app-ccp-add-one',
  templateUrl: './ccp-add-one.component.html',
  styleUrls: ['./ccp-add-one.component.scss'],
})
export class CcpAddOneComponent implements OnInit {
  itemCapitalizeFullName: string = 'Credit Card Payment';
  itemCamelName: string = 'ccp';
  itemLowerCaseDashName: string = 'ccp';
  itemNameDisplayed: string = 'Credit Card Payment';

  ccpsLengthFromDB: number = -1;

  ccpSavedFromForm!: Ccp;
  ccpSavedFromFormId: string = 'none';

  ccpSavedFromDB!: Ccp;
  ccpSavedFromDBId: string = 'none';
  ccpSavedFromDBIndex: number = -1;

  public ccpFormGroup!: FormGroup;

  fixedlength_creditCardNumber: number = 16;
  fixedlength_securityCodeCCV: number = 3;

  minlength_cardHolder: number = 2;
  minlength_expirationDate: number = 10;
  minlength_amount: number = 1;

  maxlength_cardHolder: number = 100;
  maxlength_expirationDate: number = 10;
  maxlength_amount: number = 20;

  constructor(private store: Store<AppState>, private router: Router) {
    this.ccpFormGroup = new FormGroup({
      creditCardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(this.fixedlength_creditCardNumber),
        Validators.maxLength(this.fixedlength_creditCardNumber),
      ]),
      cardHolder: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minlength_cardHolder),
        Validators.maxLength(this.maxlength_cardHolder),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minlength_expirationDate),
        Validators.maxLength(this.maxlength_expirationDate),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minlength_amount),
        Validators.maxLength(this.maxlength_amount),
        this.noSpacesValidator,
        this.noCommaValidator,
        this.onlyNumberValidator,
        this.cannotStartWithDotValidator,
        this.onlyTwoDecimalsValidator,
      ]),
      securityCodeCCV: new FormControl('', [
        Validators.required,
        Validators.minLength(this.fixedlength_securityCodeCCV),
        Validators.maxLength(this.fixedlength_securityCodeCCV),
        this.noSpacesValidator,
        this.onlyDigitsValidator,
      ]),
    });
  }

  noSpacesValidator(control: FormControl) {
    return control.value.replace(' ', '').length == control.value.length
      ? null
      : { spacesArePresent: true };
  }

  onlyNumberValidator(control: FormControl) {
    let isNumber =
      control.value != null &&
      control.value !== '' &&
      !isNaN(Number(control.value.toString()));

    return isNumber ? null : { isNotNumber: true };
  }

  onlyDigitsValidator(control: FormControl) {
    let isNumber =
      control.value != null &&
      control.value !== '' &&
      !isNaN(Number(control.value.toString()));

    let noDotOrComma =
      control.value.replace('.', '').replace(',', '').length ==
      control.value.length;

    return isNumber && noDotOrComma ? null : { areNotOnlyDigits: true };
  }

  noCommaValidator(control: FormControl) {
    let noComma = control.value.replace(',', '').length == control.value.length;

    return noComma ? null : { commaIsPresent: true };
  }

  cannotStartWithDotValidator(control: FormControl) {
    let afterTrimStartWithDot = control.value.charAt(0) == '.';

    return !afterTrimStartWithDot
      ? null
      : { dotIsFirstCharacterAfterTrim: true };
  }

  onlyTwoDecimalsValidator(control: FormControl) {
    let numberOfDecimals = 0;

    let haveDot = control.value.replace('.', '').length != control.value.length;

    let indexOfDot = (control.value + '').indexOf('.', 0);

    if (indexOfDot > 0) {
      numberOfDecimals = control.value.length - indexOfDot - 1;
    }

    return !(haveDot && indexOfDot >= 1 && numberOfDecimals > 2)
      ? null
      : { moreThanTwoDecimals: true };
  }

  ngOnInit(): void {}

  onClearForm() {
    this.readonlyAfterSave = '';
    this.isSavedSuccessfully = false;
    this.validMessage = '';
    this.showFillForm = true;

    this.ccpSavedFromFormId = 'none';
    this.ccpSavedFromDBId = 'none';
    this.ccpSavedFromDBIndex = -1;

    this.enableClearFormAndFillFormCommonActions();
  }

  public ccpDefault: Ccp = {
    id: uuidv4(),
    creditCardNumber: '1234123412341234',
    cardHolder: 'Demo name',
    expirationDate: '09/22/2025',
    amount: '220.05',
    securityCodeCCV: '928',
  };

  showFillForm: boolean = true;

  onFillForm() {
    this.ccpFormGroup.patchValue({
      id: this.ccpDefault.id,
      creditCardNumber: this.ccpDefault.creditCardNumber,
      cardHolder: this.ccpDefault.cardHolder,
      expirationDate: this.ccpDefault.expirationDate,
      amount: this.ccpDefault.amount,
      securityCodeCCV: this.ccpDefault.securityCodeCCV,
    });

    this.validMessage = '';
    this.enableClearFormAndFillFormCommonActions();
  }

  enableClearFormAndFillFormCommonActions() {
    this.isSavedSuccessfully = false;
    this.showMessageAlreadySubmitted = false;
    this.showNewItemCreatedIndexMessage = false;
    this.firstAttemptToSaveWithValidFormWasDone = false;
    this.clikOnSaveWithValidFormCount = 0;
  }

  validMessage: string = '';

  clikOnSaveWithValidFormCount: number = 0;

  onSave() {
    if (this.ccpFormGroup.valid) {
      this.clikOnSaveWithValidFormCount++;
    }

    if (this.clikOnSaveWithValidFormCount > 1) {
      // second  time clicked on Save with valid form
      this.enableShowMessageAlreadySubmitted();
    }
  }

  onSubmit(submittedForm: any) {
    this.showNewItemCreatedIndexMessage = false;

    console.log('form submitted to be save: ' + submittedForm.value);

    if (submittedForm.invalid) {
      this.clikOnSaveWithValidFormCount = 0;
      this.validMessage =
        'Please fill out the required fields with valid inputs before submitting the form!';
      this.isSavedSuccessfully = false;
      console.log('form submitted to be saved is INVALID');

      this.firstAttemptToSaveWithValidFormWasDone = false;

      return;
    } else {
      // if submittedForm is valid

      if (this.clikOnSaveWithValidFormCount == 1) {
        // first time clicked on Save with valid form

        this.readonlyAfterSave = 'readonly';

        this.showFillForm = false;

        this.firstAttemptToSaveWithValidFormWasDone = true;

        const ccp: Ccp = {
          id: uuidv4(),
          creditCardNumber: submittedForm.value.creditCardNumber,
          cardHolder: submittedForm.value.cardHolder,
          expirationDate: submittedForm.value.expirationDate,
          amount: submittedForm.value.amount,
          securityCodeCCV: submittedForm.value.securityCodeCCV,
        };

        this.ccpSavedFromForm = { ...ccp };
        this.store.dispatch(createCcp({ ccp }));
        this.validMessage =
          'Your new ' +
          this.itemCapitalizeFullName +
          ' item has been submitted.';

        this.verifyIfIsSavedSuccessfully();

        setTimeout(() => {
          if (this.isSavedSuccessfully) {
            this.showNewItemCreatedIndexdIfSavedSuccessfully();
          } else {
            this.enableToShowFailureMessageOnSaving();
          }
        }, 1200);
      }
    }
  }

  isSavedSuccessfully: boolean = false;

  verifyIfIsSavedSuccessfully() {
    this.isSavedSuccessfully = false;

    setTimeout(() => {
      this.getUpdatedIndexFromDatabase();
    }, 500);
  }

  getUpdatedIndexFromDatabase() {
    let ccps: Observable<Ccp[]> = this.store.select(getCcps);

    ccps.forEach((ccpsArray) => {
      this.ccpsLengthFromDB = ccpsArray.length;

      ccpsArray.forEach((ccp) => {
        if (this.ccpsAreEquals(ccp, this.ccpSavedFromForm)) {
          this.ccpSavedFromDBId = ccp.id + '';

          this.ccpSavedFromDBIndex = ccpsArray.indexOf(ccp);

          this.ccpSavedFromDB = { ...ccp };

          this.isSavedSuccessfully = true;
        }
      });
    });
  }

  ccpsAreEquals(ccp1: Ccp, ccp2: Ccp): boolean {
    if (
      ccp1.id !== ccp2.id ||
      ccp1.creditCardNumber !== ccp2.creditCardNumber ||
      ccp1.cardHolder !== ccp2.cardHolder ||
      ccp1.expirationDate !== ccp2.expirationDate ||
      ccp1.amount !== ccp2.amount ||
      ccp1.securityCodeCCV !== ccp2.securityCodeCCV
    ) {
      return false;
    } else {
      return true;
    }
  }

  showMessageAlreadySubmitted: boolean = false;

  messageAlreadySubmitted: string = 'This item was already submited.';

  enableShowMessageAlreadySubmitted() {
    this.showMessageAlreadySubmitted = true;
    this.validMessage = '';

    setTimeout(() => {
      this.showMessageAlreadySubmitted = false;
      if (this.isSavedSuccessfully) {
        this.showMessageAlreadySubmitted = false;
        this.showNewItemCreatedIndexMessage = false;
        this.firstAttemptToSaveWithValidFormWasDone = false;
        this.validMessage = 'Your item was submited and successfully saved.';
      }
    }, 7000);
  }

  readonlyAfterSave = '';

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }


  goToLastSavedItemView() {
    this.getUpdatedIndexFromDatabase();

    this.router.navigate([
      '../ccps/view-one',
      +this.ccpSavedFromDBIndex,
      'view',
    ]);
  }

  goToLastSavedItemEditView() {
    this.getUpdatedIndexFromDatabase();

    this.router.navigate([
      '../ccps/view-one',
      +this.ccpSavedFromDBIndex,
      'edit',
    ]);
  }

  showNewItemCreatedIndexMessage: boolean = false;

  newItemCreatedIndexMessage: string = '';

  showNewItemCreatedIndexdIfSavedSuccessfully() {
    this.newItemCreatedIndexMessage =
      'The new item was saved successfully' +
      (this.ccpSavedFromDBIndex != -1 && this.ccpSavedFromDBIndex != 0
        ? ' and has the index ' + this.ccpSavedFromDBIndex
        : '') +
      '.';

    if (this.isSavedSuccessfully) {
      this.showNewItemCreatedIndexMessage = true;
    } else {
      this.showNewItemCreatedIndexMessage = false;
      this.showNewItemCreatedIndexMessage = false;
    }

    setTimeout(() => {
      this.showNewItemCreatedIndexMessage = false;
      this.validMessage = 'Your item was submited and successfully saved.';
    }, 7000);
  }

  firstAttemptToSaveWithValidFormWasDone: boolean = false;

  messageFailureForFirstAttemptToSave: string =
    'Failure on saving! The attempt to save the item on server was without success. Unknown cause! Please reload the page from browser and retry.';

  showFailureMessageOnSaving: boolean = false;
  enableToShowFailureMessageOnSaving() {
    if (
      this.firstAttemptToSaveWithValidFormWasDone &&
      !this.isSavedSuccessfully
    ) {
      this.showFailureMessageOnSaving = true;
    }

    setTimeout(() => {
      this.showFailureMessageOnSaving = false;
    }, 7000);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
