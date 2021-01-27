import { FormControl } from '@angular/forms';

// mm/dd/yyyy
export function isValidDateAndNotInThePastMMDDYYYYValidator(
  control: FormControl
) {
  let dateString = control.value;

  let currentDate: any = new Date();
  let currentYear = +currentDate.getFullYear();
  let currentMonth = +currentDate.getMonth() + 1;
  let currentDay = +currentDate.getDate();

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return { dateIsNotValidInMMDDYYYY: true };
  }

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return { dateIsNotValidInMMDDYYYY: true };
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  let isValidDay = day > 0 && day <= monthLength[month - 1];

  let isPresentOrFutureYear = year >= currentYear && year <= currentYear + 100;

  let isPresentOrFutureMonth =
    year > currentYear || (year == currentYear && month >= currentMonth);

  let isPresentOrFutureDay =
    year > currentYear ||
    (year == currentYear && month > currentMonth) ||
    (year == currentYear && month == currentMonth && day >= currentDay);

  return isValidDay &&
    isPresentOrFutureYear &&
    isPresentOrFutureMonth &&
    isPresentOrFutureDay
    ? null
    : {
        dateIsValidButInThePastMMDDYYYY: true,
      };
}
