import { CcpService } from './../ccp.service';
import { Component, OnInit } from '@angular/core';
import { CreditCardPayment } from 'src/app/model/credit-card-payment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ccp-add-one',
  templateUrl: './ccp-add-one.component.html',
  styleUrls: ['./ccp-add-one.component.scss'],
  providers: [DatePipe],
})
export class CcpAddOneComponent implements OnInit {
  isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }

  public ccpFormGroup!: FormGroup;

  validMessage: string = '';

  constructor(private ccpService: CcpService, private datePipe: DatePipe) {
    setInterval(() => {
      // this.isValidDateForamtYyyyMmDd();
    }, 1000);
  }

  ngOnInit(): void {
    this.ccpFormGroup = new FormGroup({
      creditCardNumber: new FormControl('', [
        Validators.required,
        Validators.max(8),
        Validators.min(8),
      ]),
      cardHolder: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.max(31),
        Validators.min(1),
      ]),
      securityCodeCCV: new FormControl('', [
        Validators.required,
        Validators.max(3),
        Validators.min(3),
      ]),
    });

    setInterval(() => {
      // this.isValidDateForamtYyyyMmDd();
    }, 1000);
  }

  ccp!: CreditCardPayment;

  onSubmit() {
    if (this.ccpFormGroup.valid) {
      this.validMessage =
        'Your new Credit Card Payment details has been submitted.';
      this.ccpService.createCcp(this.ccpFormGroup.value).subscribe(
        (data) => {
          this.ccpFormGroup.reset();
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.validMessage =
        'Please fill out the required fields of the form before submitting!';
    }
  }

  expirationDate!: NgbDateStruct;

  currentDate = new Date();
  currentYearNumber: number = 0;
  currentMonthNumber: number = 0;
  currentDayNumber: number = 0;

  selectedDate!: Object;
  selectedYearNumber: number = 0;
  selectedMonthNumber: number = 0;
  selectedDayNumber: number = 0;

  isExpirationDateValid(): boolean {
    this.currentDate = new Date();
    this.currentYearNumber = +('' + (this.currentDate.getFullYear() + 0)).slice(
      -4
    );
    this.currentMonthNumber = +('' + (this.currentDate.getMonth() + 1)).slice(
      -2
    );
    this.currentDayNumber = +('' + (this.currentDate.getDate() - 0)).slice(-2);

    this.selectedDate = this.ccpFormGroup.value.expirationDate;
    this.selectedYearNumber = +this.ccpFormGroup.value.expirationDate.year;
    this.selectedMonthNumber = +this.ccpFormGroup.value.expirationDate.month;
    this.selectedDayNumber = +this.ccpFormGroup.value.expirationDate.day;

    if (this.selectedYearNumber > this.currentYearNumber) {
      return false;
    } else if (this.currentMonthNumber > this.selectedMonthNumber) {
      return false;
    } else if (this.currentDayNumber > this.selectedDayNumber) {
      return false;
    } else {
      return true;
    }
  }

  sliceString!: string;

  inputDateString: string = '';
  inputDateStringYear: string = '';
  inputDateStringYearMonthDash: string = '';
  inputDateStringMonth: string = '';
  inputDateStringMonthDayDash: string = '';
  inputDateStringDay: string = '';
  inputDateStringDayReminder: string = '';

  inputDateStringIsValid!: boolean;

  inputDateStringYearIsValid!: boolean;
  inputDateStringYearMonthDashIsValid!: boolean;
  inputDateStringMonthIsValid!: boolean;
  inputDateStringMonthDayDashIsValid!: boolean;
  inputDateStringDayIsValid!: boolean;
  inputDateStringDayReminderIsValid!: boolean;

  typedDateIsValid(): boolean {
    this.inputDateString = this.ccpFormGroup.value.expirationDate;

    this.inputDateStringYear = this.inputDateString.slice(0, 4);
    this.inputDateStringYearMonthDash = this.inputDateString.slice(4, 5);
    this.inputDateStringMonth = this.inputDateString.slice(5, 7);
    this.inputDateStringMonthDayDash = this.inputDateString.slice(7, 8);

    this.inputDateStringDay = this.inputDateString.slice(8, 10);
    this.inputDateStringDayReminder = this.inputDateString.slice(10, 11);

    this.sliceString = this.inputDateString.slice(0, 4);

    if (
      this.isNumber(this.inputDateStringYear) &&
      +this.inputDateStringYear >= this.currentYearNumber
    ) {
      this.inputDateStringYearIsValid = true;
    } else {
      this.inputDateStringYearIsValid = false;
    }

    if (this.inputDateStringYearMonthDash == '-') {
      this.inputDateStringYearMonthDashIsValid = true;
    } else {
      this.inputDateStringYearMonthDashIsValid = false;
    }

    if (
      (this.isNumber(this.inputDateStringMonth) &&
        +this.inputDateStringMonth > 0 &&
        +this.inputDateStringMonth < 13) ||
      (this.inputDateString.slice(5, 6) == '0' &&
        this.isNumber(this.inputDateString.slice(6, 7)) &&
        +this.inputDateString.slice(6, 7) > 0 &&
        +this.inputDateString.slice(6, 7) < 10)
    ) {
      this.inputDateStringMonthIsValid = true;
    } else {
      this.inputDateStringMonthIsValid = false;
    }

    if (this.inputDateStringMonthDayDash == '-') {
      this.inputDateStringMonthDayDashIsValid = true;
    } else {
      this.inputDateStringMonthDayDashIsValid = false;
    }

    if (
      this.isNumber(this.inputDateStringDay)
      // (this.isNumber(this.inputDateStringDay) &&
      //   +this.inputDateStringDay >= 10 &&
      //   +this.inputDateStringDay <= 31) ||
      // (this.inputDateString.slice(8, 9) == '0' &&
      //   this.isNumber(this.inputDateString.slice(9, 10)) &&
      //   +this.inputDateString.slice(9, 10) > 0 &&
      //   +this.inputDateString.slice(9, 10) < 10)
    ) {
      this.inputDateStringDayIsValid = true;
    } else {
      this.inputDateStringDayIsValid = false;
    }

    if (this.inputDateStringDayReminder == '') {
      this.inputDateStringDayReminderIsValid = true;
    } else {
      this.inputDateStringDayReminderIsValid = false;
    }

    if (
      this.inputDateStringYearIsValid &&
      this.inputDateStringYearMonthDashIsValid &&
      this.inputDateStringMonthIsValid &&
      this.inputDateStringMonthDayDashIsValid &&
      this.inputDateStringDayIsValid &&
      this.inputDateStringDayReminderIsValid
    ) {
      return true;
    } else {
      return false;
    }
  }

  // "mm/dd/yyyy"
  isValidDate(dateString: string) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  /////////////////////// Date

  // currentDate: any = new Date();
  currentYear = +this.currentDate.getFullYear();
  currentMonth = +this.currentDate.getMonth() + 1;
  currentDay = +this.currentDate.getDate();

  formDate!: string; // yyyy-mm-dd ...

  formYear!: string;
  formMonth!: string;
  formDay!: string;

  isFormYearValid() {
    let dateFormStringInput = this.ccpFormGroup.value.expirationDate;

    var parts = dateFormStringInput.split('/');
    var year = parseInt(parts[0], 10);

    if (year > this.currentYear && year < this.currentYear + 5) {
      return true;
    } else {
      return false;
    }
  }

  verifiedDate!: string;

  // input format =  yyyy-mm-dd
  isValidDateForamtYyyyMmDd(dateStringInput: string) {
    // dateStringInput = this.ccpFormGroup.value.expirationDate;
    // dateStringInput = '2022-01-31';

    // form input format   yyyy-mm-dd   to    "mm/dd/yyyy"
    let dateString: string =
      dateStringInput.slice(5, 7) +
      '/' +
      dateStringInput.slice(8, 10) +
      '/' +
      dateStringInput.slice(0, 4);

    this.verifiedDate = dateString;
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    // credit card expire after 5...10 years
    if (year < 2021 || year > 2100 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  expirationDateDay: number = 0;
  expirationDateMonth: number = 0;
  expirationDateYear: number = 0;

  expirationDateDayMin: number = 0;
  expirationDateMonthMin: number = 0;
  expirationDateYearMin: number = 0;

  expirationDateDayMax: number = 0;
  expirationDateMonthMax: number = 0;
  expirationDateYearMax: number = 0;

  expirationDateYearInterval!: number[];

  verifySelectedDate() {
    this.currentDate = new Date();
    this.currentYearNumber = +('' + (this.currentDate.getFullYear() + 0)).slice(
      -4
    );
    this.currentMonthNumber = +('' + (this.currentDate.getMonth() + 1)).slice(
      -2
    );
    this.currentDayNumber = +('' + (this.currentDate.getDate() - 0)).slice(-2);

    this.expirationDateYearMin = this.currentYearNumber;
    this.expirationDateYearMax = this.currentYearNumber + 10;

    for (
      let i = this.expirationDateYearMin;
      i <= this.expirationDateYearMax;
      i++
    ) {
      this.expirationDateYearInterval.push(i);
    }
  }

  isValidDateYYYYMMDDGreaterThanCurrentDate(date: string): boolean {
    var matches = /(\d{4})[-\/](\d{2})[-\/](\d{2})/.exec(date);
    if (matches == null) return false;

    var day = +matches[2];
    var month = +matches[1];
    var year = +matches[0];

    // var composedDate = new Date(year, month, day);

    if (year < 2021 || year > 2100 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];

    return true;
  }

  isValidDateYearGreaterThanCurrentYearPlusFive(inputYear: number): boolean {
    let currentDate = new Date();

    let currentYearNumber = +('' + (currentDate.getFullYear() + 0)).slice(-4);

    if (inputYear < currentYearNumber || inputYear > currentYearNumber + 5) {
      return false;
    } else {
      return true;
    }
  }

  isValidDateMonthGreaterThanCurrentMonthIfTheSameYear(
    inputYear: number,
    inputMonth: number
  ): boolean {
    let currentDate = new Date();

    let currentYearNumber = +('' + (currentDate.getFullYear() + 0)).slice(-4);
    let currentMonthNumber = +('' + (currentDate.getMonth() + 1)).slice(-2);

    if (
      inputMonth < 1 ||
      inputMonth > 12 ||
      (inputYear == currentYearNumber && inputMonth < currentMonthNumber)
    ) {
      return false;
    } else {
      return true;
    }
  }

  isValidDateDayGreaterThanCurrentDayIfMonthAndYearAreTheSameValidAlsoForBisect(
    inputYear: number,
    inputMonth: number,
    inputDay: number
  ): boolean {
    return true;

    // let currentDate = new Date();

    // let currentYearNumber = +('' + (currentDate.getFullYear() + 0)).slice(-4);
    // let currentMonthNumber = +('' + (currentDate.getMonth() + 1)).slice(-2);
    // let currentDayNumber = +('' + (currentDate.getDate() - 0)).slice(-2);

    // if (inputDay < 1 || inputDay > 31) return false;

    // if (
    //   inputYear == currentYearNumber &&
    //   inputMonth == currentMonthNumber &&
    //   inputDay < currentDayNumber
    // ) {
    //   return false;
    // }

    // var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // // Adjust for leap years
    // if (inputYear % 400 == 0 || (inputYear % 100 != 0 && inputYear % 4 == 0)) {
    //   monthLength[1] = 29;
    // }

    // // Check the range of the day
    // if (inputDay > 0 && inputDay <= monthLength[inputMonth - 1]) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  datePickerYearIsValid!: boolean;

  onDatePicker() {
    if (this.isDatePickerYearValid()) {
      this.datePickerYearIsValid = true;
    } else {
      this.datePickerYearIsValid = false;
    }
  }

  isDatePickerYearValid() {
    if (!this.isNumber(+this.ccpFormGroup.value.expirationDate.slice(0, 4))) {
      return false;
    }

    return this.isValidDateYearGreaterThanCurrentYearPlusFive(
      +this.ccpFormGroup.value.expirationDate.slice(0, 4)
    );
  }
}
