import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDYearMustContainOnlyDigits(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  let yearString = dateString.substring(0, Math.min(dateStringLength, 4));

  return /^\d*$/.test(yearString) ? null : { yearNotContainOnlyDigits: true };
}
