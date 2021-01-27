import { FormControl } from '@angular/forms';

// mm/dd/yyyy
export function isValidPresentOrFutureDayInDateMMDDYYYYValidator(
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

  return !(currentYear == year && currentMonth == month && day < currentDay)
    ? null
    : { dayIsNotInPresentOrFutureInCurrentMonthAndYearInDateMMDDYYYY: true };
}
