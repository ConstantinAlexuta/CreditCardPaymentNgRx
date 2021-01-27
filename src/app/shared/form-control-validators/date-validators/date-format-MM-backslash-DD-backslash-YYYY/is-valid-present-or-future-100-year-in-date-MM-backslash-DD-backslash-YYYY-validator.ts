import { FormControl } from '@angular/forms';

// mm/dd/yyyy
export function isValidPresentOrFuture100YearInDateMMDDYYYYValidator(
  control: FormControl
) {
  let dateString = control.value;

  let currentDate: any = new Date();
  let currentYear = +currentDate.getFullYear();

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return { dateIsNotValidInMMDDYYYY: true };
  }

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var year = parseInt(parts[2], 10);

  // Check the ranges year

  return year >= currentYear && year <= currentYear + 100
    ? null
    : { yearIsNotInPresentOrFuture100ValidInDateMMDDYYYY: true };
}
