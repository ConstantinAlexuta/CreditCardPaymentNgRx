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

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { noSpacesValidator } from 'src/app/shared/form-control-validators/string-validators/no-spaces-validator';
import { noSpacesAtMarginsValidator } from 'src/app/shared/form-control-validators/string-validators/no-spaces-at-margins-validator';
import { cannotStartWithDotValidator } from 'src/app/shared/form-control-validators/string-validators/cannot-start-with-dot-validator';
import { noCommaValidator } from 'src/app/shared/form-control-validators/string-validators/no-comma-validator';
import { onlyDigitsValidator } from 'src/app/shared/form-control-validators/string-validators/only-digits-validator';
import { onlyNumberValidator } from 'src/app/shared/form-control-validators/string-validators/only-number-validator';
import { onlyTwoDecimalsValidator } from 'src/app/shared/form-control-validators/string-validators/only-two-decimals-validator';
import { startWithCharacterValidator } from 'src/app/shared/form-control-validators/string-validators/start-with-character-validator';
import { onlyPositiveNonNullNumberValidator } from 'src/app/shared/form-control-validators/string-validators/only-positive-non-null-number-validator';

import { inDateFormatYYYYdashMMdashDDYearMustContainOnlyDigits } from 'src/app/shared/form-control-validators/date-validators/date-format-YYYY-dash-MM-dash-DD/in-date-format-YYYYdashMMdashDD-year-must-contain-only-digits';
import { inDateFormatYYYYdashMMdashDDYearMustBeGreaterOrEqualWithCurrentYearAndLessThanPlus100Years } from 'src/app/shared/form-control-validators/date-validators/date-format-YYYY-dash-MM-dash-DD/in-date-format-YYYYdashMMdashDD-year-must-be-greater-or-equal-with-current-year-and-less-than-plus-100-years';
import { inDateFormatYYYYdashMMdashDDAfterYearMustBeADash } from 'src/app/shared/form-control-validators/date-validators/date-format-YYYY-dash-MM-dash-DD/in-date-format-YYYYdashMMdashDD-after-year-must-be-a-dash';

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
  fixedlength_expirationDate: number = 10;
  fixedlength_securityCodeCCV: number = 3;

  minlength_cardHolder: number = 2;
  minlength_amount: number = 1;

  maxlength_cardHolder: number = 100;
  maxlength_amount: number = 20;

  constructor(private store: Store<AppState>, private router: Router) {
    this.ccpFormGroup = new FormGroup({
      creditCardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(this.fixedlength_creditCardNumber),
        Validators.maxLength(this.fixedlength_creditCardNumber),
        noSpacesValidator,
        onlyDigitsValidator,
      ]),
      cardHolder: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minlength_cardHolder),
        Validators.maxLength(this.maxlength_cardHolder),
        noSpacesAtMarginsValidator,
        startWithCharacterValidator,
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.minLength(this.fixedlength_expirationDate),
        Validators.maxLength(this.fixedlength_expirationDate),

        inDateFormatYYYYdashMMdashDDYearMustContainOnlyDigits,
        inDateFormatYYYYdashMMdashDDYearMustBeGreaterOrEqualWithCurrentYearAndLessThanPlus100Years,
        inDateFormatYYYYdashMMdashDDAfterYearMustBeADash,

        // multipleCustomVerificationsForDateFormatYYYdMMdDDValidator,

        // isValidDateYearFormatYYYdMMdDDValidator,
        // isValidDateFormatYYYdMMdDDValidator,

        // isValidDateAndNotInThePastYYYdMMdDDValidator,
        // isValidPresentOrFuture100YearInDateYYYdMMdDDValidator,
        // isValidPresentOrFutureMonthInDateYYYdMMdDDValidator,
        // isValidPresentOrFutureDayInDateYYYdMMdDDValidator,
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minlength_amount),
        Validators.maxLength(this.maxlength_amount),
        noSpacesValidator,
        noCommaValidator,
        onlyNumberValidator,
        onlyPositiveNonNullNumberValidator,
        cannotStartWithDotValidator,
        onlyTwoDecimalsValidator,
      ]),
      securityCodeCCV: new FormControl('', [
        // Validators.required,  // is optional in REQUIREMENTS, for demo // in production should be enabled
        Validators.minLength(this.fixedlength_securityCodeCCV),
        Validators.maxLength(this.fixedlength_securityCodeCCV),
        // noSpacesValidator,   // is optional in REQUIREMENTS, for demo // in production should be enabled
        // onlyDigitsValidator, // is optional in REQUIREMENTS, for demo // in production should be enabled
      ]),
    });
  }

  expirationDate!: NgbDateStruct;

  currentDate: any = new Date();
  currentYear = +this.currentDate.getFullYear();
  currentMonth = +this.currentDate.getMonth() + 1;
  currentDay = +this.currentDate.getDate();

  ngOnInit(): void {}

  onClearForm() {
    this.ccpFormGroup.patchValue({
      id: uuidv4(),
      creditCardNumber: '',
      cardHolder: '',
      expirationDate: '',
      amount: '',
      securityCodeCCV: '',
    });

    setTimeout(() => {
      this.ccpFormGroup.patchValue({
        creditCardNumber: '',
      });
    }, 100);

    this.ccpFormGroup.markAsPristine();
    this.ccpFormGroup.markAsUntouched();

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
    creditCardNumber: '1234123412341234',
    cardHolder: 'Demo name',
    expirationDate: '2025-09-25',
    amount: '220.05',
    securityCodeCCV: '928',
  };

  showFillForm: boolean = true;

  onFillForm() {
    this.ccpFormGroup.patchValue({
      id: uuidv4(),
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
      this.enableToShowRefreshPageInCaseOfFailureAndHideOtherOptions();
    }

    setTimeout(() => {
      this.validMessage = '';
    }, 5000);

    setTimeout(() => {
      this.messageFailureForFirstAttemptToSave = 'Refresh the page please.';
    }, 10000);

    setTimeout(() => {
      let interval = 5;
      setInterval(() => {
        this.messageFailureForFirstAttemptToSave =
          'Automatically refresh the page in ' + interval + ' seconds.';
      }, 1000);
    }, 15000);

    setTimeout(() => {
      this.reloadComponent();
    }, 20000);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  showRefreshPageInCaseOfFailureAndHideOtherOptions: boolean = false;

  enableToShowRefreshPageInCaseOfFailureAndHideOtherOptions() {
    this.showRefreshPageInCaseOfFailureAndHideOtherOptions = true;
  }

  onRefreshTheEntirePage() {
    this.reloadComponent();
  }

  isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
