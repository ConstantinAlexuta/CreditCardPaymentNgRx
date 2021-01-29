import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDMonthMustContainOnlyDigits(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength <= 5) return null;

  let monthString = dateString.substring(5, Math.min(dateStringLength, 7));

  return /^\d*$/.test(monthString) ? null : { monthNotContainOnlyDigits: true };
}
